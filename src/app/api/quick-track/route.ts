import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/neon';
import { issueSignedToken, presignUrl } from '@vercel/blob';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const appId = searchParams.get('appId')?.trim();

    if (!appId) {
      return NextResponse.json({ success: false, error: 'Missing Transaction ID' }, { status: 400 });
    }

    // الاستعلام عن المعاملة مع ربطها باسم الشركة
    const rows = await sql`
      SELECT 
        a.id, a.service_type, a.status, a.progress, a.notes, a.issued_document_url, u.company_name
      FROM applications a
      JOIN users u ON a.user_id = u.id
      WHERE a.id = ${appId}
      LIMIT 1
    ` as any[];

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Not Found' }, { status: 404 });
    }

    let application = { ...rows[0] };

    // 🔐 فك تشفرة الرابط من الـ Private Store ليعمل فوراً للمعاينة الخارجية
    if (application.issued_document_url && application.issued_document_url.includes('.private.blob.vercel-storage.com')) {
      try {
        const blobToken = await issueSignedToken({ operations: ['get'] });
        const urlObj = new URL(application.issued_document_url);
        const pathname = urlObj.pathname.substring(1);

        const { presignedUrl } = await presignUrl(blobToken, {
          pathname: pathname,
          operation: 'get',
          access: 'private',
          validUntil: Date.now() + 15 * 60 * 1000, // رابط صالح لمدة 15 دقيقة فقط للأمان
        });

        application.issued_document_url = presignedUrl;
      } catch (tokenErr) {
        console.error('Failed to presign quick track url', tokenErr);
      }
    }

    return NextResponse.json({ success: true, data: application });

  } catch (error: any) {
    console.error('🔴 Quick Track API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
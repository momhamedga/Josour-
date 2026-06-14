import { NextRequest, NextResponse } from 'next/server';
import { head } from '@vercel/blob';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    let fileUrl = searchParams.get('url');
    
    if (!fileUrl) {
      return new NextResponse('Missing url parameter', { status: 400 });
    }

    // 1. تنظيف الرابط وفك أي تشفير مزدوج ليكون نقيًا 100%
    fileUrl = decodeURIComponent(fileUrl);
    if (fileUrl.includes('%25') || fileUrl.includes('%3F')) {
      fileUrl = decodeURIComponent(fileUrl);
    }

    // 2. إزالة أي تواقيع مؤقتة قديمة مدمجة بالرابط حتى لا تشوش على طلب السيرفر
    if (fileUrl.includes('?')) {
      fileUrl = fileUrl.split('?')[0];
    }

    // 🚀 الفكرة السحرية: جلب "نوع الملف" (Content-Type) مباشرة باستخدام الـ SDK الرسمي لـ Vercel
    // هذا التابع يقرأ الملف بالصلاحيات الإدارية الكاملة للمشروع (BLOB_READ_WRITE_TOKEN) المخزنة في الـ .env
    const metadata = await head(fileUrl);
    const contentType = metadata.contentType || 'application/pdf';

    // 3. جلب بيانات الملف (Blob) باستخدام الـ fetch العادي، ولكن الآن نمرر توكن الصلاحيات الإداري في الـ Headers!
    const response = await fetch(fileUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`, // 🔐 التمرير الأمني الصريح الذي يكسر الـ 403 فوراً
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      console.error('🔴 Vercel Blob Server Rejected Request Status:', response.status);
      return new NextResponse(`Cloud storage error. Status: ${response.status}`, { status: response.status });
    }

    const blobData = await response.blob();

    // 4. إرجاع الملف النقي للمتصفح للعرض الفوري
    return new NextResponse(blobData, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline', // لعرضه داخل المتصفح مباشرة للعميل
        'Cache-Control': 'public, max-age=3600',
      },
    });

  } catch (error: any) {
    console.error('Error in view-doc API:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
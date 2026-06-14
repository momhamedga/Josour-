import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ar', 'en'];
const defaultLocale = 'ar';

// 🫡 تم تثبيت اسم الدالة ليكون proxy كما طلبت يا غالي لعام 2026
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🛡️ 1. اختراق فوري: استثناء مجلد الفيديوهات والملفات الثابتة لمنع حقن الـ /ar/ والـ 404
  if (
    pathname.startsWith('/videos/') || 
    pathname.startsWith('/images/') || 
    pathname.startsWith('/assets/') ||
    pathname.match(/\.(mp4|webm|png|jpg|jpeg|gif|svg|ico)$/)
  ) {
    return NextResponse.next();
  }

  // 🚀 2. استثناء مسارات الـ API بالكامل من أي فلترة أو تحويل لغوي
  if (pathname.startsWith('/api/') || pathname === '/api') {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  const currentLocale = hasLocale ? pathname.split('/')[1] : defaultLocale;
  const purePathname = hasLocale ? pathname.replace(`/${currentLocale}`, '') : pathname;

  // 🔒 حماية بوابة العميل الذكية (/portal)
  if (purePathname === '/portal' || purePathname.startsWith('/portal/')) {
    if (purePathname === '/portal/login') {
      return hasLocale ? NextResponse.next() : NextResponse.redirect(new URL(`/${currentLocale}/portal/login`, request.url));
    }

    const userEmail = request.cookies.get('user_email')?.value;
    
    if (!userEmail) {
      return NextResponse.redirect(new URL(`/${currentLocale}/portal/login`, request.url));
    }
  }

  // 🔒 حماية لوحة التحكم الفورية للمستشار (/admin)
  if (purePathname === '/admin' || purePathname.startsWith('/admin/')) {
    if (purePathname === '/admin/login') {
      return hasLocale ? NextResponse.next() : NextResponse.redirect(new URL(`/${currentLocale}/admin/login`, request.url));
    }

    const adminSession = request.cookies.get('admin_session')?.value;
    if (!adminSession) {
      return NextResponse.redirect(new URL(`/${currentLocale}/admin/login`, request.url));
    }
  }

  if (hasLocale) return NextResponse.next();

  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|favicon.webp|videos|images|assets).*)'],
};
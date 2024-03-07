import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
    cookies().set({
      name: 'update-password-redirect',
      value: code,
      httpOnly: true,
      path: '/',
      secure: true,
      maxAge: 60 * 5,
    });
  }

  return NextResponse.redirect(`${requestUrl.origin}/update-password`);
}

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body: { email: string } = await request.json();
    const supabase = createRouteHandlerClient({ cookies });

    const { error } = await supabase.auth.resetPasswordForEmail(body.email, {
      redirectTo: `${request.nextUrl.origin}/update-password`,
    });

    if (error) {
      return new Response(JSON.stringify({ data: null, error: true }), {
        status: 500,
        headers: {
          'content-type': 'application/json',
        },
      });
    }

    return new Response(
      JSON.stringify({
        data: {
          status: true,
          message: 'Email sent.',
        },
        error: false,
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  } catch (e) {
    return new Response(JSON.stringify({ data: null, error: true }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body: { password: string; nonce: string } = await request.json();
    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase.auth.updateUser({
      password: body.password,
    });

    console.log('*****data', data, error, body.nonce);

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
          message: 'Password updated successfully.',
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

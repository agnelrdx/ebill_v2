import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
    });

    const { error } = await supabase.auth.signOut();

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
          message: 'User logged out.',
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

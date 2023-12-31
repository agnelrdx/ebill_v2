import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body: { email: string; password: string } = await request.json();
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (error) {
      return new Response(JSON.stringify({ data: null, error: true }), {
        status: 500,
        headers: {
          'content-type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ data: data.user, error: false }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ data: null, error: true }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}

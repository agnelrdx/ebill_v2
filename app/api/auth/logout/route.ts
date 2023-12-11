import { signOut } from 'firebase/auth';
import { firebaseAuth } from 'utils/firebase-config';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    await signOut(firebaseAuth);
    cookies().delete('EBILL_AUTH');
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

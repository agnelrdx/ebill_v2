import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from 'utils/firebase-config';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body: { email: string; password: string } = await request.json();
    const result = await signInWithEmailAndPassword(
      firebaseAuth,
      body.email,
      body.password
    );
    const idToken = await result.user.getIdToken();
    cookies().set({
      name: 'EBILL_AUTH',
      value: idToken,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 1000,
    });
    return new Response(
      JSON.stringify({ data: result.user.providerData[0], error: false }),
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

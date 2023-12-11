import { sendPasswordResetEmail } from 'firebase/auth';
import { firebaseAuth } from 'utils/firebase-config';

export async function POST(request: Request) {
  try {
    const body: { email: string } = await request.json();
    await sendPasswordResetEmail(firebaseAuth, body.email);
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

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Login from 'components/login/login';

export default function Home() {
  const year = new Date().getFullYear();
  const isLoggedIn = cookies().get('EBILL_AUTH');

  if (isLoggedIn) redirect('/dashboard');

  return (
    <main>
      <div className="container h-full flex flex-col justify-center items-center">
        <Login />

        <p className="mt-4 text-center text-sm leading-7">
          © {year}, Made with ❤️ by Themecrispy
        </p>
      </div>
    </main>
  );
}

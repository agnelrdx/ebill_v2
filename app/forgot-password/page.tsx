import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ForgotPassword from 'components/forgot-password/forgot-password';

export const metadata: Metadata = {
  title: 'EBill WebAPP - Forgot Password',
  description: 'Quotation and Invoice Management Software',
};

export default function Home() {
  const year = new Date().getFullYear();
  const isLoggedIn = cookies().get('EBILL_AUTH');

  if (isLoggedIn) redirect('/dashboard');

  return (
    <main>
      <div className="container h-full flex flex-col justify-center items-center">
        <ForgotPassword />

        <p className="mt-4 text-center text-sm leading-7">
          © {year}, Made with ❤️ by Themecrispy
        </p>
      </div>
    </main>
  );
}

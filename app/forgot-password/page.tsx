import type { Metadata } from 'next';
import ForgotPassword from 'components/forgot-password/forgot-password';

export const metadata: Metadata = {
  title: 'EBill WebAPP - Forgot Password',
  description: 'Quotation and Invoice Management Software',
};

export default function ForgotPasswordPage() {
  const year = new Date().getFullYear();

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

import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import UpdatePassword from 'components/update-password/update-password';

export const metadata: Metadata = {
  title: 'EBill WebAPP - Update Password',
  description: 'Quotation and Invoice Management Software',
};

export default async function UpdatePasswordPage() {
  const year = new Date().getFullYear();
  const cookiesList = cookies();
  const isValidRedirection = cookiesList.get('update-password-redirect');

  if (!isValidRedirection) redirect(`/`);

  return (
    <main>
      <div className="container h-full flex flex-col justify-center items-center">
        <UpdatePassword />

        <p className="mt-4 text-center text-sm leading-7">
          © {year}, Made with ❤️ by Themecrispy
        </p>
      </div>
    </main>
  );
}

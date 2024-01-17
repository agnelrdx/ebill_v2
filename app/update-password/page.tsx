import type { Metadata } from 'next';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import UpdatePassword from 'components/update-password/update-password';

export const metadata: Metadata = {
  title: 'EBill WebAPP - Update Password',
  description: 'Quotation and Invoice Management Software',
};

export default async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) {
  const year = new Date().getFullYear();

  async function create() {
    'use server';

    console.log('********hahahahah');

    if (searchParams?.code) {
      const supabase = createRouteHandlerClient({ cookies });
      await supabase.auth.exchangeCodeForSession(searchParams?.code);

      console.log('********hahahahah');
    }
  }

  return (
    <main onLoad={create}>
      <div className="container h-full flex flex-col justify-center items-center">
        <UpdatePassword />

        <p className="mt-4 text-center text-sm leading-7">
          © {year}, Made with ❤️ by Themecrispy
        </p>
      </div>
    </main>
  );
}

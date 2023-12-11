import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { ThemeProvider } from 'components/ui/theme-provider';
import FloatingThemeSwitcher from 'components/ui/floating-theme-switcher';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'EBill WebAPP - Login',
  description: 'Quotation and Invoice Management Software',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <FloatingThemeSwitcher />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

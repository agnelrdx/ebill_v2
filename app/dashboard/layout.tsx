import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EBill WebAPP - Dashboard',
  description: 'Quotation and Invoice Management Software',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="flex-col flex">{children}</div>
    </main>
  );
}

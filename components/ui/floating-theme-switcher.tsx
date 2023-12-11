'use client';

import { usePathname } from 'next/navigation';
import ThemeSwitcher from 'components/theme-switcher/theme-switcher';

const FloatingThemeSwitcher = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/dashboard')) return null;

  return (
    <div className="absolute top-8 right-10">
      <ThemeSwitcher />
    </div>
  );
};

export default FloatingThemeSwitcher;

import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <div className="mt-12">{children}</div>
    </div>
  );
};

export default Layout;

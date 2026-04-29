import Navbar from '@/components/Navbar';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex h-screen w-full flex-col">
      <Navbar/>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;

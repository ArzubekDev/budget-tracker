import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
<div className='relative flex flex-col items-center justify-center w-full h-screen'>
{children}
</div>
  );
};

export default Layout;
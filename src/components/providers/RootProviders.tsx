'use client'
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

interface RootProvidersProps {
  children: ReactNode;
}

const RootProviders = ({ children }: RootProvidersProps) => {
  return (
   <ThemeProvider
   attribute="class"
   defaultTheme='dark'
   enableSystem
   disableTransitionOnChange>
    {children}
   </ThemeProvider>
  );
};

export default RootProviders;
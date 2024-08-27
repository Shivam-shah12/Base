'use client';
import { ReactNode } from 'react';
import ToastProvider from './ToastProvider';
import { ThemeProvider } from './ThemeProvider';


export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      themes={['light', 'dark', 'fairlight']}
      enableSystem={false}
      storageKey="Base"
      disableTransitionOnChange
    >
      <ToastProvider>
        {children}
      </ToastProvider>
    </ThemeProvider>
  );
};
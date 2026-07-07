import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { MobileBetSlipTrigger } from './UI';

export default function Layout({ children, noPadding = false }: { children: ReactNode; noPadding?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col bg-void bg-noise">
      <Header />
      <main className={`flex-1 w-full ${noPadding ? '' : 'max-w-7xl mx-auto px-3 md:px-5 py-5'}`}>{children}</main>
      <Footer />
      <MobileBetSlipTrigger />
    </div>
  );
}

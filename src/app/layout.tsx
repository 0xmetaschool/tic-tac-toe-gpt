import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/context/auth-context';
import './globals.css';
import AuthRedirectHandler from '@/components/auth/AuthRedirectHandler';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tic Tac Toe AI',
  description: 'Play Tic Tac Toe against an AI opponent',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AuthRedirectHandler />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
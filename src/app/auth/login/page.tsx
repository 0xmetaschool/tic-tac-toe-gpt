import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}
import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  );
}
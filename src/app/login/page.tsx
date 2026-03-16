import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <main className="auth-page">
      <Suspense fallback={<div className="auth-card">Carregando login...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}

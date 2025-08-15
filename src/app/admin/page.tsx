
'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth-provider'; // Assuming you have an auth provider

export default function AdminRootPage() {
  const router = useRouter();
  const { user, loading } = useAuth();


  useEffect(() => {
    if (!loading) {
        if(user) {
            router.replace('/admin/dashboard');
        } else {
            router.replace('/admin/login');
        }
    }
  }, [router, user, loading]);

  return null;
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import AppShell from '@/components/layout/AppShell';
import { useEventsStore } from '@/stores/useEventsStore';
import { mockEvents } from '@/data/events';
import { USE_MOCK } from '@/lib/config';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  // Initialize mock data
  useEffect(() => {
    if (USE_MOCK) {
      const { events } = useEventsStore.getState();
      if (events.length === 0) {
        // Initialize with mock events
        mockEvents.forEach((mockEvent) => {
          useEventsStore.setState((state) => ({
            events: [...state.events, mockEvent],
          }));
        });
      }
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Show nothing while redirecting
  }

  return <AppShell>{children}</AppShell>;
}
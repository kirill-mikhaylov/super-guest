'use client';

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Button,
  Box,
} from '@mui/material';
import {
  Dashboard,
  People,
  CreditCard,
  Settings,
  Event,
  Add,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { useEventsStore } from '@/stores/useEventsStore';
import { groupByMonth, formatDate } from '@/lib/utils';
import { USE_MOCK } from '@/lib/config';
import { mockEvents } from '@/data/events';
import { useEffect } from 'react';

interface SidebarContentProps {
  onNavigate?: () => void;
}

const navigationItems = [
  { label: 'Dashboard', path: '/dashboard', icon: Dashboard },
  { label: 'Users', path: '/users', icon: People },
  { label: 'Billing', path: '/billing', icon: CreditCard },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export default function SidebarContent({ onNavigate }: SidebarContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { events } = useEventsStore();

  // Initialize mock data if needed
  useEffect(() => {
    if (USE_MOCK && events.length === 0) {
      // Initialize with mock events
      mockEvents.forEach((mockEvent) => {
        useEventsStore.getState().createEvent(mockEvent);
      });
    }
  }, [events.length]);

  const groupedEvents = groupByMonth(events);

  const handleNavigate = (path: string) => {
    router.push(path);
    onNavigate?.();
  };

  const handleCreateEvent = () => {
    router.push('/events/new');
    onNavigate?.();
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Create New Event Button */}
      <Button
        variant="contained"
        startIcon={<Add />}
        fullWidth
        onClick={handleCreateEvent}
        sx={{ mb: 3, py: 1.5, fontWeight: 600 }}
      >
        Create New Event
      </Button>

      {/* Events by Month */}
      {Object.keys(groupedEvents).length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, px: 1 }}>
            Events
          </Typography>
          
          {Object.entries(groupedEvents).map(([month, monthEvents]) => (
            <Box key={month} sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ px: 1, fontWeight: 600 }}>
                {month}
              </Typography>
              
              <List dense>
                {monthEvents.map((event) => (
                  <ListItem key={event.id} disablePadding>
                    <ListItemButton
                      selected={pathname === `/events/${event.id}`}
                      onClick={() => handleNavigate(`/events/${event.id}`)}
                      sx={{ py: 0.5, px: 1, borderRadius: 1, mx: 0.5 }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Event fontSize="small" />
                      </ListItemIcon>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {event.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(event.date, 'MMM d')}
                        </Typography>
                      </Box>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Navigation Items */}
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={pathname === item.path}
              onClick={() => handleNavigate(item.path)}
              sx={{ borderRadius: 1, mx: 0.5 }}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
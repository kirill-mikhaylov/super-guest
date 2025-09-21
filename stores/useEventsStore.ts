import { create } from 'zustand';
import { rescoreAll } from '@/lib/scoring';

export interface Guest {
  id: string;
  name: string;
  email: string;
  company?: string;
  title?: string;
  city?: string;
  tags?: string[];
  status: 'Invited' | 'Confirmed' | 'Declined' | 'Waitlist';
  score: number;
  scoreBreakdown?: Record<string, number>;
  history?: Array<{ date: string; action: string; note?: string }>;
}

export interface Criteria {
  id: string;
  label: string;
  weight: number;
  key: string;
}

export interface Prospect extends Omit<Guest, 'status' | 'score'> {
  suggestedBy: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  url?: string;
  location?: string;
  description?: string;
  criteria: Criteria[];
  guests: Guest[];
  prospects: Prospect[];
  createdAt: string;
}

interface EventsState {
  events: Event[];
  createEvent: (input: Omit<Event, 'id' | 'createdAt'>) => string;
  importGuests: (eventId: string, csvRows: any[]) => void;
  updateCriteria: (eventId: string, criteria: Criteria[]) => void;
  rescoreGuests: (eventId: string) => void;
  generateProspects: (eventId: string, filters?: any) => Prospect[];
  promoteProspectToGuest: (eventId: string, prospectId: string) => void;
  updateGuestStatus: (eventId: string, guestId: string, status: Guest['status']) => void;
  getEventById: (id: string) => Event | undefined;
}

export const useEventsStore = create<EventsState>((set, get) => ({
  events: [],
  
  createEvent: (input) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newEvent: Event = {
      ...input,
      id,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ events: [...state.events, newEvent] }));
    return id;
  },

  importGuests: (eventId, csvRows) => {
    const guests: Guest[] = csvRows.map((row, index) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: row.name || row.Name || '',
      email: row.email || row.Email || '',
      company: row.company || row.Company || '',
      title: row.title || row.Title || '',
      city: row.city || row.City || '',
      tags: row.tags ? row.tags.split(',').map((t: string) => t.trim()) : [],
      status: 'Invited' as const,
      score: 0,
      scoreBreakdown: {},
      history: [],
    }));

    set((state) => ({
      events: state.events.map((event) =>
        event.id === eventId
          ? { ...event, guests: [...event.guests, ...guests] }
          : event
      ),
    }));
  },

  updateCriteria: (eventId, criteria) => {
    set((state) => ({
      events: state.events.map((event) =>
        event.id === eventId ? { ...event, criteria } : event
      ),
    }));
  },

  rescoreGuests: (eventId) => {
    set((state) => {
      const event = state.events.find((e) => e.id === eventId);
      if (!event) return state;

      const rescoredGuests = rescoreAll(event.guests, event.criteria);
      return {
        events: state.events.map((e) =>
          e.id === eventId ? { ...e, guests: rescoredGuests } : e
        ),
      };
    });
  },

  generateProspects: (eventId, filters) => {
    // Mock prospect generation
    const mockProspects: Prospect[] = [
      {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Sarah Johnson',
        email: 'sarah.johnson@techcorp.com',
        company: 'TechCorp',
        title: 'VP Marketing',
        city: 'San Francisco',
        tags: ['marketing', 'tech'],
        suggestedBy: 'AI Discovery',
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Mike Chen',
        email: 'mike.chen@startup.co',
        company: 'Startup Co',
        title: 'Founder',
        city: 'New York',
        tags: ['founder', 'startup'],
        suggestedBy: 'Network Analysis',
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Emily Rodriguez',
        email: 'emily@designstudio.com',
        company: 'Design Studio',
        title: 'Creative Director',
        city: 'Los Angeles',
        tags: ['design', 'creative'],
        suggestedBy: 'Industry Matching',
      },
    ];

    set((state) => ({
      events: state.events.map((event) =>
        event.id === eventId
          ? { ...event, prospects: [...event.prospects, ...mockProspects] }
          : event
      ),
    }));

    return mockProspects;
  },

  promoteProspectToGuest: (eventId, prospectId) => {
    set((state) => {
      const event = state.events.find((e) => e.id === eventId);
      if (!event) return state;

      const prospect = event.prospects.find((p) => p.id === prospectId);
      if (!prospect) return state;

      const newGuest: Guest = {
        ...prospect,
        status: 'Invited',
        score: 0,
        scoreBreakdown: {},
      };

      return {
        events: state.events.map((e) =>
          e.id === eventId
            ? {
                ...e,
                guests: [...e.guests, newGuest],
                prospects: e.prospects.filter((p) => p.id !== prospectId),
              }
            : e
        ),
      };
    });
  },

  updateGuestStatus: (eventId, guestId, status) => {
    set((state) => ({
      events: state.events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              guests: event.guests.map((guest) =>
                guest.id === guestId ? { ...guest, status } : guest
              ),
            }
          : event
      ),
    }));
  },

  getEventById: (id) => {
    return get().events.find((event) => event.id === id);
  },
}));
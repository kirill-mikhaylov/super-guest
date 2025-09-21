import { Event, Guest, Criteria } from '@/stores/useEventsStore';

const defaultCriteria: Criteria[] = [
  { id: '1', label: 'Industry Fit', weight: 85, key: 'industryFit' },
  { id: '2', label: 'Role Seniority', weight: 70, key: 'roleSeniority' },
  { id: '3', label: 'Company Size', weight: 60, key: 'companySize' },
  { id: '4', label: 'Previous Attendance', weight: 80, key: 'previousAttendance' },
  { id: '5', label: 'Engagement Score', weight: 75, key: 'engagementScore' },
  { id: '6', label: 'Geo Proximity', weight: 40, key: 'geoProximity' },
  { id: '7', label: 'Diversity Goals', weight: 65, key: 'diversityGoals' },
  { id: '8', label: 'Referrals', weight: 90, key: 'referrals' },
];

const mockGuests: Guest[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex@techstart.com',
    company: 'TechStart',
    title: 'CEO',
    city: 'San Francisco',
    tags: ['tech', 'startup', 'referral'],
    status: 'Confirmed',
    score: 92,
    scoreBreakdown: { industryFit: 95, roleSeniority: 100, companySize: 85 },
    history: [
      { date: '2024-01-05', action: 'Invited', note: 'Sent via email' },
      { date: '2024-01-06', action: 'Confirmed', note: 'Replied within 24h' },
    ],
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria@designco.com',
    company: 'Design Co',
    title: 'Creative Director',
    city: 'Los Angeles',
    tags: ['design', 'creative'],
    status: 'Invited',
    score: 78,
    scoreBreakdown: { industryFit: 80, roleSeniority: 85, companySize: 70 },
    history: [
      { date: '2024-01-08', action: 'Invited', note: 'Initial outreach' },
    ],
  },
  {
    id: '3',
    name: 'David Kim',
    email: 'david@fintech.io',
    company: 'FinTech Solutions',
    title: 'VP Engineering',
    city: 'New York',
    tags: ['fintech', 'engineering'],
    status: 'Waitlist',
    score: 85,
    scoreBreakdown: { industryFit: 90, roleSeniority: 90, companySize: 75 },
    history: [
      { date: '2024-01-07', action: 'Invited' },
      { date: '2024-01-09', action: 'Waitlisted', note: 'Requested alternative dates' },
    ],
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Tech Summit 2024',
    date: '2024-03-15',
    url: 'https://techsummit2024.com',
    location: 'San Francisco Convention Center',
    description: 'Annual technology summit bringing together industry leaders',
    criteria: defaultCriteria,
    guests: mockGuests,
    prospects: [],
    createdAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Design Workshop',
    date: '2024-04-22',
    url: 'https://designworkshop.com',
    location: 'Creative Studios NYC',
    description: 'Interactive design workshop for creative professionals',
    criteria: defaultCriteria,
    guests: [mockGuests[1]], // Maria Garcia
    prospects: [],
    createdAt: '2024-01-10T14:30:00Z',
  },
  {
    id: '3',
    name: 'Startup Networking Event',
    date: '2024-05-08',
    location: 'Austin Tech Hub',
    description: 'Connect with fellow entrepreneurs and investors',
    criteria: defaultCriteria,
    guests: [],
    prospects: [],
    createdAt: '2024-01-15T09:15:00Z',
  },
];
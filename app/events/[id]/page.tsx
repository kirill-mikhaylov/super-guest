'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Card from '../../components/Card';

// Define types for better TypeScript support
interface AgendaItem {
  time: string;
  activity: string;
}

interface Attendee {
  name: string;
  email: string;
  checkedIn: boolean;
  registrationDate: string;
}

interface Event {
  id: string;
  name: string;
  status: string;
  date: string;
  time: string;
  attendees: number;
  capacity: number;
  revenue: string;
  description: string;
  location: string;
  address: string;
  agenda: AgendaItem[];
  attendeesList: Attendee[];
}

export default function EventDetails() {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);
  const router = useRouter();
  const params = useParams();
  const eventId = params.id;

  // Sample event data - in a real app this would come from an API
  const events = useMemo(() => [
    { 
      id: '1', 
      name: 'Tech Meetup 2025', 
      date: 'Jan 15, 2025', 
      time: '6:00 PM', 
      attendees: 150, 
      capacity: 150, 
      status: 'sold-out',
      location: 'Innovation Hub',
      address: '123 Tech Street, Silicon Valley, CA 94043',
      revenue: '$3,900',
      description: 'Join us for an evening of networking, tech talks, and innovation. This meetup features presentations from industry leaders, startup founders, and tech innovators.',
      agenda: [
        { time: '6:00 PM', activity: 'Registration & Networking' },
        { time: '6:30 PM', activity: 'Welcome & Opening Remarks' },
        { time: '7:00 PM', activity: 'Keynote: The Future of AI' },
        { time: '7:30 PM', activity: 'Panel Discussion: Startup Ecosystem' },
        { time: '8:15 PM', activity: 'Networking & Refreshments' },
        { time: '9:00 PM', activity: 'Event Wrap-up' }
      ],
      attendeesList: [
        { name: 'Sarah Johnson', email: 'sarah@techcorp.com', checkedIn: true, registrationDate: 'Dec 15, 2024' },
        { name: 'Mike Chen', email: 'mike@startup.io', checkedIn: true, registrationDate: 'Dec 18, 2024' },
        { name: 'Emma Davis', email: 'emma@design.com', checkedIn: false, registrationDate: 'Dec 20, 2024' },
        { name: 'Alex Wilson', email: 'alex@consulting.biz', checkedIn: true, registrationDate: 'Jan 2, 2025' }
      ]
    },
    { 
      id: '2', 
      name: 'Design Workshop', 
      date: 'Jan 22, 2025', 
      time: '2:00 PM', 
      attendees: 45, 
      capacity: 60, 
      status: 'active',
      location: 'Creative Space',
      address: '456 Design Avenue, San Francisco, CA 94102',
      revenue: '$1,350',
      description: 'A hands-on workshop covering the latest in UX/UI design trends, tools, and methodologies. Perfect for designers looking to enhance their skills.',
      agenda: [
        { time: '2:00 PM', activity: 'Welcome & Introductions' },
        { time: '2:15 PM', activity: 'Design Thinking Workshop' },
        { time: '3:30 PM', activity: 'Break' },
        { time: '3:45 PM', activity: 'Figma Advanced Techniques' },
        { time: '5:00 PM', activity: 'Portfolio Review & Feedback' },
        { time: '5:45 PM', activity: 'Networking & Closing' }
      ],
      attendeesList: [
        { name: 'Lisa Park', email: 'lisa@creativestudio.com', checkedIn: false, registrationDate: 'Jan 5, 2025' },
        { name: 'Tom Rodriguez', email: 'tom@webagency.net', checkedIn: false, registrationDate: 'Jan 8, 2025' },
        { name: 'Nina Patel', email: 'nina@freelance.design', checkedIn: false, registrationDate: 'Jan 10, 2025' }
      ]
    },
    { 
      id: '3', 
      name: 'Startup Pitch Night', 
      date: 'Feb 5, 2025', 
      time: '7:00 PM', 
      attendees: 89, 
      capacity: 100, 
      status: 'active',
      location: 'Business Center',
      address: '789 Venture Road, Palo Alto, CA 94301',
      revenue: '$2,225',
      description: 'An exciting evening where early-stage startups present their ideas to investors, mentors, and the entrepreneurial community.',
      agenda: [
        { time: '7:00 PM', activity: 'Registration & Welcome Reception' },
        { time: '7:30 PM', activity: 'Event Introduction' },
        { time: '7:45 PM', activity: 'Startup Pitches Round 1' },
        { time: '8:30 PM', activity: 'Networking Break' },
        { time: '8:45 PM', activity: 'Startup Pitches Round 2' },
        { time: '9:30 PM', activity: 'Investor Panel Q&A' },
        { time: '10:00 PM', activity: 'Awards & Closing' }
      ],
      attendeesList: [
        { name: 'David Kim', email: 'david@venture.capital', checkedIn: false, registrationDate: 'Jan 15, 2025' },
        { name: 'Sophie Chen', email: 'sophie@techstartup.co', checkedIn: false, registrationDate: 'Jan 18, 2025' }
      ]
    },
    { 
      id: '4', 
      name: 'Networking Event', 
      date: 'Feb 12, 2025', 
      time: '5:30 PM', 
      attendees: 73, 
      capacity: 120, 
      status: 'active',
      location: 'Grand Ballroom',
      address: '321 Business Plaza, Mountain View, CA 94041',
      revenue: '$1,825',
      description: 'A professional networking event bringing together industry professionals, entrepreneurs, and thought leaders for meaningful connections.',
      agenda: [
        { time: '5:30 PM', activity: 'Registration & Welcome Drinks' },
        { time: '6:00 PM', activity: 'Opening Remarks' },
        { time: '6:15 PM', activity: 'Structured Networking Sessions' },
        { time: '7:00 PM', activity: 'Panel: Industry Trends' },
        { time: '7:45 PM', activity: 'Open Networking & Dinner' },
        { time: '9:00 PM', activity: 'Closing & Next Steps' }
      ],
      attendeesList: [
        { name: 'Rachel Green', email: 'rachel@marketing.pro', checkedIn: false, registrationDate: 'Jan 20, 2025' },
        { name: 'James Wilson', email: 'james@finance.corp', checkedIn: false, registrationDate: 'Jan 22, 2025' }
      ]
    },
    { 
      id: '5', 
      name: 'AI Conference 2025', 
      date: 'Feb 28, 2025', 
      time: '9:00 AM', 
      attendees: 12, 
      capacity: 200, 
      status: 'upcoming',
      location: 'Convention Center',
      address: '555 Conference Boulevard, San Jose, CA 95113',
      revenue: '$600',
      description: 'A comprehensive conference exploring the latest developments in artificial intelligence, machine learning, and their applications across industries.',
      agenda: [
        { time: '9:00 AM', activity: 'Registration & Coffee' },
        { time: '9:30 AM', activity: 'Keynote: AI Revolution' },
        { time: '10:30 AM', activity: 'Technical Sessions Track A' },
        { time: '12:00 PM', activity: 'Lunch & Exhibition' },
        { time: '1:30 PM', activity: 'Technical Sessions Track B' },
        { time: '3:00 PM', activity: 'Panel: Ethics in AI' },
        { time: '4:00 PM', activity: 'Networking & Closing' }
      ],
      attendeesList: [
        { name: 'Dr. Maria Santos', email: 'maria@ai.research.edu', checkedIn: false, registrationDate: 'Feb 1, 2025' },
        { name: 'Robert Chang', email: 'robert@ml.startup.com', checkedIn: false, registrationDate: 'Feb 3, 2025' }
      ]
    }
  ], []);

  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn');
      if (!loginStatus || loginStatus !== 'true') {
        router.push('/login');
        return;
      }
    };

    checkLoginStatus();

    // Find the event by ID
    const foundEvent = events.find(e => e.id === eventId);
    setEvent(foundEvent || null);
    setLoading(false);
  }, [router, eventId, events]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Event Not Found</h1>
          <p className="mt-2 text-gray-600">The event you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/dashboard" 
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sold-out': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sold-out': return 'Sold Out';
      case 'active': return 'Active';
      case 'upcoming': return 'Upcoming';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 sm:px-0 pt-12 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{event.name}</h1>
              <div className="mt-2 flex items-center space-x-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                  {getStatusText(event.status)}
                </span>
                <span className="text-sm text-gray-500">{event.date} • {event.time}</span>
                <span className="text-sm text-gray-500">{event.attendees}/{event.capacity} attendees</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{event.revenue}</p>
                <p className="text-sm text-gray-500">Total Revenue</p>
              </div>
              <Link 
                href="/dashboard" 
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2 whitespace-nowrap cursor-pointer"
              >
                <span>Back to Dashboard</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Event Info */}
              <Card title="Event Information">
                <Card.Section title="Description">
                  <p className="mt-1 text-sm text-gray-600">{event.description}</p>
                </Card.Section>
                <Card.Section title="Location">
                  <p className="mt-1 text-sm text-gray-600">{event.location}</p>
                  <p className="text-sm text-gray-500">{event.address}</p>
                </Card.Section>
              </Card>

              {/* Agenda */}
              <Card title="Event Agenda">
                <div className="space-y-3">
                  {event.agenda.map((item: AgendaItem, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-16 bg-blue-100 rounded text-xs font-medium text-blue-800 flex items-center justify-center">
                          {item.time}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Attendees List */}
              <Card title="Attendee List">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Registered
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {event.attendeesList.map((attendee: Attendee, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {attendee.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {attendee.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              attendee.checkedIn ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {attendee.checkedIn ? 'Checked In' : 'Registered'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {attendee.registrationDate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Right Column - Quick Stats & Actions */}
            <div className="space-y-6">


              {/* Quick Actions */}
              <Card title="Quick Actions">
                <div className="space-y-3">
                  <Card.Button variant="primary">
                    <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Attendee
                  </Card.Button>
                  <Card.Button variant="secondary">
                    <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Event
                  </Card.Button>
                  <Card.Button variant="secondary">
                    <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Send Message
                  </Card.Button>
                  <Card.Button variant="secondary">
                    <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    View Analytics
                  </Card.Button>
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer">
                    <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="relative">
                      Find New Attendees
                    </span>
                  </button>
                </div>
              </Card>

              {/* Quick Stats */}
              <Card title="Quick Stats">
                <div className="space-y-4">
                  <Card.Stat label="Total Capacity" value={event.capacity} />
                  <Card.Stat label="Registered" value={event.attendees} />
                  <Card.Stat label="Available Spots" value={event.capacity - event.attendees} />
                  <Card.Stat label="Checked In" value={event.attendeesList.filter((a: Attendee) => a.checkedIn).length} />
                  <Card.Stat label="Revenue" value={event.revenue} />
                </div>
              </Card>

              {/* Event Requirements */}
              <Card title="Event Requirements">
                <div className="space-y-4">
                  <input
                    type="text"
                    id="interests"
                    defaultValue="Technology, Innovation, Networking"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Required Interests (e.g., Technology, Innovation, Networking)"
                  />
                  
                  <input
                    type="text"
                    id="location"
                    defaultValue="San Francisco Bay Area"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Preferred Location (e.g., San Francisco Bay Area)"
                  />
                  
                  <input
                    type="text"
                    id="industry"
                    defaultValue="Technology, Startups, Software Development"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Industry Background (e.g., Technology, Startups, Software Development)"
                  />
                  
                  <input
                    type="text"
                    id="pastEvents"
                    defaultValue="Tech Conference 2024, Startup Pitch Night, AI Workshop Series"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Past Event Participation (e.g., Tech Conference 2024, Startup Pitch Night)"
                  />
                  
                  <textarea
                    id="networkingGoals"
                    rows={3}
                    defaultValue="Looking to connect with startup founders, investors, and tech professionals to explore collaboration opportunities and share industry insights."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                    placeholder="Networking Goals - Describe what you hope to achieve..."
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
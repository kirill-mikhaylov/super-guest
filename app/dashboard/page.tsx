'use client';

import { supabase } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '../components/Card';

interface Event {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'upcoming' | 'completed' | 'cancelled' | 'sold-out';
  
  // Date and Time Information
  event_date: string; // DATE field from DB
  event_time: string; // TIME field from DB
  timezone?: string;
  
  // Location Information
  location: string;
  address?: string;
  venue_capacity?: number;
  
  // Registration Information
  max_attendees?: number;
  current_attendees?: number;
  registration_deadline?: string; // TIMESTAMP field from DB
  
  // Financial Information
  ticket_price?: number; // DECIMAL field from DB
  total_revenue?: number; // DECIMAL field from DB
  currency?: string;
  
  // Event Requirements and Agenda (JSONB fields)
  requirements?: Record<string, unknown>;
  agenda?: AgendaItem[];
  
  // Metadata
  created_at?: string; // TIMESTAMP WITH TIME ZONE
  updated_at?: string; // TIMESTAMP WITH TIME ZONE
  created_by?: string;
}

interface AgendaItem {
  time: string;
  activity: string;
}

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [eventLink, setEventLink] = useState('');
  const [attendeesFile, setAttendeesFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      router.push('/login');
      return;
    }

    // Get user data
    const name = localStorage.getItem('userName') || '';
    setUserName(name);
    setLoading(false);

    // Fetch events from Supabase
    fetchEvents();
  }, [router]);

  async function fetchEvents() {
    try {
      setEventsLoading(true);
      const { data: eventsData, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(eventsData || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setEventsLoading(false);
    }
  }

  // Function to handle create event POST request
  const handleCreateEvent = async () => {
    try {
      const formData = new FormData();
      formData.append('eventLink', eventLink);
      if (attendeesFile) {
        formData.append('attendeesFile', attendeesFile);
        console.log('File details:', {
          name: attendeesFile.name,
          size: attendeesFile.size,
          type: attendeesFile.type,
          lastModified: attendeesFile.lastModified
        });
      }

      console.log('Sending POST request to localhost...');
      console.log('Event Link:', eventLink);
      console.log('Attendees File:', attendeesFile?.name || 'None');
      console.log('FormData entries:', Array.from(formData.entries()));

      const response = await fetch('https://localhost', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - let browser set it with boundary for multipart/form-data
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Check if response is actually JSON before parsing
      const contentType = response.headers.get('content-type');
      let result;
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        result = await response.text();
      }
      
      console.log('Response from localhost:', result);

      // Close dialog after successful request
      setShowCreateDialog(false);
      setEventLink('');
      setAttendeesFile(null);
    } catch (error) {
      console.error('Error making POST request to localhost:', error);
      
      // Still close dialog even if request fails
      setShowCreateDialog(false);
      setEventLink('');
      setAttendeesFile(null);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // Validate file type
      const validTypes = ['.csv', '.xlsx', '.xls'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (validTypes.includes(fileExtension)) {
        setAttendeesFile(file);
      } else {
        alert('Please upload a CSV or Excel file (.csv, .xlsx, .xls)');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAttendeesFile(file);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-purple-700 font-medium">✨ Preparing your magical realm...</p>
        </div>
      </div>
    );
  }

  // Calculate dynamic stats from events
  const totalAttendees = events.reduce((sum, event) => sum + (event.current_attendees || 0), 0);
  const totalRevenue = events.reduce((sum, event) => sum + (event.total_revenue || 0), 0);
  const activeEvents = events.filter(event => event.status === 'active').length;
  const upcomingEvents = events.filter(event => event.status === 'upcoming').length;

  const stats = [
    { name: 'Total Attendees', value: totalAttendees.toLocaleString(), change: '+12%', changeType: 'increase' },
    { name: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+8%', changeType: 'increase' },
    { name: 'Active Events', value: activeEvents.toString(), change: `${upcomingEvents} upcoming`, changeType: 'neutral' },
    { name: 'Total Events', value: events.length.toString(), change: 'All realms', changeType: 'neutral' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 pt-12 pb-6 sm:px-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-purple-900 flex items-center gap-2">
                <span className="text-4xl">👑</span>
                Welcome back to your kingdom{userName ? `, ${userName}` : ''}!
              </h1>
              <p className="mt-2 text-purple-700">
                ✨ Here&apos;s the magical happenings across your realm since your last royal visit.
              </p>
            </div>
            <button 
              onClick={() => setShowCreateDialog(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2 whitespace-nowrap cursor-pointer"
            >
              <span className="text-lg">🪄</span>
              <span>Host New Gathering</span>
            </button>
          </div>
        </div>

        {/* Events List */}
        <div className="px-4 sm:px-0 mb-8">
          <div className="bg-white rounded-lg shadow-lg border border-purple-200">
            <div className="px-6 py-4 border-b border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <h3 className="text-lg font-medium text-purple-900 flex items-center gap-2">
                <span className="text-xl">🏰</span>
                Your Royal Gatherings
              </h3>
            </div>
            <div className="divide-y divide-purple-100 max-h-94 overflow-y-auto">
              {eventsLoading ? (
                <div className="px-6 py-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                  <p className="text-purple-600 mt-2">Loading magical events...</p>
                </div>
              ) : events.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <p className="text-gray-500">No magical events found. Create your first enchanted gathering!</p>
                </div>
              ) : (
                events.map((event) => (
                  <Link 
                    key={event.id} 
                    href={`/events/${event.id}`}
                    className="block hover:bg-purple-50 transition-colors duration-200"
                  >
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-gray-900">{event.name}</h4>
                          <p className="text-sm text-purple-600 mt-1">
                            {new Date(event.event_date).toLocaleDateString()} at {event.event_time} • {event.location}
                          </p>
                          <div className="flex items-center mt-2 space-x-4">
                            <span className="text-sm text-gray-600">
                              {event.current_attendees || 0}/{event.max_attendees || 0} characters attending
                            </span>
                            <span className="text-sm font-medium text-green-600">
                              ${event.total_revenue || '0.00'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              event.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : event.status === 'upcoming'
                                ? 'bg-purple-100 text-purple-800'
                                : event.status === 'draft'
                                ? 'bg-yellow-100 text-yellow-800'
                                : event.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : event.status === 'sold-out'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {event.status}
                          </span>
                        <svg
                          className="h-5 w-5 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              )))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Recent Activity and Quick Stats in 2-column layout aligned to bottom */}
        <div className="px-4 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Recent Activity */}
            <div className="flex flex-col justify-end">
              <Card title="🌟 Recent Magical Activity">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-pink-400 rounded-full mt-2"></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">23 new magical registrations</span> for your upcoming gatherings
                      </p>
                      <p className="text-xs text-purple-500">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-purple-400 rounded-full mt-2"></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Wizzard Meetup 2025</span> reached full capacity (all seats claimed!)
                      </p>
                      <p className="text-xs text-purple-500">4 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-green-400 rounded-full mt-2"></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">$1,240 golden coins</span> collected from magical ticket sales
                      </p>
                      <p className="text-xs text-purple-500">6 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-yellow-400 rounded-full mt-2"></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Design Workshop</span> enchantment scores: 4.8/5 magical stars
                      </p>
                      <p className="text-xs text-purple-500">Yesterday</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-blue-400 rounded-full mt-2"></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Networking Event</span> relocated to grander royal ballroom
                      </p>
                      <p className="text-xs text-purple-500">2 days ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-col justify-end">
              <Card title="⚡ Royal Kingdom Stats">
                <div className="space-y-4">
                  {/* Event Status Overview */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-2xl font-bold text-green-600">12</div>
                      <div className="text-xs text-purple-600 mt-1">Active ✨</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-2xl font-bold text-yellow-600">5</div>
                      <div className="text-xs text-purple-600 mt-1">Brewing 🧪</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-2xl font-bold text-blue-600">28</div>
                      <div className="text-xs text-purple-600 mt-1">Legendary 👑</div>
                    </div>
                  </div>
                  
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((item) => (
                      <div
                        key={item.name}
                        className="bg-purple-50 p-3 rounded-lg border border-purple-200 hover:shadow-md transition-all duration-300 cursor-pointer"
                      >
                        <div className="text-center">
                          <p className="text-xs font-medium text-purple-600 mb-1">{item.name}</p>
                          <p className="text-lg font-bold text-gray-900">{item.value}</p>
                          <div className="mt-1 flex items-center justify-center">
                            <p
                              className={`flex items-center text-xs font-semibold ${
                                item.changeType === 'increase' 
                                  ? 'text-green-600' 
                                  : item.changeType === 'decrease'
                                  ? 'text-red-600'
                                  : 'text-purple-600'
                              }`}
                            >
                              {item.changeType === 'increase' ? (
                                <svg
                                  className="h-3 w-3 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ) : item.changeType === 'decrease' ? (
                                <svg
                                  className="h-3 w-3 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ) : null}
                              {item.change}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Create Event Dialog */}
        {showCreateDialog && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 border-2 border-purple-200">
              {/* Dialog Header */}
              <div className="flex items-center justify-between p-6 border-b border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
                <h3 className="text-lg font-medium text-purple-900 flex items-center gap-2">
                  <span className="text-xl">🪄</span>
                  Host New Magical Gathering
                </h3>
                <button
                  onClick={() => setShowCreateDialog(false)}
                  className="text-purple-400 hover:text-purple-600 transition-colors duration-200 cursor-pointer"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Dialog Body */}
              <div className="p-6 space-y-4">
                {/* Event Link Input */}
                <div>
                  <label htmlFor="eventLink" className="block text-sm font-medium text-purple-700 mb-2">
                    🔗 Enchanted Event Portal
                  </label>
                  <input
                    type="url"
                    id="eventLink"
                    value={eventLink}
                    onChange={(e) => setEventLink(e.target.value)}
                    placeholder="Enter magical event link"
                    className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                  <p className="mt-1 text-xs text-purple-500">
                    ✨ We&apos;ll magically extract event details from this enchanted link
                  </p>
                </div>

                {/* File Upload */}
                <div>
                  <label htmlFor="attendeesFile" className="block text-sm font-medium text-purple-700 mb-2">
                    📜 Import Character Guest List
                  </label>
                  <div 
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors duration-200 ${
                      isDragOver 
                        ? 'border-purple-400 bg-purple-50' 
                        : 'border-purple-300 hover:border-purple-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="space-y-1 text-center">
                      <svg
                        className={`mx-auto h-12 w-12 transition-colors duration-200 ${
                          isDragOver ? 'text-purple-400' : 'text-purple-300'
                        }`}
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-purple-600">
                        <label
                          htmlFor="attendeesFile"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                        >
                          <span>📤 Upload a magical scroll</span>
                          <input
                            id="attendeesFile"
                            name="attendeesFile"
                            type="file"
                            accept=".csv,.xlsx,.xls"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or cast with drag and drop</p>
                      </div>
                      <p className={`text-xs transition-colors duration-200 ${
                        isDragOver ? 'text-purple-600' : 'text-purple-500'
                      }`}>
                        {isDragOver ? '✨ Release the magic here!' : '📋 Enchanted scrolls (CSV, XLSX) up to 20MB'}
                      </p>
                      {attendeesFile && (
                        <p className="text-sm text-green-600 font-medium">
                          🎭 Selected character list: {attendeesFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dialog Footer */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-purple-200 bg-purple-50">
                <button
                  onClick={() => {
                    setShowCreateDialog(false);
                    setEventLink('');
                    setAttendeesFile(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-purple-700 bg-white border border-purple-300 rounded-md hover:bg-purple-50 transition-colors duration-200 cursor-pointer"
                >
                  🚪 Cancel Spell
                </button>
                <button
                  onClick={handleCreateEvent}
                  disabled={!eventLink.trim()}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                >
                  🪄 Cast Gathering Spell
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
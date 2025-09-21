'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Card from '../../components/Card';
import { supabase } from '@/utils/supabase/client';
import { formatCurrency, formatNumber } from '@/utils/formatting';

// Define types for better TypeScript support
interface AgendaItem {
  time: string;
  activity: string;
}

interface ScoringEntry {
  participant_id: string;
  score: number;
  explanation: string;
}

interface Attendee {
  id: string;
  event_id: string;
  
  // Personal Information
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  
  // Professional Information
  company?: string;
  job_title?: string;
  industry?: string;
  
  // Registration Information
  status: 'registered' | 'confirmed' | 'attended' | 'no-show' | 'cancelled';
  registration_date: string;
  check_in_time?: string;
  
  // Event-specific Information
  interests?: string[];
  networking_goals?: string;
  past_events?: string[];
  score?: number;
  scoreExplanation?: string;
  
  // Payment Information
  payment_status?: string;
  amount_paid?: number;
  payment_method?: string;
  transaction_id?: string;
  
  // Metadata
  created_at?: string;
  updated_at?: string;
}

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

export default function EventDetails() {
  const [loading, setLoading] = useState(true);
  const [attendeesLoading, setAttendeesLoading] = useState(true);
  const [scoreLoading, setScoreLoading] = useState(false);
  const [scoreError, setScoreError] = useState<boolean>(false);
  const [event, setEvent] = useState<Event | null>(null);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  // Fetch event details from Supabase
  const fetchEventDetails = useCallback(async () => {
    try {
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (eventError) {
        console.error('Error fetching event:', eventError);
        setEvent(null);
      } else {
        setEvent(eventData);
      }
    } catch (error) {
      console.error('Error:', error);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  // Fetch attendees for the event
  const fetchAttendees = useCallback(async () => {
    try {
      const { data: attendeesData, error: attendeesError } = await supabase
        .from('attendees')
        .select('*')
        .eq('event_id', eventId)
        .order('registration_date', { ascending: false });

      if (attendeesError) {
        console.error('Error fetching attendees:', attendeesError);
        setAttendees([]);
      } else {
        setAttendees(attendeesData || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setAttendees([]);
    } finally {
      setAttendeesLoading(false);
    }
  }, [eventId]);

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

    if (eventId) {
      fetchEventDetails();
      fetchAttendees();
    }
  }, [router, eventId, fetchEventDetails, fetchAttendees]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-purple-600 mb-8 mx-auto"></div>
          <p className="text-purple-600 font-medium">✨ Summoning magical gathering details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="text-purple-600 mb-4">
            <span className="text-6xl">🏰</span>
          </div>
          <h1 className="text-2xl font-bold text-purple-900 mb-2">Enchanted Gathering Not Found</h1>
          <p className="text-purple-600 mb-6">The magical event you seek has vanished into the mists.</p>
          <Link 
            href="/dashboard" 
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            🏠 Return to Royal Court
          </Link>
        </div>
      </div>
    );
  }

  // Helper function to strip markdown from JSON response
  const stripMarkdownAndParseJSON = (text: string) => {
    try {
      // Remove markdown code block markers
      let cleanedText = text.trim();
      
      // Remove opening ```json or ``` markers
      cleanedText = cleanedText.replace(/^```json\s*/i, '');
      cleanedText = cleanedText.replace(/^```\s*/, '');
      
      // Remove closing ``` markers
      cleanedText = cleanedText.replace(/\s*```$/, '');
      
      // Additional cleanup for any extra whitespace
      cleanedText = cleanedText.trim();
      
      // Parse as JSON
      return JSON.parse(cleanedText);
    } catch (error) {
      console.error('Error parsing cleaned JSON:', error);
      console.error('Original text:', text);
      throw new Error('Failed to parse response as JSON after cleaning');
    }
  };

  // Helper function to format attendee name
  const getAttendeeDisplayName = (attendee: Attendee) => {
    return `${attendee.first_name} ${attendee.last_name}`;
  };

  // Helper function to check if attendee is checked in
  const isCheckedIn = (attendee: Attendee) => {
    return attendee.status === 'attended' || !!attendee.check_in_time;
  };

  // Helper function to get requirement value safely
  const getRequirementValue = (key: string, defaultValue: string = ''): string => {
    if (!event?.requirements || typeof event.requirements !== 'object') return defaultValue;
    const value = event.requirements[key];
    if (Array.isArray(value)) return value.join(', ');
    return typeof value === 'string' ? value : defaultValue;
  };

  // Function to handle score button click - POST request to server API
  const handleScoreClick = async () => {
    try {
      setScoreLoading(true);
      setScoreError(false); // Clear any previous errors

      const filterAttendees = attendees.map((att) => {
        return {
          id: att.id,
          first_name: att.first_name,
          last_name: att.last_name,
          email: att.email,
          company: att.company,
          industry: att.industry,
          interests: att.interests,
          job_title: att.job_title,
          networking_goals: att.networking_goals,
          past_events: att.past_events
        };
      });

      // Prepare the payload for our API route
      const payload = {
        eventRequirements: event?.requirements || {},
        attendees: filterAttendees,
        eventId: eventId,
        eventName: event?.name
      };

      // Make request to our server API route
      const response = await fetch(`/api/events/${eventId}/score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      const scoringData = stripMarkdownAndParseJSON(result.data);

      if (result.success && Array.isArray(scoringData)) {
        // Update attendees with scores
        const updatedAttendees = attendees.map(attendee => {
          const scoreEntry = scoringData.find(
            (entry: ScoringEntry) => entry.participant_id === attendee.id
          );
          if (scoreEntry) {
            return {
              ...attendee,
              score: scoreEntry.score,
              scoreExplanation: scoreEntry.explanation
            };
          }
          return attendee;
        });
        
        // Sort attendees by score (high to low), keeping attendees without scores at the end
        const sortedAttendees = updatedAttendees.sort((a, b) => {
          // If both have scores, sort by score (high to low)
          if (typeof a.score === 'number' && typeof b.score === 'number') {
            return b.score - a.score;
          }
          // If only a has a score, a comes first
          if (typeof a.score === 'number' && typeof b.score !== 'number') {
            return -1;
          }
          // If only b has a score, b comes first
          if (typeof a.score !== 'number' && typeof b.score === 'number') {
            return 1;
          }
          // If neither has a score, maintain original order (by registration date)
          return 0;
        });
        
        setAttendees(sortedAttendees);
      } else {
        const errorMsg = result.error || 'Failed to process scoring data';
        console.error('Scoring failed:', errorMsg);
        setScoreError(true);
      }

    } catch (error) {
      console.error('Error making request to scoring API:', error);
      setScoreError(true);
    } finally {
      setScoreLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation and Event Title */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/dashboard" 
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Royal Court
          </Link>
          <h1 className="text-2xl font-bold text-purple-900">🏰 {event.name}</h1>
        </div>

        {/* Event Header Card */}
        <div className="bg-white rounded-lg shadow-lg border border-purple-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-purple-900 mb-3">{event.name}</h2>
              <div className="space-y-2 mb-4">
                <div className="text-sm text-purple-600 font-medium">
                  📅 {new Date(event.event_date).toLocaleDateString()} 🕐 {event.event_time}
                </div>
                <div className="text-sm text-purple-600 font-medium">
                  👥 {formatNumber(event.current_attendees)}/{formatNumber(event.max_attendees)} magical beings
                </div>
              </div>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
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
                  💰 {formatCurrency(event.total_revenue)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Agenda */}
          <div className="lg:col-span-2">
            <Card title="📜 Royal Agenda">
              <div className="space-y-4">
                {event.agenda && Array.isArray(event.agenda) && event.agenda.length > 0 ? (
                  event.agenda.map((item: AgendaItem, index: number) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-purple-200 text-purple-800 text-sm font-medium">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-purple-900">🕐 {item.time}</p>
                        <p className="text-sm text-gray-700 mt-1">{item.activity}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <span className="text-4xl mb-4 block">📜</span>
                    <p className="text-gray-500">The royal agenda is still being crafted...</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Attendees List */}
            <Card className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">👑 Noble Attendees</h2>
                <div className="flex flex-col items-end gap-1">
                  <button 
                    onClick={handleScoreClick}
                    disabled={scoreLoading}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                      scoreError 
                        ? 'text-red-700 bg-red-100 border border-red-300 hover:bg-red-200' 
                        : 'text-purple-700 bg-purple-100 border border-purple-300 hover:bg-purple-200'
                    }`}
                  >
                    {scoreLoading ? '⏳ Scoring...' : scoreError ? '⚠️ Retry Score' : '📊 Score'}
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {attendeesLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-2"></div>
                    <p className="text-purple-600">Loading royal guests...</p>
                  </div>
                ) : attendees.length > 0 ? (
                  attendees.map((attendee: Attendee) => (
                    <div key={attendee.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                      <div>
                        <p className="font-medium text-purple-900">
                          {getAttendeeDisplayName(attendee)}
                        </p>
                        <p className="text-sm text-purple-600">{attendee.email}</p>
                        {attendee.company && (
                          <p className="text-sm text-gray-600">{attendee.company}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          {(attendee.score !== undefined && attendee.score !== null && typeof attendee.score === 'number') && (
                            <span 
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-help relative group ${
                                attendee.score >= 80 ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                                attendee.score >= 60 ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                                'bg-red-100 text-red-800 border border-red-200'
                              }`}
                            >
                              🔮 {attendee.score}% Match
                              {/* Tooltip */}
                              {attendee.scoreExplanation && (
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 w-64 sm:w-80 md:w-96">
                                  <div className="text-left leading-relaxed">
                                    {attendee.scoreExplanation}
                                  </div>
                                  {/* Arrow */}
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                                </div>
                              )}
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              isCheckedIn(attendee) ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {isCheckedIn(attendee) ? '👑 Present at Court' : '📜 Invited to Realm'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Joined: {new Date(attendee.registration_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <span className="text-4xl mb-4 block">👑</span>
                    <p className="text-gray-500">No royal guests have joined this gathering yet.</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column - Event Details & Stats */}
          <div className="space-y-8">
            {/* Location Info */}
            <Card title="📍 Royal Venue">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-purple-900">🏰 Castle</p>
                  <p className="text-sm text-gray-700">{event.location}</p>
                </div>
                {event.address && (
                  <div>
                    <p className="text-sm font-medium text-purple-900">📍 Royal Address</p>
                    <p className="text-sm text-gray-700">{event.address}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Stats */}
            <Card title="📊 Royal Statistics">
              <div className="space-y-4">
                <Card.Stat label="🏰 Castle Capacity" value={formatNumber(event.max_attendees)} />
                <Card.Stat label="📜 Royal Invitations" value={formatNumber(event.current_attendees)} />
                <Card.Stat label="✨ Available Spots" value={formatNumber((event.max_attendees || 0) - (event.current_attendees || 0))} />
                <Card.Stat label="👥 Present at Court" value={formatNumber(attendees.filter((a: Attendee) => isCheckedIn(a)).length)} />
                <Card.Stat label="💰 Royal Treasury" value={formatCurrency(event.total_revenue)} />
              </div>
            </Card>

            {/* Event Requirements */}
            <Card title="🌟 Magical Requirements">
              <div className="space-y-4">
                <textarea
                  id="interests"
                  rows={3}
                  defaultValue={getRequirementValue('magical_abilities') || getRequirementValue('magical_specialties') || getRequirementValue('interests') || ''}
                  className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm bg-purple-25"
                  placeholder="Required Magical Abilities (e.g., Nature Magic, Forest Navigation, Animal Communication)"
                />
                
                <textarea
                  id="location"
                  rows={3}
                  defaultValue={getRequirementValue('realm') || getRequirementValue('preferredRealm') || ''}
                  className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm bg-purple-25"
                  placeholder="Preferred Magical Realm (e.g., Enchanted Forest, Fairy Tale Kingdoms)"
                />
                
                <textarea
                  id="industry"
                  rows={3}
                  defaultValue={getRequirementValue('business_focus') || getRequirementValue('specializations') || getRequirementValue('characterBackground') || ''}
                  className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm bg-purple-25"
                  placeholder="Focus Areas (e.g., Magical Enterprises, Heroic Leadership, Royal Protocol)"
                />
                
                <textarea
                  id="experience"
                  rows={3}
                  defaultValue={getRequirementValue('experience_level') || ''}
                  className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm bg-purple-25"
                  placeholder="Experience Level (e.g., all, beginner, intermediate, advanced)"
                />
                
                <textarea
                  id="networkingGoals"
                  rows={3}
                  defaultValue={getRequirementValue('networking_goals') || getRequirementValue('networkingGoals') || ''}
                  className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm resize-none bg-purple-25"
                  placeholder="Event Networking Goals - Describe the magical aspirations for this gathering..."
                />
              </div>
            </Card>

            {/* Quick Actions */}
            <Card title="⚡ Royal Commands">
              <div className="space-y-3">
                <Card.Button variant="primary">
                  🌟 Invite New Guest
                </Card.Button>
                <Card.Button variant="secondary">
                  📜 Edit Gathering
                </Card.Button>
                <Card.Button variant="secondary">
                  🕊️ Send Royal Message
                </Card.Button>
                <Card.Button variant="secondary">
                  📊 Royal Analytics
                </Card.Button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer">
                  <span className="relative">
                    🔮 Summon New Characters
                  </span>
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
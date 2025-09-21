'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '../components/Card';

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [eventLink, setEventLink] = useState('');
  const [attendeesFile, setAttendeesFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
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
  }, [router]);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Sample metrics data
  const stats = [
    { name: 'Total Attendees', value: '2,847', change: '+12%', changeType: 'increase' },
    { name: 'Revenue', value: '$43,890', change: '+8%', changeType: 'increase' },
    { name: 'Avg. Rating', value: '4.8', change: '+0.2', changeType: 'increase' },
    { name: 'Conversion', value: '73%', change: '-3%', changeType: 'decrease' },
  ];

  // Sample events data
  const events = [
    { 
      id: 1, 
      name: 'Tech Meetup 2025', 
      date: 'Jan 25, 2025', 
      time: '6:00 PM', 
      attendees: 156, 
      capacity: 200, 
      status: 'active',
      location: 'Innovation Hub',
      revenue: '$3,900'
    },
    { 
      id: 2, 
      name: 'Design Workshop', 
      date: 'Jan 30, 2025', 
      time: '2:00 PM', 
      attendees: 45, 
      capacity: 50, 
      status: 'active',
      location: 'Creative Space',
      revenue: '$1,350'
    },
    { 
      id: 3, 
      name: 'Startup Pitch Night', 
      date: 'Feb 5, 2025', 
      time: '7:00 PM', 
      attendees: 89, 
      capacity: 100, 
      status: 'active',
      location: 'Business Center',
      revenue: '$2,225'
    },
    { 
      id: 4, 
      name: 'Networking Event', 
      date: 'Feb 12, 2025', 
      time: '5:30 PM', 
      attendees: 73, 
      capacity: 120, 
      status: 'active',
      location: 'Grand Ballroom',
      revenue: '$1,825'
    },
    { 
      id: 5, 
      name: 'AI Conference 2025', 
      date: 'Feb 28, 2025', 
      time: '9:00 AM', 
      attendees: 12, 
      capacity: 200, 
      status: 'upcoming',
      location: 'Convention Center',
      revenue: '$600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 pt-12 pb-6 sm:px-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back{userName ? `, ${userName}` : ''}!
              </h1>
              <p className="mt-2 text-gray-600">
                Here&apos;s what happened since your last login.
              </p>
            </div>
            <button 
              onClick={() => setShowCreateDialog(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2 whitespace-nowrap cursor-pointer"
            >
              <span>Create New Event</span>
            </button>
          </div>
        </div>

        {/* Events List */}
        <div className="px-4 sm:px-0 mb-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Your Events</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {events.map((event) => (
                <Link 
                  key={event.id} 
                  href={`/events/${event.id}`}
                  className="block hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900">{event.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {event.date} at {event.time} • {event.location}
                        </p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-sm text-gray-600">
                            {event.attendees}/{event.capacity} attendees
                          </span>
                          <span className="text-sm font-medium text-green-600">
                            {event.revenue}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            event.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : event.status === 'upcoming'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {event.status}
                        </span>
                        <svg
                          className="h-5 w-5 text-gray-400"
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
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Recent Activity and Quick Stats in 2-column layout aligned to bottom */}
        <div className="px-4 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Recent Activity */}
            <div className="flex flex-col justify-end">
              <Card title="Recent Activity">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-green-400 rounded-full mt-2"></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">23 new registrations</span> for your upcoming events
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-blue-400 rounded-full mt-2"></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Tech Meetup 2025</span> reached capacity
                      </p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-purple-400 rounded-full mt-2"></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">$1,240 revenue</span> generated from ticket sales
                      </p>
                      <p className="text-xs text-gray-500">6 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-yellow-400 rounded-full mt-2"></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Design Workshop</span> feedback scores: 4.8/5
                      </p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-red-400 rounded-full mt-2"></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Networking Event</span> moved to larger venue
                      </p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-col justify-end">
              <Card title="Quick Stats">
                <div className="space-y-4">
                  {/* Event Status Overview */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">12</div>
                      <div className="text-xs text-gray-500 mt-1">Active</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">5</div>
                      <div className="text-xs text-gray-500 mt-1">Draft</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">28</div>
                      <div className="text-xs text-gray-500 mt-1">Completed</div>
                    </div>
                  </div>
                  
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((item) => (
                      <div
                        key={item.name}
                        className="bg-gray-50 p-3 rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer"
                      >
                        <div className="text-center">
                          <p className="text-xs font-medium text-gray-500 mb-1">{item.name}</p>
                          <p className="text-lg font-bold text-gray-900">{item.value}</p>
                          <div className="mt-1 flex items-center justify-center">
                            <p
                              className={`flex items-center text-xs font-semibold ${
                                item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
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
                              ) : (
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
                              )}
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
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              {/* Dialog Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Create New Event</h3>
                <button
                  onClick={() => setShowCreateDialog(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
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
                  <label htmlFor="eventLink" className="block text-sm font-medium text-gray-700 mb-2">
                    Event Link
                  </label>
                  <input
                    type="url"
                    id="eventLink"
                    value={eventLink}
                    onChange={(e) => setEventLink(e.target.value)}
                    placeholder="Enter event link"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    We&apos;ll automatically extract event details from this link
                  </p>
                </div>

                {/* File Upload */}
                <div>
                  <label htmlFor="attendeesFile" className="block text-sm font-medium text-gray-700 mb-2">
                    Import Attendees Data
                  </label>
                  <div 
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors duration-200 ${
                      isDragOver 
                        ? 'border-blue-400 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="space-y-1 text-center">
                      <svg
                        className={`mx-auto h-12 w-12 transition-colors duration-200 ${
                          isDragOver ? 'text-blue-400' : 'text-gray-400'
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
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="attendeesFile"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="attendeesFile"
                            name="attendeesFile"
                            type="file"
                            accept=".csv,.xlsx,.xls"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className={`text-xs transition-colors duration-200 ${
                        isDragOver ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {isDragOver ? 'Drop your file here!' : 'CSV, XLSX up to 20MB'}
                      </p>
                      {attendeesFile && (
                        <p className="text-sm text-green-600 font-medium">
                          Selected: {attendeesFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dialog Footer */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowCreateDialog(false);
                    setEventLink('');
                    setAttendeesFile(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle create event logic here
                    console.log('Creating event with:', { eventLink, attendeesFile });
                    setShowCreateDialog(false);
                    setEventLink('');
                    setAttendeesFile(null);
                  }}
                  disabled={!eventLink.trim()}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
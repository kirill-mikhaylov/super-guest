'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEventsStore } from '@/stores/useEventsStore';
import CsvUploader from '@/components/common/CsvUploader';
import { Criteria } from '@/stores/useEventsStore';

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

export default function NewEventPage() {
  const [eventData, setEventData] = useState({
    url: '',
  });
  const [guestData, setGuestData] = useState<any[]>([]);
  const [showCsvUploader, setShowCsvUploader] = useState(false);
  
  const router = useRouter();
  const { createEvent, importGuests } = useEventsStore();

  const handleCsvImport = (data: any[]) => {
    setGuestData(data);
    setShowCsvUploader(false);
  };

  const handleAddEvent = () => {
    if (!eventData.url) {
      return;
    }

    const eventId = createEvent({
      name: `Event from ${eventData.url}`,
      date: new Date().toISOString().split('T')[0],
      ...eventData,
      criteria: defaultCriteria,
      guests: [],
      prospects: [],
    });

    if (guestData.length > 0) {
      importGuests(eventId, guestData);
    }

    router.push(`/events/${eventId}`);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 4 }}>
        Create New Event
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Event Registration URL
            </Typography>

            <TextField
              fullWidth
              label="Event Registration URL"
              required
              placeholder="https://example.com/register"
              value={eventData.url}
              onChange={(e) => setEventData({ ...eventData, url: e.target.value })}
              sx={{ mb: 4 }}
            />

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Import Guest List (Optional)
              </Typography>
              
              <CsvUploader
                onImport={handleCsvImport}
                onCancel={() => setShowCsvUploader(false)}
                showUploader={showCsvUploader || guestData.length === 0}
                onToggleUploader={() => setShowCsvUploader(!showCsvUploader)}
              />

              {guestData.length > 0 && (
                <Box sx={{ p: 2, bgcolor: 'success.light', borderRadius: 1, mt: 2 }}>
                  <Typography variant="body2" color="success.dark">
                    ✓ {guestData.length} guests ready to import
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            
            <Button
              variant="contained"
              onClick={handleAddEvent}
              disabled={!eventData.url}
              size="large"
            >
              Add Event
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
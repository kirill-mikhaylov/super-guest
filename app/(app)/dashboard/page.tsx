'use client';

import {
  Grid,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  Event,
  People,
  Analytics,
  EventNote,
  Upload,
  Tune,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import KpiCard from '@/components/common/KpiCard';
import { mockKpis, mockChartData } from '@/data/kpis';
import { mockActivity } from '@/data/activity';
import { formatDate } from '@/lib/utils';
import { useEventsStore } from '@/stores/useEventsStore';

const activityIcons = {
  event_created: EventNote,
  csv_import: Upload,
  criteria_updated: Tune,
  guest_confirmed: People,
  prospects_generated: Analytics,
};

export default function DashboardPage() {
  const { events } = useEventsStore();

  const totalGuests = events.reduce((acc, event) => acc + event.guests.length, 0);
  const avgScore = events.length > 0 
    ? Math.round(events.reduce((acc, event) => {
        const eventAvg = event.guests.reduce((sum, guest) => sum + guest.score, 0) / (event.guests.length || 1);
        return acc + eventAvg;
      }, 0) / events.length)
    : 0;

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 4 }}>
        Dashboard
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard
            title="Total Revenue"
            value={`$${mockKpis.totalRevenue.toLocaleString()}`}
            icon={<TrendingUp />}
            trend={{ value: mockKpis.monthlyGrowth, direction: 'up' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard
            title="Total Events"
            value={events.length}
            icon={<Event />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard
            title="Total Guests"
            value={totalGuests}
            icon={<People />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard
            title="Average Score"
            value={`${avgScore}%`}
            icon={<Analytics />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Analytics Chart */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 3 }}>
                Guest Engagement Trend
              </Typography>
              
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => formatDate(value, 'MMM d')}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      labelFormatter={(value) => formatDate(value, 'MMM d, yyyy')}
                      formatter={(value, name) => [
                        value,
                        name === 'guests' ? 'Guests' : 'Engagement %'
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="guests" 
                      stroke="#1976d2" 
                      strokeWidth={2}
                      dot={{ fill: '#1976d2' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="engagement" 
                      stroke="#dc004e" 
                      strokeWidth={2}
                      dot={{ fill: '#dc004e' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 3 }}>
                Recent Activity
              </Typography>
              
              <List dense>
                {mockActivity.slice(0, 5).map((activity) => {
                  const IconComponent = activityIcons[activity.type as keyof typeof activityIcons];
                  
                  return (
                    <ListItem key={activity.id} sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                          <IconComponent fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.title}
                        secondary={
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              {activity.description}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                              <Typography variant="caption" color="text.secondary">
                                {formatDate(activity.timestamp, 'MMM d, HH:mm')}
                              </Typography>
                              {activity.user !== 'System' && activity.user !== 'AI Engine' && (
                                <Chip
                                  label={activity.user}
                                  size="small"
                                  variant="outlined"
                                  sx={{ height: 16, fontSize: '0.6rem' }}
                                />
                              )}
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
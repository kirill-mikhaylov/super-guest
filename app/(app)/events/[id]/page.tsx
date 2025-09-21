'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Slider,
  Alert,
} from '@mui/material';
import { Search, Tune, PersonAdd, Analytics } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useParams } from 'next/navigation';
import { useEventsStore, Guest } from '@/stores/useEventsStore';
import GuestDetailsDrawer from '@/components/events/GuestDetailsDrawer';
import EmptyState from '@/components/common/EmptyState';
import { formatDate } from '@/lib/utils';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function EventDashboard() {
  const params = useParams();
  const eventId = params.id as string;
  
  const { 
    getEventById, 
    updateCriteria, 
    rescoreGuests, 
    generateProspects,
    promoteProspectToGuest,
    updateGuestStatus 
  } = useEventsStore();
  
  const event = getEventById(eventId);
  
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [guestDrawerOpen, setGuestDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tabValue, setTabValue] = useState(0);
  const [criteriaChanged, setCriteriaChanged] = useState(false);

  useEffect(() => {
    if (!event) return;
    
    // Auto-score guests if they haven't been scored
    const unscored = event.guests.filter(guest => guest.score === 0);
    if (unscored.length > 0) {
      rescoreGuests(eventId);
    }
  }, [event, eventId, rescoreGuests]);

  if (!event) {
    return (
      <EmptyState
        title="Event not found"
        description="The event you're looking for doesn't exist or has been deleted."
        action={{
          label: 'Back to Dashboard',
          onClick: () => window.history.back(),
        }}
      />
    );
  }

  const filteredGuests = event.guests.filter((guest) => {
    const matchesSearch = 
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || guest.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const guestStats = {
    total: event.guests.length,
    confirmed: event.guests.filter(g => g.status === 'Confirmed').length,
    invited: event.guests.filter(g => g.status === 'Invited').length,
    declined: event.guests.filter(g => g.status === 'Declined').length,
    avgScore: event.guests.length > 0 
      ? Math.round(event.guests.reduce((acc, g) => acc + g.score, 0) / event.guests.length)
      : 0,
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 180,
      renderCell: (params) => (
        <Box sx={{ fontWeight: 600 }}>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 220,
    },
    {
      field: 'company',
      headerName: 'Company',
      width: 160,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 140,
    },
    {
      field: 'score',
      headerName: 'Score',
      width: 80,
      renderCell: (params) => (
        <Box
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 1,
            bgcolor: params.value >= 80 ? 'success.light' : 
                    params.value >= 60 ? 'warning.light' : 'grey.200',
            color: params.value >= 80 ? 'success.dark' : 
                   params.value >= 60 ? 'warning.dark' : 'text.secondary',
            fontSize: '0.875rem',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          {params.value}%
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={
            params.value === 'Confirmed' ? 'success' :
            params.value === 'Declined' ? 'error' :
            params.value === 'Waitlist' ? 'warning' : 'default'
          }
        />
      ),
    },
  ];

  const handleGuestRowClick = (params: GridRowParams) => {
    setSelectedGuest(params.row);
    setGuestDrawerOpen(true);
  };

  const handleGuestStatusChange = (guestId: string, status: Guest['status']) => {
    updateGuestStatus(eventId, guestId, status);
  };

  const handleCriteriaChange = (criteriaId: string, weight: number) => {
    const updatedCriteria = event.criteria.map(c => 
      c.id === criteriaId ? { ...c, weight } : c
    );
    updateCriteria(eventId, updatedCriteria);
    setCriteriaChanged(true);
  };

  const handleRescoreGuests = () => {
    rescoreGuests(eventId);
    setCriteriaChanged(false);
  };

  const handleGenerateProspects = () => {
    const prospects = generateProspects(eventId);
    // Show success message or update UI
  };

  const handlePromoteProspect = (prospectId: string) => {
    promoteProspectToGuest(eventId, prospectId);
  };

  return (
    <Box>
      {/* Event Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          {event.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {formatDate(event.date)} {event.location && `• ${event.location}`}
        </Typography>
        
        {/* Event Stats */}
        <Grid container spacing={2}>
          <Grid item>
            <Chip label={`${guestStats.total} Total Guests`} />
          </Grid>
          <Grid item>
            <Chip label={`${guestStats.confirmed} Confirmed`} color="success" />
          </Grid>
          <Grid item>
            <Chip label={`${guestStats.invited} Invited`} />
          </Grid>
          <Grid item>
            <Chip label={`${guestStats.avgScore}% Avg Score`} color="primary" />
          </Grid>
        </Grid>
      </Box>

      {criteriaChanged && (
        <Alert
          severity="info"
          action={
            <Button color="inherit" size="small" onClick={handleRescoreGuests}>
              Re-score Guests
            </Button>
          }
          sx={{ mb: 3 }}
        >
          Scoring criteria have been updated. Re-score guests to apply changes.
        </Alert>
      )}

      {/* Main Content Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Current Guests" />
          <Tab label="Scoring Criteria" />
          <Tab label="Discover Prospects" />
        </Tabs>
      </Box>

      {/* Current Guests Tab */}
      <TabPanel value={tabValue} index={0}>
        <Card>
          <CardContent sx={{ p: 3 }}>
            {/* Search and Filters */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
              <TextField
                placeholder="Search guests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: 300 }}
              />
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  label="All"
                  onClick={() => setStatusFilter('all')}
                  color={statusFilter === 'all' ? 'primary' : 'default'}
                  clickable
                />
                <Chip
                  label="Invited"
                  onClick={() => setStatusFilter('Invited')}
                  color={statusFilter === 'Invited' ? 'primary' : 'default'}
                  clickable
                />
                <Chip
                  label="Confirmed"
                  onClick={() => setStatusFilter('Confirmed')}
                  color={statusFilter === 'Confirmed' ? 'primary' : 'default'}
                  clickable
                />
                <Chip
                  label="Declined"
                  onClick={() => setStatusFilter('Declined')}
                  color={statusFilter === 'Declined' ? 'primary' : 'default'}
                  clickable
                />
                <Chip
                  label="Waitlist"
                  onClick={() => setStatusFilter('Waitlist')}
                  color={statusFilter === 'Waitlist' ? 'primary' : 'default'}
                  clickable
                />
              </Box>
            </Box>

            {/* Guests DataGrid */}
            {filteredGuests.length > 0 ? (
              <DataGrid
                rows={filteredGuests}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 25, 50]}
                onRowClick={handleGuestRowClick}
                sx={{
                  minHeight: 400,
                  '& .MuiDataGrid-row': {
                    cursor: 'pointer',
                  },
                }}
              />
            ) : (
              <EmptyState
                title="No guests found"
                description="No guests match your current search and filter criteria."
              />
            )}
          </CardContent>
        </Card>
      </TabPanel>

      {/* Scoring Criteria Tab */}
      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Tune sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Scoring Criteria
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Adjust the weight of each scoring criterion. Changes will require re-scoring all guests.
            </Typography>

            <Grid container spacing={3}>
              {event.criteria.map((criterion) => (
                <Grid item xs={12} md={6} key={criterion.id}>
                  <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {criterion.label}
                      </Typography>
                      <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                        {criterion.weight}%
                      </Typography>
                    </Box>
                    
                    <Slider
                      value={criterion.weight}
                      onChange={(_, value) => handleCriteriaChange(criterion.id, value as number)}
                      min={0}
                      max={100}
                      step={5}
                      marks={[
                        { value: 0, label: '0%' },
                        { value: 50, label: '50%' },
                        { value: 100, label: '100%' },
                      ]}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Discover Prospects Tab */}
      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Analytics sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Discover New Prospects
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Find new potential guests based on your event criteria and network analysis.
            </Typography>

            {event.prospects.length === 0 ? (
              <EmptyState
                title="No prospects yet"
                description="Generate new prospect recommendations based on your event criteria."
                action={{
                  label: "Generate Prospects",
                  onClick: handleGenerateProspects,
                }}
              />
            ) : (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Found {event.prospects.length} potential guests
                </Typography>
                
                <Grid container spacing={2}>
                  {event.prospects.map((prospect) => (
                    <Grid item xs={12} md={6} lg={4} key={prospect.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            {prospect.name}
                          </Typography>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {prospect.title && prospect.company 
                              ? `${prospect.title} at ${prospect.company}`
                              : prospect.company || prospect.title}
                          </Typography>
                          
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            {prospect.email}
                          </Typography>
                          
                          <Chip
                            label={`Suggested by ${prospect.suggestedBy}`}
                            size="small"
                            sx={{ mb: 2 }}
                          />
                          
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<PersonAdd />}
                              onClick={() => handlePromoteProspect(prospect.id)}
                            >
                              Add to Event
                            </Button>
                            <Button size="small" variant="outlined">
                              Save for Later
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </CardContent>
        </Card>
      </TabPanel>

      {/* Guest Details Drawer */}
      <GuestDetailsDrawer
        open={guestDrawerOpen}
        guest={selectedGuest}
        onClose={() => setGuestDrawerOpen(false)}
        onStatusChange={handleGuestStatusChange}
      />
    </Box>
  );
}
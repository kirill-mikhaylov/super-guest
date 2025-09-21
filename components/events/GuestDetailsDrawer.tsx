'use client';

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Close, Email, Business, LocationOn, Star } from '@mui/icons-material';
import { Guest } from '@/stores/useEventsStore';
import { formatDate } from '@/lib/utils';

interface GuestDetailsDrawerProps {
  open: boolean;
  guest: Guest | null;
  onClose: () => void;
  onStatusChange?: (guestId: string, status: Guest['status']) => void;
}

const statusColors = {
  Invited: 'default',
  Confirmed: 'success',
  Declined: 'error',
  Waitlist: 'warning',
} as const;

export default function GuestDetailsDrawer({ 
  open, 
  guest, 
  onClose, 
  onStatusChange 
}: GuestDetailsDrawerProps) {
  if (!guest) return null;

  const handleStatusChange = (status: Guest['status']) => {
    onStatusChange?.(guest.id, status);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 400, maxWidth: '90vw' },
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Guest Details
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>

        {/* Guest Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 64, height: 64, mr: 2 }}>
            {guest.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {guest.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Chip
                label={guest.status}
                size="small"
                color={statusColors[guest.status]}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Star sx={{ color: 'warning.main', fontSize: '1rem', mr: 0.5 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {guest.score}%
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Contact Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Contact Information
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2">{guest.email}</Typography>
          </Box>
          
          {guest.company && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Business fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">
                {guest.title ? `${guest.title} at ${guest.company}` : guest.company}
              </Typography>
            </Box>
          )}
          
          {guest.city && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">{guest.city}</Typography>
            </Box>
          )}
        </Box>

        {/* Tags */}
        {guest.tags && guest.tags.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Tags
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {guest.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        )}

        <Divider sx={{ mb: 3 }} />

        {/* Score Breakdown */}
        {guest.scoreBreakdown && Object.keys(guest.scoreBreakdown).length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Score Breakdown
            </Typography>
            
            {Object.entries(guest.scoreBreakdown).map(([key, score]) => (
              <Box key={key} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {score}%
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 4,
                    bgcolor: 'grey.200',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${score}%`,
                      bgcolor: 'primary.main',
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        )}

        <Divider sx={{ mb: 3 }} />

        {/* Status Management */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Status Management
          </Typography>
          
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={guest.status}
              label="Status"
              onChange={(e) => handleStatusChange(e.target.value as Guest['status'])}
            >
              <MenuItem value="Invited">Invited</MenuItem>
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Declined">Declined</MenuItem>
              <MenuItem value="Waitlist">Waitlist</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Activity History */}
        {guest.history && guest.history.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Activity History
            </Typography>
            
            <List dense>
              {guest.history.map((activity, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemText
                    primary={activity.action}
                    secondary={
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(activity.date)}
                        </Typography>
                        {activity.note && (
                          <Typography variant="caption" sx={{ display: 'block' }}>
                            {activity.note}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        <Divider sx={{ mb: 3 }} />

        {/* Quick Actions */}
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Quick Actions
          </Typography>
          
          <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
            Send Email
          </Button>
          
          <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
            Add Note
          </Button>
          
          <Button variant="outlined" color="error" fullWidth>
            Remove Guest
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
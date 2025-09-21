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
} from '@mui/material';
import { Close, Email, Business, LocationOn } from '@mui/icons-material';
import { formatDate } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
  title?: string;
  city?: string;
  joinedDate: string;
  status: string;
  lastActive: string;
}

interface UserDetailsDrawerProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

export default function UserDetailsDrawer({ open, user, onClose }: UserDetailsDrawerProps) {
  if (!user) return null;

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
            User Details
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>

        {/* User Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 64, height: 64, mr: 2 }}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {user.name}
            </Typography>
            <Chip
              label={user.status}
              size="small"
              color={user.status === 'Active' ? 'success' : 'default'}
              sx={{ mt: 0.5 }}
            />
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
            <Typography variant="body2">{user.email}</Typography>
          </Box>
          
          {user.company && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Business fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">
                {user.title ? `${user.title} at ${user.company}` : user.company}
              </Typography>
            </Box>
          )}
          
          {user.city && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">{user.city}</Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Account Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Account Information
          </Typography>
          
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Joined Date
            </Typography>
            <Typography variant="body2">
              {formatDate(user.joinedDate)}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Last Active
            </Typography>
            <Typography variant="body2">
              {formatDate(user.lastActive)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Quick Actions */}
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Quick Actions
          </Typography>
          
          <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
            Send Message
          </Button>
          
          <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
            View Events
          </Button>
          
          <Button
            variant="outlined"
            color="error"
            fullWidth
            disabled={user.status !== 'Active'}
          >
            Deactivate User
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
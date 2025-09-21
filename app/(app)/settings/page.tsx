'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
} from '@mui/material';
import { Person, Security, Palette } from '@mui/icons-material';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUiStore } from '@/stores/useUiStore';

export default function SettingsPage() {
  const { user } = useAuthStore();
  const { themeMode, toggleTheme } = useUiStore();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    guestUpdates: true,
    weeklyReports: false,
    marketingEmails: false,
  });

  const [saveAlert, setSaveAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleProfileSave = () => {
    // Mock save
    setSaveAlert({ type: 'success', message: 'Profile updated successfully!' });
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSaveAlert({ type: 'error', message: 'New passwords do not match!' });
      setTimeout(() => setSaveAlert(null), 3000);
      return;
    }
    
    // Mock password change
    setSaveAlert({ type: 'success', message: 'Password changed successfully!' });
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setSaveAlert(null), 3000);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 4 }}>
        Settings
      </Typography>

      {saveAlert && (
        <Alert severity={saveAlert.type} sx={{ mb: 3 }} onClose={() => setSaveAlert(null)}>
          {saveAlert.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Person sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Profile Information
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Full Name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                margin="normal"
              />

              <Button
                variant="contained"
                onClick={handleProfileSave}
                sx={{ mt: 2 }}
              >
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Security sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Change Password
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Current Password"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                margin="normal"
              />

              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                margin="normal"
              />

              <Button
                variant="contained"
                onClick={handlePasswordChange}
                sx={{ mt: 2 }}
              >
                Change Password
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Appearance Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Palette sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Appearance
                </Typography>
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={themeMode === 'dark'}
                    onChange={toggleTheme}
                  />
                }
                label="Dark Mode"
                sx={{ mb: 2 }}
              />

              <Typography variant="body2" color="text.secondary">
                Toggle between light and dark theme. Your preference will be saved automatically.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Notification Preferences
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.emailNotifications}
                    onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                  />
                }
                label="Email Notifications"
                sx={{ mb: 1, display: 'block' }}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.guestUpdates}
                    onChange={(e) => setNotifications({ ...notifications, guestUpdates: e.target.checked })}
                  />
                }
                label="Guest Status Updates"
                sx={{ mb: 1, display: 'block' }}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.weeklyReports}
                    onChange={(e) => setNotifications({ ...notifications, weeklyReports: e.target.checked })}
                  />
                }
                label="Weekly Reports"
                sx={{ mb: 1, display: 'block' }}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.marketingEmails}
                    onChange={(e) => setNotifications({ ...notifications, marketingEmails: e.target.checked })}
                  />
                }
                label="Marketing Emails"
                sx={{ mb: 2, display: 'block' }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Account Management */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Account Management
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Export your data including events, guests, and analytics.
                </Typography>
                <Button variant="outlined">
                  Export Data
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                  Permanently delete your account and all associated data.
                </Typography>
                <Button variant="outlined" color="error">
                  Delete Account
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
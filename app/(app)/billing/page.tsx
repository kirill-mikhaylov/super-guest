'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import { CreditCard, CheckCircle, TrendingUp } from '@mui/icons-material';

export default function BillingPage() {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const currentPlan = {
    name: 'Free',
    price: '$0',
    features: [
      'Up to 100 guests per event',
      'Basic scoring criteria',
      'CSV import/export',
      'Email support',
    ],
    limits: {
      events: '3 events',
      guests: '300 total guests',
      storage: '500 MB',
    },
  };

  const usage = {
    events: { current: 3, max: 3 },
    guests: { current: 187, max: 300 },
    storage: { current: 125, max: 500 },
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 4 }}>
        Billing & Subscription
      </Typography>

      <Grid container spacing={3}>
        {/* Current Plan */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                  Current Plan
                </Typography>
                <Chip label="Active" color="success" size="small" />
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {currentPlan.name}
              </Typography>

              <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
                {currentPlan.price}/month
              </Typography>

              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Features included:
              </Typography>

              <List dense>
                {currentPlan.features.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                    <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: '1rem' }} />
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>

              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              >
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Usage Overview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Usage Overview
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Events</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {usage.events.current} / {usage.events.max}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 8,
                    bgcolor: 'grey.200',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${(usage.events.current / usage.events.max) * 100}%`,
                      bgcolor: usage.events.current === usage.events.max ? 'warning.main' : 'primary.main',
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Total Guests</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {usage.guests.current} / {usage.guests.max}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 8,
                    bgcolor: 'grey.200',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${(usage.guests.current / usage.guests.max) * 100}%`,
                      bgcolor: 'primary.main',
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Storage</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {usage.storage.current} MB / {usage.storage.max} MB
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 8,
                    bgcolor: 'grey.200',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${(usage.storage.current / usage.storage.max) * 100}%`,
                      bgcolor: 'primary.main',
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Method */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Payment Method
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<CreditCard />}
                  onClick={() => setPaymentDialogOpen(true)}
                >
                  Update Payment Method
                </Button>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <CreditCard sx={{ mr: 2, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    No payment method on file
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Add a payment method to upgrade your plan
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Billing History */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Billing History
              </Typography>

              <Box sx={{ textAlign: 'center', py: 4 }}>
                <TrendingUp sx={{ fontSize: '3rem', color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No billing history yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your billing history will appear here once you upgrade to a paid plan
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Update Payment Method Dialog */}
      <Dialog open={paymentDialogOpen} onClose={() => setPaymentDialogOpen(false)}>
        <DialogTitle>Update Payment Method</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This is a demo interface. In a real application, this would integrate with a payment processor like Stripe.
          </Typography>
          <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 1, textAlign: 'center' }}>
            <CreditCard sx={{ fontSize: '2rem', color: 'text.secondary', mb: 1 }} />
            <Typography variant="body2">
              Payment form would appear here
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setPaymentDialogOpen(false)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
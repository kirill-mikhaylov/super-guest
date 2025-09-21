'use client';

import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Paper,
} from '@mui/material';
import { 
  Analytics, 
  Search, 
  Upload, 
  BarChart, 
  Event, 
  Smartphone,
  ArrowForward,
  Star,
  CheckCircle
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { APP_CONFIG } from '@/lib/config';
import { mockFeatures, mockTestimonials } from '@/data/marketing';

const iconMap = {
  Analytics,
  Search,
  Upload,
  BarChart,
  Event,
  Smartphone,
};

export default function LandingPage() {
  const router = useRouter();

  return (
    <Box>
      {/* Navigation */}
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {APP_CONFIG.name}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" onClick={() => router.push('/login')}>
                Login
              </Button>
              <Button variant="contained" onClick={() => router.push('/login')}>
                Get Started
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          pt: 12,
          pb: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            {APP_CONFIG.name}
          </Typography>
          
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 400,
              mb: 4,
              opacity: 0.9,
            }}
          >
            {APP_CONFIG.tagline}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => router.push('/login')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' },
                px: 4,
                py: 1.5,
              }}
            >
              Get Started Free
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push('/login')}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                px: 4,
                py: 1.5,
              }}
            >
              View Demo
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Powerful Features
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Everything you need to manage successful events
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {mockFeatures.map((feature) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <Grid item xs={12} md={6} lg={4} key={feature.id}>
                <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: 'primary.main',
                          color: 'white',
                          mr: 2,
                        }}
                      >
                        <IconComponent />
                      </Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
              How It Works
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Get started in three simple steps
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ textAlign: 'center' }}>
            {[
              {
                step: '1',
                title: 'Create Your Event',
                description: 'Set up your event details and upload your existing guest list',
                icon: <Event sx={{ fontSize: '3rem' }} />,
              },
              {
                step: '2',
                title: 'Define Scoring Criteria',
                description: 'Customize weights for different guest attributes that matter to you',
                icon: <Analytics sx={{ fontSize: '3rem' }} />,
              },
              {
                step: '3',
                title: 'Discover & Score Guests',
                description: 'Find new prospects and score all guests to optimize your event',
                icon: <Search sx={{ fontSize: '3rem' }} />,
              },
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={{ p: 3 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
            What Our Users Say
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Trusted by event organizers worldwide
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {mockTestimonials.map((testimonial) => (
            <Grid item xs={12} md={4} key={testimonial.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} sx={{ color: 'warning.main', fontSize: '1.2rem' }} />
                    ))}
                  </Box>
                  
                  <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                    "{testimonial.content}"
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={testimonial.avatar} sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.role} at {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Pricing Teaser Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Simple, Transparent Pricing
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Start free, upgrade when you're ready
          </Typography>

          <Paper elevation={2} sx={{ p: 4, display: 'inline-block' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Free Forever
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Perfect for small events
            </Typography>
            
            <Box sx={{ textAlign: 'left', mb: 3 }}>
              {[
                'Up to 100 guests per event',
                'Basic scoring criteria',
                'CSV import/export',
                'Email support',
              ].map((feature, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: '1.2rem' }} />
                  <Typography variant="body2">{feature}</Typography>
                </Box>
              ))}
            </Box>
            
            <Button variant="contained" size="large" onClick={() => router.push('/login')}>
              Get Started Free
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                {APP_CONFIG.name}
              </Typography>
              <Typography color="grey.400" sx={{ mb: 2 }}>
                {APP_CONFIG.tagline}
              </Typography>
              <Typography variant="body2" color="grey.500">
                © 2024 {APP_CONFIG.name}. All rights reserved.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Product
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                  Features
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                  Pricing
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                  API
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Support
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                  Documentation
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                  Contact
                </Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                  Status
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
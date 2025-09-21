import { Card, CardContent, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

export default function KpiCard({ title, value, subtitle, icon, trend }: KpiCardProps) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography color="text.secondary" variant="body2" component="div">
            {title}
          </Typography>
          {icon && (
            <Box sx={{ color: 'text.secondary' }}>
              {icon}
            </Box>
          )}
        </Box>
        
        <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 0.5 }}>
          {value}
        </Typography>
        
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
        
        {trend && (
          <Typography
            variant="body2"
            sx={{
              color: trend.direction === 'up' ? 'success.main' : 'error.main',
              mt: 1,
            }}
          >
            {trend.direction === 'up' ? '+' : '-'}{Math.abs(trend.value)}% from last month
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
import React from 'react';
import { Box, Card, CardContent, Typography, LinearProgress } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const StatCard = ({ icon: Icon, title, value, trend, color }) => (
  <Card sx={{ position: 'relative', overflow: 'visible' }}>
    <Box
      sx={{
        position: 'absolute',
        top: -20,
        left: 20,
        width: 60,
        height: 60,
        borderRadius: '50%',
        backgroundColor: color || 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.14)',
      }}
    >
      <Icon sx={{ color: '#fff', fontSize: 30 }} />
    </Box>
    <CardContent sx={{ pt: 5, pb: '16px !important' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="subtitle2" color="textSecondary">
            {title}
          </Typography>
          <Typography variant="h4">
            {value}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography 
            variant="body2" 
            color={trend.startsWith('+') ? 'success.main' : 'error.main'} 
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {trend} {trend.startsWith('+') ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            vs last month
          </Typography>
        </Box>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={75} 
        sx={{ mt: 2, height: 6, borderRadius: 3 }}
      />
    </CardContent>
  </Card>
);

export default StatCard; 
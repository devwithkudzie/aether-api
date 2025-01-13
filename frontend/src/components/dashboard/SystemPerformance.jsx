import React from 'react';
import { Box, Card, CardContent, Typography, Grid, CircularProgress, Stack, Chip } from '@mui/material';

const SystemPerformance = ({ data }) => {
  const getColorByUsage = (value) => {
    if (value < 50) return '#00E676';
    if (value < 80) return '#BB86FC';
    return '#CF6679';
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          System Performance
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <CircularProgress 
                variant="determinate" 
                value={data.cpuUsage} 
                size={100}
                thickness={4}
                sx={{ 
                  color: getColorByUsage(data.cpuUsage),
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  },
                }}
              />
              <Typography variant="body2" color="textSecondary" mt={1}>
                CPU Usage
              </Typography>
              <Typography variant="h6">
                {data.cpuUsage}%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <CircularProgress 
                variant="determinate" 
                value={data.memoryUsage} 
                size={100}
                thickness={4}
                sx={{ 
                  color: getColorByUsage(data.memoryUsage),
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  },
                }}
              />
              <Typography variant="body2" color="textSecondary" mt={1}>
                Memory Usage
              </Typography>
              <Typography variant="h6">
                {data.memoryUsage}%
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Server Status
          </Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                Status
              </Typography>
              <Chip 
                label={data.serverStatus} 
                size="small" 
                color={data.serverStatus === 'Operational' ? 'success' : 'error'}
                sx={{ minWidth: 90 }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                Uptime
              </Typography>
              <Chip 
                label={data.uptime} 
                size="small" 
                color="success"
                sx={{ minWidth: 90 }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                Response Time
              </Typography>
              <Chip 
                label={data.responseTime} 
                size="small" 
                color="primary"
                sx={{ minWidth: 90 }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                Error Rate
              </Typography>
              <Chip 
                label={data.errorRate} 
                size="small" 
                color="error"
                sx={{ minWidth: 90 }}
              />
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SystemPerformance; 
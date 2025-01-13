import React from 'react';
import { Box, Card, CardContent, Typography, Stack, Chip } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrafficChart = ({ data, selectedPeriod, onPeriodChange }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Traffic Overview</Typography>
        <Stack direction="row" spacing={1}>
          {['week', 'month', 'year'].map((period) => (
            <Chip
              key={period}
              label={period.charAt(0).toUpperCase() + period.slice(1)}
              onClick={() => onPeriodChange(period)}
              color={selectedPeriod === period ? 'primary' : 'default'}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Stack>
      </Box>
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#BB86FC" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#BB86FC" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#03DAC6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#03DAC6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
            <YAxis stroke="rgba(255,255,255,0.7)" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1E1D24',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                padding: '12px',
              }}
              itemStyle={{ color: '#fff' }}
              labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
              formatter={(value) => [`${value}`, '']}
            />
            <Area 
              type="monotone" 
              dataKey="visitors" 
              stroke="#BB86FC" 
              fillOpacity={1} 
              fill="url(#colorVisitors)" 
              name="Visitors"
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#03DAC6" 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              name="Revenue"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </CardContent>
  </Card>
);

export default TrafficChart; 
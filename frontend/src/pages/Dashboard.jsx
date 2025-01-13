import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  LinearProgress,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Stack,
  CircularProgress,
} from '@mui/material';
import {
  TrendingUp,
  People,
  ViewList,
  AttachMoney,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  Speed,
  Storage,
  CloudUpload,
  CheckCircle,
} from '@mui/icons-material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Sample data
const visitorData = [
  { name: 'Jan', visitors: 4000, pageViews: 2400, revenue: 2400 },
  { name: 'Feb', visitors: 3000, pageViews: 1398, revenue: 2210 },
  { name: 'Mar', visitors: 2000, pageViews: 9800, revenue: 2290 },
  { name: 'Apr', visitors: 2780, pageViews: 3908, revenue: 2000 },
  { name: 'May', visitors: 1890, pageViews: 4800, revenue: 2181 },
  { name: 'Jun', visitors: 2390, pageViews: 3800, revenue: 2500 },
];

const recentUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Editor', status: 'Active' },
];

const pieData = [
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 200 },
];

const COLORS = ['#BB86FC', '#03DAC6', '#CF6679'];

const performanceData = {
  serverStatus: 'Operational',
  uptime: '99.9%',
  responseTime: '0.2s',
  errorRate: '0.02%',
  cpuUsage: 45,
  memoryUsage: 60,
  diskUsage: 75,
};

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

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

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              icon={TrendingUp}
              title="Total Traffic"
              value="23.4k"
              trend="+15%"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              icon={People}
              title="New Users"
              value="1,234"
              trend="+22%"
              color="secondary.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              icon={ViewList}
              title="Page Views"
              value="45.2k"
              trend="-5%"
              color="#03DAC6"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              icon={AttachMoney}
              title="Revenue"
              value="$12.5k"
              trend="+28%"
              color="#CF6679"
            />
          </Grid>
        </Grid>

        {/* Main Charts Section */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">Traffic Overview</Typography>
                  <Stack direction="row" spacing={1}>
                    {['week', 'month', 'year'].map((period) => (
                      <Chip
                        key={period}
                        label={period.charAt(0).toUpperCase() + period.slice(1)}
                        onClick={() => setSelectedPeriod(period)}
                        color={selectedPeriod === period ? 'primary' : 'default'}
                        sx={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Stack>
                </Box>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={visitorData}>
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
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Device Distribution
                </Typography>
                <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1E1D24',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                        }}
                        itemStyle={{ color: '#fff' }}
                        labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                  {pieData.map((entry, index) => (
                    <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: COLORS[index] }} />
                      <Typography variant="caption">{entry.name}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* System Performance Section */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6}>
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
                        value={performanceData.cpuUsage} 
                        size={100}
                        thickness={4}
                        sx={{ color: '#BB86FC' }}
                      />
                      <Typography variant="body2" color="textSecondary" mt={1}>
                        CPU Usage
                      </Typography>
                      <Typography variant="h6">
                        {performanceData.cpuUsage}%
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <CircularProgress 
                        variant="determinate" 
                        value={performanceData.memoryUsage} 
                        size={100}
                        thickness={4}
                        sx={{ color: '#03DAC6' }}
                      />
                      <Typography variant="body2" color="textSecondary" mt={1}>
                        Memory Usage
                      </Typography>
                      <Typography variant="h6">
                        {performanceData.memoryUsage}%
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
                        Uptime
                      </Typography>
                      <Chip 
                        label={performanceData.uptime} 
                        size="small" 
                        color="success"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="textSecondary">
                        Response Time
                      </Typography>
                      <Chip 
                        label={performanceData.responseTime} 
                        size="small" 
                        color="primary"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="textSecondary">
                        Error Rate
                      </Typography>
                      <Chip 
                        label={performanceData.errorRate} 
                        size="small" 
                        color="error"
                      />
                    </Box>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Users
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ width: 30, height: 30, mr: 1, bgcolor: 'primary.main' }}>
                                {user.name[0]}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle2">
                                  {user.name}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  {user.email}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={user.role} 
                              size="small"
                              color={user.role === 'Admin' ? 'primary' : 'default'}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={user.status}
                              size="small"
                              color={user.status === 'Active' ? 'success' : 'error'}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard; 
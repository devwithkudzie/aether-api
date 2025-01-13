import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const RecentUsers = ({ users }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Recent Users
          </Typography>
          <Chip 
            label={`Total: ${users.length}`} 
            size="small" 
            color="primary"
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          width: 30, 
                          height: 30, 
                          mr: 1, 
                          bgcolor: 'primary.main',
                          fontSize: '0.875rem',
                        }}
                      >
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
                      sx={{ minWidth: 70 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      size="small"
                      color={user.status === 'Active' ? 'success' : 'error'}
                      sx={{ minWidth: 70 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton 
                      size="small"
                      onClick={(e) => handleMenuClick(e, user)}
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleMenuClose}>View Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Edit User</MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            Disable Account
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default RecentUsers; 
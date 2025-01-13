import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  Collapse,
  ListItemButton,
  InputBase,
  alpha,
  Button,
  Breadcrumbs as MuiBreadcrumbs,
  Link,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu as MenuIcon,
  ChevronLeft,
  Dashboard,
  People,
  Settings,
  Notifications,
  Search,
  ExpandLess,
  ExpandMore,
  Web,
  Article,
  Analytics,
  Storage,
  Security,
  Campaign,
  Palette,
  Help,
  ExitToApp,
  Person,
  NavigateNext as NavigateNextIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import QuickActions from './QuickActions';
import PageTransition from './PageTransition';

// Menu structure with nested items
const menuItems = [
  {
    title: 'Dashboard',
    icon: <Dashboard />,
    path: '/dashboard',
  },
  {
    title: 'Content',
    icon: <Article />,
    children: [
      { title: 'Pages', path: '/dashboard' },
      { title: 'Blog Posts', path: '/dashboard' },
      { title: 'Media Library', path: '/dashboard' },
    ],
  },
  {
    title: 'Design',
    icon: <Palette />,
    children: [
      { title: 'Themes', path: '/dashboard' },
      { title: 'Customization', path: '/dashboard' },
      { title: 'Navigation', path: '/dashboard' },
    ],
  },
  {
    title: 'Analytics',
    icon: <Analytics />,
    children: [
      { title: 'Overview', path: '/dashboard' },
      { title: 'Reports', path: '/dashboard' },
      { title: 'Real-time', path: '/dashboard' },
    ],
  },
  {
    title: 'Users',
    icon: <People />,
    children: [
      { title: 'All Users', path: '/dashboard' },
      { title: 'Roles', path: '/dashboard' },
      { title: 'Permissions', path: '/dashboard' },
    ],
  },
  {
    title: 'Marketing',
    icon: <Campaign />,
    children: [
      { title: 'Campaigns', path: '/dashboard' },
      { title: 'Email', path: '/dashboard' },
      { title: 'Social Media', path: '/dashboard' },
    ],
  },
  {
    title: 'System',
    icon: <Storage />,
    children: [
      { title: 'Settings', path: '/dashboard' },
      { title: 'Security', path: '/dashboard' },
      { title: 'Backups', path: '/dashboard' },
    ],
  },
];

const DashboardLayout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuClick = (title) => {
    setExpandedMenu(expandedMenu === title ? '' : title);
    navigate('/dashboard');
  };

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenu = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleCloseMenus = () => {
    setAnchorEl(null);
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Logo = () => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            background: 'linear-gradient(45deg, #BB86FC 30%, #03DAC6 90%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5" sx={{ color: '#000', fontWeight: 'bold' }}>
            A
          </Typography>
        </Box>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Admin<span style={{ color: theme.palette.primary.main }}>Panel</span>
            </Typography>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );

  const ProfileMenu = () => (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenus}
      sx={{
        mt: '45px',
        '& .MuiPaper-root': {
          width: 280,
          backgroundColor: theme.palette.background.paper,
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
        }
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: theme.palette.primary.main,
            }}
          >
            {user?.firstName?.[0]}
          </Avatar>
          <Box>
            <Typography variant="subtitle1">
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Administrator
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ p: 1 }}>
        <MenuItem onClick={() => { handleCloseMenus(); navigate('/dashboard'); }}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => { handleCloseMenus(); navigate('/dashboard'); }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
      </Box>
      <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.08)' }} />
      <Box sx={{ p: 1 }}>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp fontSize="small" sx={{ color: 'error.main' }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Box>
    </Menu>
  );

  const SearchSuggestions = () => (
    <Box
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        mt: 1,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        zIndex: 1000,
        display: searchFocused && searchQuery ? 'block' : 'none',
      }}
    >
      {['Dashboard', 'Users', 'Settings', 'Analytics'].map((item, index) => (
        <MenuItem
          key={index}
          sx={{
            py: 1,
            px: 2,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <ListItemIcon>
            <Search fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">{item}</Typography>
        </MenuItem>
      ))}
    </Box>
  );

  const handleSearchFocus = (focused) => {
    setSearchFocused(focused);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const SidebarMenuItem = ({ item, open, expanded, onClick }) => (
    <motion.div
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
    >
      <ListItem
        button
        onClick={onClick}
        sx={{
          minHeight: 48,
          px: 2.5,
          borderRadius: '12px',
          mx: 1,
          mb: 0.5,
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            '&::before': {
              opacity: 1,
            },
            '& .MuiListItemIcon-root': {
              color: 'primary.main',
            },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
            opacity: 0,
            transition: 'opacity 0.2s ease',
            borderRadius: 'inherit',
          },
        }}
      >
        <ListItemIcon 
          sx={{ 
            minWidth: 40,
            transition: 'all 0.2s ease',
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText 
          primary={item.title}
          sx={{ opacity: open ? 1 : 0 }}
        />
        {item.children && open && (
          expanded === item.title ? <ExpandLess /> : <ExpandMore />
        )}
      </ListItem>
    </motion.div>
  );

  const BreadcrumbsNav = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <MuiBreadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 3 }}
        >
          <Link 
            color="inherit" 
            href="/dashboard"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Dashboard
          </Link>
          {pathnames.map((name, index) => (
            <Typography 
              key={index}
              color={index === pathnames.length - 1 ? 'primary' : 'inherit'}
              sx={{ textTransform: 'capitalize' }}
            >
              {name}
            </Typography>
          ))}
        </MuiBreadcrumbs>
      </motion.div>
    );
  };

  const MainContent = () => (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${open ? 260 : theme.spacing(7)}px)` },
        ml: { sm: open ? `${260}px` : `${theme.spacing(7)}px` },
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      <Toolbar />
      <AnimatePresence mode="wait">
        <PageTransition>
          <Box sx={{ p: 3 }}>
            <BreadcrumbsNav />
            {children}
          </Box>
        </PageTransition>
      </AnimatePresence>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar 
        position="fixed" 
        elevation={scrolled ? 2 : 0}
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          background: scrolled 
            ? 'linear-gradient(90deg, rgba(26, 24, 37, 0.98) 0%, rgba(36, 34, 48, 0.98) 100%)'
            : 'linear-gradient(90deg, rgba(26, 24, 37, 0.95) 0%, rgba(36, 34, 48, 0.95) 100%)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              edge="start"
            >
              {open ? <ChevronLeft /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" noWrap sx={{ ml: 2 }}>
              Admin Dashboard
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Search Bar */}
            <Box
              sx={{
                position: 'relative',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: alpha(theme.palette.common.white, 0.15),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.25),
                },
                width: '300px',
                mr: 2,
              }}
            >
              <Box
                sx={{
                  padding: theme.spacing(0, 2),
                  height: '100%',
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Search />
              </Box>
              <InputBase
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => handleSearchFocus(true)}
                onBlur={() => handleSearchFocus(false)}
                sx={{
                  color: 'inherit',
                  padding: theme.spacing(1, 1, 1, 6),
                  width: '100%',
                }}
              />
            </Box>

            {/* Notifications */}
            <IconButton color="inherit" onClick={handleNotificationMenu}>
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            {/* Profile */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 },
              }}
              onClick={handleProfileMenu}
            >
              <Avatar
                sx={{
                  width: 35,
                  height: 35,
                  bgcolor: theme.palette.primary.main,
                }}
              >
                {user?.firstName?.[0]}
              </Avatar>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 260 : theme.spacing(7),
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          '& .MuiDrawer-paper': {
            width: open ? 260 : theme.spacing(7),
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {menuItems.map((item) => (
              <React.Fragment key={item.title}>
                <SidebarMenuItem
                  item={item}
                  open={open}
                  expanded={expandedMenu}
                  onClick={() => item.children ? handleMenuClick(item.title) : navigate(item.path)}
                />
                {item.children && (
                  <Collapse in={expandedMenu === item.title && open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((child) => (
                        <ListItemButton
                          key={child.title}
                          sx={{ pl: 4 }}
                          onClick={() => navigate(child.path)}
                        >
                          <ListItemText 
                            primary={child.title}
                            primaryTypographyProps={{
                              fontSize: '0.875rem',
                              fontWeight: 500,
                            }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <MainContent />

      {/* Profile Menu */}
      <ProfileMenu />

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleCloseMenus}
        sx={{ 
          mt: '45px',
          '& .MuiPaper-root': {
            width: 320,
            backgroundColor: theme.palette.background.paper,
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Typography variant="h6" sx={{ fontSize: '1rem' }}>
            Notifications
          </Typography>
        </Box>
        {[
          { icon: <People sx={{ color: 'primary.main' }} />, title: 'New user registration', time: '2 min ago' },
          { icon: <Settings sx={{ color: 'secondary.main' }} />, title: 'System update available', time: '1 hour ago' },
          { icon: <Storage sx={{ color: 'success.main' }} />, title: 'Backup completed', time: '2 hours ago' },
        ].map((notification, index) => (
          <MenuItem 
            key={index} 
            onClick={() => { handleCloseMenus(); navigate('/dashboard'); }}
            sx={{
              py: 2,
              px: 2,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              {notification.icon}
              <Box>
                <Typography variant="subtitle2">
                  {notification.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.time}
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        ))}
        <Box sx={{ p: 1, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Button 
            fullWidth 
            size="small"
            onClick={() => navigate('/dashboard')}
          >
            View All Notifications
          </Button>
        </Box>
      </Menu>

      <QuickActions />
    </Box>
  );
};

export default DashboardLayout; 
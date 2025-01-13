import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  useTheme,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { loginUser } from '../services/api';
import AuthIllustration from '../components/auth/AuthIllustration';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await loginUser(formData);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: theme.palette.background.default,
      }}
    >
      {/* Right side - Illustration (now on left) */}
      <AuthIllustration />

      {/* Left side - Form (now on right) */}
      <Box
        sx={{
          flex: { xs: '1', md: '0 0 50%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.elevation1} 100%)`,
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box sx={{ mb: 3, textAlign: 'center' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 2,
                      background: 'linear-gradient(45deg, #BB86FC 30%, #03DAC6 90%)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Typography variant="h4" sx={{ color: '#000', fontWeight: 'bold' }}>
                      A
                    </Typography>
                  </Box>
                </motion.div>
                <Typography component="h1" variant="h5" gutterBottom>
                  Welcome Back
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Sign in to continue to your dashboard
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {error && (
                  <Typography 
                    color="error" 
                    align="center" 
                    sx={{ 
                      mt: 2,
                      p: 1,
                      borderRadius: 1,
                      bgcolor: 'rgba(255, 64, 129, 0.1)',
                    }}
                  >
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ 
                    mt: 3, 
                    mb: 2,
                    height: 46,
                    background: 'linear-gradient(45deg, #BB86FC 30%, #03DAC6 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #9965DA 30%, #02B5A5 90%)',
                    },
                  }}
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                  <Link to="/signup" style={{ textDecoration: 'none' }}>
                    <MuiLink 
                      component="span" 
                      variant="body2"
                      sx={{
                        '&:hover': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      Don't have an account? Sign Up
                    </MuiLink>
                  </Link>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Login; 
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Security, CloudQueue, Code } from '@mui/icons-material';

const AuthIllustration = () => {
  const theme = useTheme();

  const floatingIcons = [
    { Icon: Security, delay: 0.2, x: -100, y: -50 },
    { Icon: CloudQueue, delay: 0.4, x: 100, y: 50 },
    { Icon: Code, delay: 0.6, x: -50, y: 100 },
  ];

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 5,
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
      }}
    >
      {/* Background glow effects */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          top: '10%',
          left: '10%',
        }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.main} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          bottom: '10%',
          right: '10%',
        }}
      />

      {/* Main illustration container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Floating icons */}
        {floatingIcons.map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
              x: [0, x, 0],
              y: [0, y, 0],
            }}
            transition={{
              duration: 5,
              delay,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              position: 'absolute',
              zIndex: 2,
            }}
          >
            <Icon
              sx={{
                fontSize: 40,
                color: theme.palette.primary.main,
                opacity: 0.8,
              }}
            />
          </motion.div>
        ))}

        {/* Central element */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 40px ${theme.palette.primary.main}40`,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: '#000',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              A
            </Typography>
          </Box>
        </motion.div>

        {/* Animated rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3,
              delay: ring * 0.2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              position: 'absolute',
              width: `${300 + ring * 100}px`,
              height: `${300 + ring * 100}px`,
              borderRadius: '50%',
              border: `2px solid ${theme.palette.primary.main}`,
              opacity: 0.1,
            }}
          />
        ))}
      </Box>

      {/* Particle effects */}
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ 
            opacity: 0,
            x: Math.random() * 800 - 400,
            y: Math.random() * 800 - 400,
          }}
          animate={{ 
            opacity: [0, 1, 0],
            x: Math.random() * 800 - 400,
            y: Math.random() * 800 - 400,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
          style={{
            position: 'absolute',
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            backgroundColor: theme.palette.primary.main,
            borderRadius: '50%',
          }}
        />
      ))}
    </Box>
  );
};

export default AuthIllustration; 
import React from 'react';
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import {
  Add as AddIcon,
  Person as PersonIcon,
  Article as ArticleIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';

const QuickActions = () => {
  const actions = [
    { icon: <PersonIcon />, name: 'New User', action: () => console.log('New User') },
    { icon: <ArticleIcon />, name: 'New Post', action: () => console.log('New Post') },
    { icon: <UploadIcon />, name: 'Upload', action: () => console.log('Upload') },
  ];

  return (
    <SpeedDial
      ariaLabel="Quick Actions"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.action}
        />
      ))}
    </SpeedDial>
  );
};

export default QuickActions; 
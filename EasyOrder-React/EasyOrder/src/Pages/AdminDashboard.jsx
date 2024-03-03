import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GroupIcon from '@mui/icons-material/Group';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CategoryIcon from '@mui/icons-material/Category';

const AdminDashboard = () => {
  const headerStyle = {
    backgroundColor: '#3f51b5',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
  };

  return (
    <Box>
      <Box sx={headerStyle}>
        <Typography variant="h7">Admin Dashboard</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 90px)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
          }}
        >
          <Button
            variant="contained"
            startIcon={<GroupIcon />}
            sx={{ fontSize: '1.5rem', padding: '16px 0', width: '350px', height: '160px', backgroundColor: '#3f51b5', color: 'white' }}
          >
            Users CRUD
          </Button>
          <Button
            variant="contained"
            startIcon={<LocalMallIcon />}
            sx={{ fontSize: '1.5rem', padding: '16px 0', width: '350px', height: '160px', backgroundColor: '#3f51b5', color: 'white' }}
          >
            Products CRUD
          </Button>
          <Button
            variant="contained"
            startIcon={<CategoryIcon />}
            sx={{ fontSize: '1.5rem', padding: '16px 0', width: '350px', height: '160px', backgroundColor: '#3f51b5', color: 'white' }}
          >
            Categories CRUD
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;

import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GroupIcon from '@mui/icons-material/Group';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const headerStyle = {
    backgroundColor: '#3f51b5',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
  };

  const handleUsersClick = () => {
    navigate('/usertable');
  };

  const handleProductsClick = () => {
    navigate('/products');
  };

  const handleCategoriesClick = () => {
    navigate('/categories');
  };

  const handleOrdersListClick = () => {
    navigate('/orderslist');
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
            onClick={handleUsersClick}
          >
            Users CRUD
          </Button>
          <Button
            variant="contained"
            startIcon={<LocalMallIcon />}
            sx={{ fontSize: '1.5rem', padding: '16px 0', width: '350px', height: '160px', backgroundColor: '#3f51b5', color: 'white' }}
            onClick={handleProductsClick}
          >
            Products CRUD
          </Button>
          <Button
            variant="contained"
            startIcon={<CategoryIcon />}
            sx={{ fontSize: '1.5rem', padding: '16px 0', width: '350px', height: '160px', backgroundColor: '#3f51b5', color: 'white' }}
            onClick={handleCategoriesClick}
          >
            Categories CRUD
          </Button>
          <Button
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            sx={{ fontSize: '1.5rem', padding: '16px 0', width: '350px', height: '160px', backgroundColor: '#3f51b5', color: 'white' }}
            onClick={handleOrdersListClick}
          >
            Orders
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
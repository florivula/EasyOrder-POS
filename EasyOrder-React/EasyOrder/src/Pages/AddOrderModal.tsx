import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';

interface AddOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (products: string, total: number) => Promise<void>;
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({ open, onClose, onSave }) => {
  const [products, setProducts] = useState('');
  const [total, setTotal] = useState('');

  const handleSave = async () => {
    if (!products || !total) {
      alert('Please fill in all fields');
      return;
    }

    await onSave(products, parseFloat(total));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          minWidth: 400,
          maxWidth: 600,
          borderRadius: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Order
        </Typography>
        <TextField
          label="Products"
          value={products}
          onChange={(e) => setProducts(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Total"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleSave} variant="contained" color="primary" sx={{ mr: 2 }}>
            Save
          </Button>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddOrderModal;
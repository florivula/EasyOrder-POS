import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, price: number, categoryId: number) => Promise<void>;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSave = async () => {
    if (!name || !price || !categoryId) {
      alert('Please fill in all fields');
      return;
    }

    await onSave(name, parseFloat(price), parseFloat(categoryId));
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
          Add Product
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Category ID"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
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

export default AddProductModal;
import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, TextField, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';

interface EditProductModalProps {
  productid: number;
  open: boolean;
  onClose: () => void;
  onSave: (productid: number, newName: string, newPrice: number, newCategoryId: number) => Promise<void>;
  name: string;
  price: number;
  categoryId: number;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ productid, open, onClose, onSave, name, price, categoryId }) => {
  const [newName, setNewName] = useState(name);
  let [newPrice, setNewPrice] = useState(price);
  let [newCategoryId, setNewCategoryId] = useState(categoryId);

  useEffect(() => {
    setNewName(name);
    setNewPrice(price);
    setNewCategoryId(categoryId);
  }, [name, price, categoryId]);

  const handleSave = async () => {
    await onSave(productid, newName, newPrice, newCategoryId);
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
          Edit Product
        </Typography>
        <TextField
          label="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          value={newPrice}
          onChange={(e) => setNewPrice(parseFloat(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Category ID"
          value={newCategoryId}
          onChange={(e) => setNewCategoryId(parseFloat(e.target.value))}
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

export default EditProductModal;
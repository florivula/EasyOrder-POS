import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

interface Category {
  id: number;
  name: string;
}

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, price: number, categoryId: number) => Promise<void>;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://localhost:44389/api/Category/get_categories');
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error('Expected an array but got', response.data);
        }
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSave = async () => {
    if (!name || !price || categoryId === '') {
      onClose();
      Swal.fire('Error', 'Please fill in all fields to add a new product!', 'error');
      return;
    }

    await onSave(name, parseFloat(price), categoryId);
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
          type="number"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            displayEmpty
            renderValue={(selected) => {
              const selectedCategory = categories.find((cat) => cat.id === Number(selected));
              return selectedCategory ? selectedCategory.name : '';
            }}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

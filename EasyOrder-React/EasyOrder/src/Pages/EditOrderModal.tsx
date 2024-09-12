import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, Typography, Autocomplete, TextField as MUITextField, TextField } from '@mui/material';
import Swal from 'sweetalert2';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface EditOrderModalProps {
  open: boolean;
  onClose: () => void;
  orderId: number;
  onSave: (orderId: number, products: { product: Product; quantity: number }[], total: number) => Promise<void>;
  products: { product: Product; quantity: number }[];
  total: number;
  availableProducts: Product[];
}

const EditOrderModal: React.FC<EditOrderModalProps> = ({ open, onClose, orderId, onSave, products, total, availableProducts }) => {
  const [selectedProducts, setSelectedProducts] = useState<{ product: Product; quantity: number }[]>(products);
  const [newTotal, setNewTotal] = useState<number | ''>(total);

  useEffect(() => {
    setNewTotal(calculateTotal());
  }, [selectedProducts]);

  const handleQuantityChange = (productId: number, quantity: number) => {
    setSelectedProducts(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const handleSave = async () => {
    if (selectedProducts.length === 0 || newTotal === '') {
      Swal.fire('Error', 'Please fill in all fields', 'error')
      return;
    }
  
    const numericTotal = typeof newTotal === 'string' ? parseFloat(newTotal) : newTotal;
  
    if (isNaN(numericTotal) || numericTotal <= 0) {
      Swal.fire('Error', 'Please enter a valid total amount','error')
      return;
    }
  
    try {
      await onSave(orderId, selectedProducts, numericTotal);
      onClose();
    } catch (error) {
      console.error('Error saving edit:', error);
    }
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
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
          width: 400
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Order
        </Typography>
        <Autocomplete
          multiple
          options={availableProducts}
          getOptionLabel={(option) => option.name}
          value={selectedProducts.map(({ product }) => product)}
          onChange={(event, newValue) => {
            const updatedProducts = newValue.map(product => {
              const existing = selectedProducts.find(item => item.product.id === product.id);
              return existing ? existing : { product, quantity: 1 };
            });
            setSelectedProducts(updatedProducts);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <MUITextField {...params} label="Select Products" variant="outlined" />}
          style={{ marginBottom: '16px' }}
        />

        {selectedProducts.map(({ product, quantity }) => (
          <Box key={product.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <Typography variant="body1" sx={{ flex: 1 }}>
              {product.name} - ${product.price.toFixed(2)}
            </Typography>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
              variant="outlined"
              sx={{ width: '100px', marginRight: '8px' }}
            />
          </Box>
        ))}
        <Typography variant="body1" sx={{ marginTop: '16px', marginBottom: '8px' }}>
          Total: ${calculateTotal().toFixed(2)}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '16px' }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EditOrderModal;

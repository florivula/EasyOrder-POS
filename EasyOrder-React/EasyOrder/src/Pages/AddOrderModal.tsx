import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, Typography, Autocomplete, TextField as MUITextField } from '@mui/material';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface AddOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (orderData: { orderProducts: { productId: number; quantity: number }[], total: number, waiterId: number }) => Promise<void>;
  availableProducts: Product[];
  waiterId: number;
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({ open, onClose, onSave, availableProducts, waiterId }) => {
  const [selectedProducts, setSelectedProducts] = useState<{ product: Product; quantity: number }[]>([]);

  // Calculate the total dynamically based on selected products
  const calculateTotal = () => {
    return selectedProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setSelectedProducts(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleSave = async () => {
    if (selectedProducts.length === 0) {
      alert('Please select at least one product');
      return;
    }

    const total = calculateTotal();
    if (total <= 0) {
      alert('Please enter a valid total amount');
      return;
    }

    const orderData = {
      orderProducts: selectedProducts.map(({ product, quantity }) => ({
        productId: product.id,
        quantity,
      })),
      total,
      waiterId
    };

    await onSave(orderData);
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
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
          width: 400
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Add New Order
        </Typography>
        <Autocomplete
          multiple
          options={availableProducts}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => {
            const updatedProducts = newValue.map(product => ({
              product,
              quantity: 1 // Default quantity
            }));
            setSelectedProducts(updatedProducts);
          }}
          renderInput={(params) => <MUITextField {...params} label="Select Products" variant="outlined" />}
          style={{ marginBottom: '16px' }}
        />
        {selectedProducts.map(({ product, quantity }) => (
          <Box key={product.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <Typography variant="body1" sx={{ flex: 1 }}>
              {product.name} - ${product.price.toFixed(2)}
            </Typography>
            <MUITextField
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
          Total: {calculateTotal().toFixed(2)}€
        </Typography>
        <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '16px' }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default AddOrderModal;

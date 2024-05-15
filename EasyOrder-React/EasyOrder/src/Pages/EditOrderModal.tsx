import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, TextField, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';

interface EditOrderModalProps {
  orderid: number;
  open: boolean;
  onClose: () => void;
  onSave: (orderid: number, newProducts: string, newTotal: number) => Promise<void>;
  products: string;
  total: number;
}

const EditOrderModal: React.FC<EditOrderModalProps> = ({ orderid, open, onClose, onSave, products, total}) => {
  const [newProducts, setNewProducts] = useState(products);
  let [newTotal, setNewTotal] = useState(total);

  useEffect(() => {
    setNewProducts(products);
    setNewTotal(total);
  }, [products, total]);

  const handleSave = async () => {
    await onSave(orderid, newProducts, newTotal);
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
          Edit Order
        </Typography>
        <TextField
          label="Products"
          value={newProducts}
          onChange={(e) => setNewProducts(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Total"
          value={newTotal}
          onChange={(e) => setNewTotal(parseFloat(e.target.value))}
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

export default EditOrderModal;
import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => Promise<void>;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('');
  const handleSave = async () => {
    if (!name) {
      alert('Please fill in all fields');
      return;
    }

    await onSave(name);
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
          Add Category
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

export default AddCategoryModal;
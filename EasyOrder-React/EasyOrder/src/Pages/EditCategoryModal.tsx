import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, TextField, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';

interface EditCategoryModalProps {
  Categoryid: number;
  open: boolean;
  onClose: () => void;
  onSave: (Categoryid: number, newName: string,) => Promise<void>;
  name: string;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ Categoryid, open, onClose, onSave, name}) => {
  const [newName, setNewName] = useState(name);

  useEffect(() => {
    setNewName(name);
  }, [name]);

  const handleSave = async () => {
    await onSave(Categoryid, newName);
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
          Edit Category
        </Typography>
        <TextField
          label="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
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

export default EditCategoryModal;
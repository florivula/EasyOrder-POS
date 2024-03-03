import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, TextField, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';

interface EditUserModalProps {
  userId: number;
  open: boolean;
  onClose: () => void;
  onSave: (userId: number, newName: string, newEmail: string, newRole: string) => Promise<void>;
  name: string;
  email: string;
  role: string;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ userId, open, onClose, onSave, name, email, role }) => {
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newRole, setNewRole] = useState(role);

  useEffect(() => {
    setNewName(name);
    setNewEmail(email);
    setNewRole(role);
  }, [name, email, role]);

  const handleSave = async () => {
    await onSave(userId, newName, newEmail, newRole);
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
          Edit User
        </Typography>
        <TextField
          label="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value as string)}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Waiter">Waiter</MenuItem>
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

export default EditUserModal;

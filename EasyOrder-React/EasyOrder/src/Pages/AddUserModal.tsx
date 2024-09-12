import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Swal from 'sweetalert2';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, email: string, password:string, role: string) => Promise<void>;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSave = async () => {
    if (!name || !email || !password || !role) {
      onClose();
      Swal.fire('Error', 'Please fill in all fields to add a new user!', 'error');
      return;
    }

    await onSave(name, email, password, role);
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
          Add User
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as string)}
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

export default AddUserModal;
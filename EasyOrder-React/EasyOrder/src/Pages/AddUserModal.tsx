import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newName: string, newEmail: string, newRole: string) => Promise<void>;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose, onAdd }) => {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await onAdd(newName, newEmail, newRole);
      onClose();
    } catch (error) {
      console.error(error);
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
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Role"
            variant="outlined"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add User
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddUserModal;

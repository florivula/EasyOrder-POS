import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditUserModal from './EditUserModal';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<User[]>('https://localhost:44389/api/Users/get_users');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (userId: number) => {
    setSelectedUserId(userId);
    setModalOpen(true);
  };

  const handleSaveEdit = async (userId: number, newName: string, newEmail: string, newRole: string) => {
    try {
      await axios.put(`https://localhost:44389/api/Users/${userId}`, { id: userId, name: newName, email: newEmail, password: 'string', role: newRole }, { headers: { 'Content-Type': 'application/json' } });
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user.id === userId) {
            return { ...user, name: newName, email: newEmail, role: newRole };
          }
          return user;
        });
      });
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (userId: number) => {
    try {
      await axios.delete(`https://localhost:44389/api/Users/${userId}`);
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUserId(null);
  };

  const handleAddUser = async (newName: string, newEmail: string, newRole: string) => {
    try {
      const response = await axios.post<User>('https://localhost:44389/api/Users', { name: newName, email: newEmail, password: 'string', role: newRole }, { headers: { 'Content-Type': 'application/json' } });
      setUsers(prevUsers => [...prevUsers, response.data]);
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', background: '#f0f0f0', padding: '20px' }}>
      <table style={{ color: '#333', width: '80%', maxWidth: '1200px', background: 'white', borderCollapse: 'collapse', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#333', color: 'white' }}>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>Role</th>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>Manage</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', textAlign: 'left' }}>{user.id}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{user.name}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{user.email}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{user.role}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>
                <button style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#3f51b5', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleEdit(user.id)}>Edit</button>
                <button style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#3f51b5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setModalOpen(true)}>Add New User</button>
      <EditUserModal
        open={modalOpen}
        onClose={handleCloseModal}
        userId={selectedUserId || 0}
        onSave={handleSaveEdit}
        name={users.find(user => user.id === selectedUserId)?.name || ''}
        email={users.find(user => user.id === selectedUserId)?.email || ''}
        role={users.find(user => user.id === selectedUserId)?.role || ''}
      />
    </div>
  );
};

export default UsersTable;

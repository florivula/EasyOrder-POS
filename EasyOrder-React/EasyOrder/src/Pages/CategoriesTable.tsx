import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Category } from '@mui/icons-material';
import EditCategoryModal from './EditCategoryModal';
import AddCategoryModal from './AddCategoryModal';

interface Category {
  id: number;
  name: string;
}

const CategoriesTable: React.FC = () => {
  const [categories, setcategories] = useState<Category[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedcategoryId, setSelectedcategoryId] = useState<number | null>(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Category[]>('https://localhost:44389/api/Category/get_categories');
        setcategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (categoryId: number) => {
    setSelectedcategoryId(categoryId);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (categoryId: number, newName: string) => {
    try {
      await axios.put(`https://localhost:44389/api/Category/${categoryId}`, { id: categoryId, name: newName}, { headers: { 'Content-Type': 'application/json' } });
      setcategories(prevcategories => {
        return prevcategories.map(category => {
          if (category.id === categoryId) {
            return { ...category, name: newName};
          }
          return category;
        });
      });
      setEditModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (categoryId: number) => {
    try {
      await axios.delete(`https://localhost:44389/api/Category/${categoryId}`);
      const updatedcategories = categories.filter(category => category.id !== categoryId);
      setcategories(updatedcategories);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedcategoryId(null);
  };

  const handleAddcategory = async (newName: string) => {
    try {
      const response = await axios.post<Category>('https://localhost:44389/api/Category', { name: newName}, { headers: { 'Content-Type': 'application/json' } });
      setcategories(prevcategories => [...prevcategories, response.data]);
      setAddModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', background: '#1f2021', padding: '20px' }}>
      <table style={{ color: '#333', width: '30%', maxWidth: '1200px', background: 'white', borderCollapse: 'collapse', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#333', color: 'white' }}>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>Manage</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', textAlign: 'left' }}>{category.id}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{category.name}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>
                <button style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#3f51b5', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleEdit(category.id)}>Edit</button>
                <button style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleDelete(category.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#3f51b5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setAddModalOpen(true)}>Add New Category</button>
      <AddCategoryModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleAddcategory}
      />
      <EditCategoryModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        Categoryid={selectedcategoryId || 0}
        onSave={handleSaveEdit}
        name={categories.find(category => category.id === selectedcategoryId)?.name || ''}
      />
    </div>
  );
};

export default CategoriesTable;

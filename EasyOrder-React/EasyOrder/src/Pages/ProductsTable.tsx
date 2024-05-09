import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProductModal from './EditProductModal';

interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
}

const ProductsTable: React.FC = () => {
  const [products, setproducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedproductId, setSelectedproductId] = useState<number | null>(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Product[]>('https://localhost:44389/api/Product/get_products');
        setproducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (productId: number) => {
    setSelectedproductId(productId);
    setModalOpen(true);
  };

  const handleSaveEdit = async (productId: number, newName: string, newPrice: number, newCategoryId: number) => {
    try {
      await axios.put(`https://localhost:44389/api/Product/${productId}`, { id: productId, name: newName, price: newPrice, categoryid: newCategoryId }, { headers: { 'Content-Type': 'application/json' } });
      setproducts(prevproducts => {
        return prevproducts.map(product => {
          if (product.id === productId) {
            return { ...product, name: newName, price: newPrice, categoryid: newCategoryId };
          }
          return product;
        });
      });
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (productId: number) => {
    try {
      await axios.delete(`https://localhost:44389/api/Product/${productId}`);
      const updatedproducts = products.filter(product => product.id !== productId);
      setproducts(updatedproducts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedproductId(null);
  };

  const handleAddproduct = async (newName: string, newPrice: number, newCategoryId: number) => {
    try {
      const response = await axios.post<Product>('https://localhost:44389/api/Product', { name: newName, price: newPrice, categoryid: newCategoryId }, { headers: { 'Content-Type': 'application/json' } });
      setproducts(prevproducts => [...prevproducts, response.data]);
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', background: '#1f2021', padding: '20px' }}>
      <table style={{ color: '#333', width: '65%', maxWidth: '1200px', background: 'white', borderCollapse: 'collapse', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#333', color: 'white' }}>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>Price</th>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>Category ID</th>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>Manage</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', textAlign: 'left' }}>{product.id}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{product.name}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{product.price}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{product.categoryId}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>
                <button style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#3f51b5', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleEdit(product.id)}>Edit</button>
                <button style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#3f51b5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setModalOpen(true)}>Add New Product</button>
      <EditProductModal
        open={modalOpen}
        onClose={handleCloseModal}
        productid={selectedproductId || 0}
        onSave={handleSaveEdit}
        name={products.find(product => product.id === selectedproductId)?.name || ''}
        price={products.find(product => product.id === selectedproductId)?.price || 0}
        categoryId={products.find(product => product.id === selectedproductId)?.categoryId || 0}
      />
    </div>
  );
};

export default ProductsTable;

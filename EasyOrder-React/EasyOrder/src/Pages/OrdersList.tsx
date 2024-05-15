import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditOrderModal from './EditOrderModal';
import AddOrderModal from './AddOrderModal';

interface Order {
  id: number;
  products: string;
  total: number;
}

const OrdersList: React.FC = () => {
  const [orders, setorders] = useState<Order[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedorderId, setSelectedorderId] = useState<number | null>(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Order[]>('https://localhost:44389/api/Order/get_orders');
        setorders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (orderId: number) => {
    setSelectedorderId(orderId);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (orderId: number, newProducts: string, newTotal: number) => {
    try {
      await axios.put(`https://localhost:44389/api/Order/${orderId}`, { id: orderId, products: newProducts, total: newTotal}, { headers: { 'Content-Type': 'application/json' } });
      setorders(prevorders => {
        return prevorders.map(order => {
          if (order.id === orderId) {
            return { ...order, products: newProducts, total: newTotal};
          }
          return order;
        });
      });
      setEditModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (orderId: number) => {
    try {
      await axios.delete(`https://localhost:44389/api/Order/${orderId}`);
      const updatedorders = orders.filter(order => order.id !== orderId);
      setorders(updatedorders);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedorderId(null);
  };

  const handleAddOrder = async (newProducts: string, newTotal: number) => {
    try {
      const response = await axios.post<Order>('https://localhost:44389/api/Order', { products: newProducts, total: newTotal}, { headers: { 'Content-Type': 'application/json' } });
      setorders(prevorders => [...prevorders, response.data]);
      setAddModalOpen(false);
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
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>Products</th>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>Total</th>
            <th style={{ padding: '10px', borderBottom: '2px solid white', textAlign: 'left' }}>Manage</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', textAlign: 'left' }}>{order.id}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{order.products}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{order.total} €</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>
                <button style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#3f51b5', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleEdit(order.id)}>Edit</button>
                <button style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleDelete(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#3f51b5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setAddModalOpen(true)}>Add New Order</button>
      <AddOrderModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleAddOrder}
      />
      <EditOrderModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        orderid={selectedorderId || 0}
        onSave={handleSaveEdit}
        products={orders.find(order => order.id === selectedorderId)?.products || ''}
        total={orders.find(order => order.id === selectedorderId)?.total || 0}
      />
    </div>
  );
};

export default OrdersList;

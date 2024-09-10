import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditOrderModal from './EditOrderModal';
import AddOrderModal from './AddOrderModal';

// Define the updated interfaces
interface Product {
  id: number;
  name: string;
  price: number;
}

interface OrderProduct {
  productId: number;
  product?: Product;
  quantity: number;
}

interface Order {
  id: number;
  orderProducts: OrderProduct[];
  total: number;
  dateCreated: string;
  waiterId: number;
}

// Function to transform OrderProduct into the format required by the API
const transformOrderProducts = (orderProducts: OrderProduct[]) => {
  return orderProducts.map(({ productId, quantity }) => ({
    productId,
    quantity
  }));
};

const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get<Order[]>('https://localhost:44389/api/Order');
        setOrders(ordersResponse.data);

        const productsResponse = await axios.get<Product[]>('https://localhost:44389/api/Product/get_products');
        setAvailableProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (orderId: number) => {
    setSelectedOrderId(orderId);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (orderId: number, newOrderProducts: { product: Product; quantity: number }[], newTotal: number) => {
    try {
      // Prepare the request body
      const requestBody = {
        id: orderId,
        orderProducts: newOrderProducts.map(({ product, quantity }) => ({
          productId: product.id,
          quantity
        })),
        total: newTotal,
        waiterId: 1 // Set this to the appropriate waiter ID if it's dynamic
      };
  
      // Send the PUT request
      await axios.put(`https://localhost:44389/api/Order/${orderId}`, requestBody, { headers: { 'Content-Type': 'application/json' } });
  
      // Update local state
      setOrders(prevOrders => prevOrders.map(order =>
        order.id === orderId ? { ...order, orderProducts: requestBody.orderProducts, total: newTotal } : order
      ));
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error saving edit:', error);
    }
  };
  

  const handleDelete = async (orderId: number) => {
    try {
      await axios.delete(`https://localhost:44389/api/Order/${orderId}`);
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedOrderId(null);
  };

  const handleAddOrder = async (orderData: { orderProducts: { productId: number; quantity: number }[], total: number, waiterId: number }) => {
    try {
      await axios.post('https://localhost:44389/api/Order', orderData, {
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await axios.get<Order[]>('https://localhost:44389/api/Order');
      setOrders(response.data);
      setAddModalOpen(false);
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const selectedOrder = orders.find(order => order.id === selectedOrderId) || null;

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
          {orders.map((order) => {
            const productMap = new Map<number, { name: string; quantity: number }>();

            order.orderProducts.forEach((op) => {
              const currentProduct = availableProducts.find(product => product.id === op.productId);
              if (currentProduct) {
                const existingProduct = productMap.get(op.productId);
                if (existingProduct) {
                  productMap.set(op.productId, { name: currentProduct.name, quantity: existingProduct.quantity + op.quantity });
                } else {
                  productMap.set(op.productId, { name: currentProduct.name, quantity: op.quantity });
                }
              }
            });

            const groupedProducts = Array.from(productMap.values());

            return (
              <tr key={order.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px', textAlign: 'left' }}>{order.id}</td>
                <td style={{ padding: '10px', textAlign: 'left' }}>
                  {groupedProducts
                    .map((product) => `${product.name} (x${product.quantity})`)
                    .join(', ')}
                </td>
                <td style={{ padding: '10px', textAlign: 'left' }}>{order.total} €</td>
                <td style={{ padding: '10px', textAlign: 'left' }}>
                  <button
                    style={{
                      padding: '5px 10px',
                      marginRight: '5px',
                      backgroundColor: '#3f51b5',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleEdit(order.id)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#3f51b5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setAddModalOpen(true)}>Add New Order</button>
      <AddOrderModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleAddOrder}
        availableProducts={availableProducts}
        waiterId={1}
      />
      {selectedOrder && (
        <EditOrderModal
          open={editModalOpen}
          onClose={handleCloseEditModal}
          orderId={selectedOrder.id}
          onSave={handleSaveEdit}
          products={selectedOrder.orderProducts
            .filter(op => op.product !== undefined)  // Filter out undefined products
            .map(op => ({ product: op.product!, quantity: op.quantity }))  // Use non-null assertion after filtering
          }
          total={selectedOrder.total}
          availableProducts={availableProducts}
        />
      )}
    </div>
  );
};

export default OrdersList;

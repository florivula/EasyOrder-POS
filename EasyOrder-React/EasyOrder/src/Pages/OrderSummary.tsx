import React, { useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface OrderProduct {
  productId: number;
  quantity: number;
}

interface OrderSummaryProps {
  selectedProducts: Map<number, { product: Product; quantity: number }>;
  onCompleteOrder: () => void;
  onCancelOrder: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ selectedProducts, onCompleteOrder, onCancelOrder }) => {
  const calculateTotal = (): number => {
    let total = 0;
    selectedProducts.forEach(({ product, quantity }) => {
      total += product.price * quantity;
    });
    return total;
  };

  const handleCompleteOrder = async () => {
    if (selectedProducts.size === 0) {
      alert('Please select a product first.');
      return;
    }

    try {
      const total = calculateTotal();
      
      // Create the order payload
      const order = {
        total: total,
        dateCreated: new Date().toISOString(),
        waiterId: 3, // Replace with actual waiter ID from your auth logic
        orderProducts: Array.from(selectedProducts.entries()).map(([_, { product, quantity }]) => ({
          productId: product.id,
          quantity
        }))
      };

      // Log the order payload for debugging
      console.log('Order payload:', order);

      // Send the request
      const response = await axios.post('https://localhost:44389/api/Order', order);

      // Log the response for debugging
      console.log('API Response:', response);

      onCompleteOrder(); // Clear selected products or reset the state
      alert('Order placed successfully!');
    } catch (error) {
      // Log error details for debugging
      console.error('Error completing order:', error.response ? error.response.data : error.message);
      alert('Failed to place order. Please try again.');
    }
  };

  const handleCancelOrder = () => {
    onCancelOrder(); // Clear selected products
  };

  return (
    <div className="order-summary">
      <h2 className='order-text-above'>Order Summary</h2>
      <ul>
        {Array.from(selectedProducts.entries()).map(([_, { product, quantity }]) => (
          <li key={product.id}>
            {product.name} - {product.price}€ x {quantity}
          </li>
        ))}
      </ul>
      <h3 className='totali'>Total: {calculateTotal()}€</h3>
      <button className='order-button' onClick={handleCompleteOrder}>Complete Order</button>
      <button className='order-button cancel-button' onClick={handleCancelOrder}>Cancel Order</button>
    </div>
  );
};

export default OrderSummary;

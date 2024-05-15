import React from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface OrderSummaryProps {
  selectedProducts: Product[];
  onCompleteOrder: () => void;
  onCancelOrder: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ selectedProducts, onCompleteOrder, onCancelOrder }) => {
  const calculateTotal = (): number => {
    return selectedProducts.reduce((total, product) => total + product.price, 0);
  };

  const handleCompleteOrder = async () => {
    if(selectedProducts.length === 0){
      alert('Please select a product first.');
    }else{
    try {
      const total = calculateTotal();
      const productsString = selectedProducts.map(product => `${product.name} - ${product.price}€`).join(', ');
      await axios.post('https://localhost:44389/api/Order', {
        products: productsString,
        total: total
      });
      onCompleteOrder(); // Clear selected products
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error completing order:', error);
      alert('Failed to place order. Please try again.');
    }
  }
  };

  const handleCancelOrder = () => {
    onCancelOrder(); // Clear selected products
  };

  return (
    <div className="order-summary">
      <h2 className='order-text-above'>Order Summary</h2>
      <ul>
        {selectedProducts.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}€
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

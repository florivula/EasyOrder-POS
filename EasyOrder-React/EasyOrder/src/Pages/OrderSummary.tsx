import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface OrderSummaryProps {
  selectedProducts: Product[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ selectedProducts }) => {
  const calculateTotal = (): number => {
    return selectedProducts.reduce((total, product) => total + product.price, 0);
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
      <button className='order-button'>Complete Order</button>
      <button className='order-button cancel-button'>Cancel Order</button>
    </div>
  );
};

export default OrderSummary;

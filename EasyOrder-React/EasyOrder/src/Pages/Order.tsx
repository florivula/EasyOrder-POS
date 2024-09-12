import React, { useState } from 'react';
import './Order.css';
import ProductGrid from './ProductGrid';
import CategoriesGrid from './CategoriesGrid';
import OrderSummary from './OrderSummary';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface SelectedProduct {
  product: Product;
  quantity: number;
}

const categoryColors: { [key: number]: string } = {
  1: '#fdffb6', // category 1
  2: '#caffbf', // category 2
  3: '#ffd6a5', // category 3
  4: '#ffadad',
  5: '#bdb2ff',
  6: '#9bf6ff'
};

const Order = () => {
  const [selectedProducts, setSelectedProducts] = useState<Map<number, SelectedProduct>>(new Map());
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const handleProductClick = (productId: number, productName: string, productPrice: number) => {
    setSelectedProducts(prevState => {
      const updatedProducts = new Map(prevState);
  
      if (updatedProducts.has(productId)) {
        const existingProduct = updatedProducts.get(productId)!;
        updatedProducts.set(productId, {
          product: existingProduct.product,
          quantity: existingProduct.quantity + 1
        });
      } else {
        updatedProducts.set(productId, {
          product: { id: productId, name: productName, price: productPrice },
          quantity: 1
        });
      }
  
      return updatedProducts;
    });
  };
  
  const handleClearProducts = () => {
    setSelectedProducts(new Map());
  };

  const handleCancelOrder = () => {
    setSelectedProducts(new Map());
  };

  return (
    <div className="container">
      <header className="header">EasyOrder</header>
      <div className="content">
        <div className="middle">
          <div className="middle-section">
            Categories
            <CategoriesGrid setSelectedCategoryId={setSelectedCategoryId} categoryColors={categoryColors} />
          </div>
          <div className="middle-section">
            Products
            <ProductGrid categoryId={selectedCategoryId} onProductClick={handleProductClick} categoryColors={categoryColors} />
          </div>
        </div>
        <div className="right-side">
          <OrderSummary
            selectedProducts={selectedProducts}
            onCompleteOrder={handleClearProducts}
            onCancelOrder={handleCancelOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default Order;

import React, {useState} from 'react';
import './Order.css';
import ProductGrid from './ProductGrid';
import CategoriesGrid from './CategoriesGrid';
import OrderSummary from './OrderSummary';

interface Product {
  id: number;
  name: string;
  price: number;
}

const Order = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const handleProductClick = (productId: number, productName: string, productPrice: number) => {
    const newProduct = { id: productId, name: productName, price: productPrice };
    setSelectedProducts([...selectedProducts, newProduct]);
  };

  const handleClearProducts = () => {
    setSelectedProducts([]); // Clear selected products
  };

    return (
      <div className="container">
        <header className="header">EasyOrder</header>
        <div className="content">
          <div className="middle">
            <div className="middle-section">
              Categories
              <CategoriesGrid setSelectedCategoryId={setSelectedCategoryId}/>
            </div>
            <div className="middle-section">
              Products
            <ProductGrid categoryId={selectedCategoryId} onProductClick={handleProductClick}/>
            </div>
          </div>
          <div className="right-side">
            <OrderSummary selectedProducts={selectedProducts} onCompleteOrder={handleClearProducts}/>
            </div>
        </div>
      </div>
    );
  };
  
  export default Order;

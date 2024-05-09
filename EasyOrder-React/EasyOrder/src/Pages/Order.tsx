import React from 'react';
import './Order.css';
import ProductGrid from './ProductGrid';

const App = () => {
    return (
      <div className="container">
        <header className="header">EasyOrder</header>
        <div className="content">
          <div className="middle">
            <div className="middle-section">
              Products
            <ProductGrid/>
            </div>
            <div className="middle-section">Categories</div>
          </div>
          <div className="right-side">Order</div>
        </div>
      </div>
    );
  };
  
  export default App;

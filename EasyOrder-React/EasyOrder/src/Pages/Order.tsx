import React, {useState} from 'react';
import './Order.css';
import ProductGrid from './ProductGrid';
import CategoriesGrid from './CategoriesGrid';

const App = () => {

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

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
            <ProductGrid categoryId={selectedCategoryId} />
            </div>
          </div>
          <div className="right-side">Order</div>
        </div>
      </div>
    );
  };
  
  export default App;

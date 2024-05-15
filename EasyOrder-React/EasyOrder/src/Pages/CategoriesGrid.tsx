import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  // Add other properties if needed
}


interface CategoryGridProps {
  setSelectedCategoryId: (id: number) => void;
}

const CategoriesGrid: React.FC<CategoryGridProps> = ({ setSelectedCategoryId }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('https://localhost:44389/api/Category/get_categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = (categoryId: number, categoryName: string) => {
    setSelectedCategoryId(categoryId);
    fetchProductsByCategory(categoryId);
  };

  const fetchProductsByCategory = async (categoryId: number) => {
    try {
      const response = await axios.get<[Product]>(`https://localhost:44389/api/Product/get_products_by_category/${categoryId}`);
      // Handle the response to update the products in the ProductGrid component
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  };

  return (
    <div className="categories-section">
      {categories.map((category) => (
        <div key={category.id} className="category-box" onClick={() => handleClick(category.id, category.name)}>
          <div>
            <h3>{category.name}</h3>
            <p>Category ID: {category.id}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesGrid;

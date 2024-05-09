import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
}

const CategoriesGrid: React.FC = () => {
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
    console.log('Category clicked:', categoryId, categoryName);
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
}

interface CategoriesGridProps {
  setSelectedCategoryId: (id: number) => void;
  categoryColors: { [key: number]: string };
}

const CategoriesGrid: React.FC<CategoriesGridProps> = ({ setSelectedCategoryId, categoryColors }) => {
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

  const handleClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    // Removed fetchProductsByCategory as it should be handled in the parent or related component
  };

  return (
    <div className="categories-section">
      {categories.map((category) => (
        <div
          key={category.id}
          className="category-box"
          style={{ backgroundColor: categoryColors[category.id] }} // Apply the color dynamically
          onClick={() => handleClick(category.id)}
        >
          <div>
            <h3>{category.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesGrid;

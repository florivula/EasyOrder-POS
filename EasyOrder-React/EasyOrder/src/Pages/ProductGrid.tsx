import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductGridProps {
  categoryId: number | null;
  onProductClick: (productId: number, productName: string, productPrice: number) => void;
  categoryColors: { [key: number]: string }; // Add this line to include the categoryColors prop
}

const ProductGrid: React.FC<ProductGridProps> = ({ categoryId, onProductClick, categoryColors }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (categoryId === null) {
        setProducts([]); // Clear products if no category is selected
        return;
      }

      try {
        const response = await axios.get<Product[]>(`https://localhost:44389/api/Product/get_products_by_category/${categoryId}`);
        setProducts(response.data);
      } catch (error) {
        console.error(`Error fetching products for category ID ${categoryId}:`, error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="products-section">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-box"
          onClick={() => onProductClick(product.id, product.name, product.price)}
          style={{ backgroundColor: categoryId !== null ? categoryColors[categoryId] : '#bedaf7' }} // Use category color if available
        >
          <div>
            <h3>{product.name}</h3>
            <p>{product.price}€</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;

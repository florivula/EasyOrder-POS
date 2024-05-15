import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductGridProps {
  categoryId: number | null;
}

const ProductGrid: React.FC<ProductGridProps> = ({ categoryId }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`https://localhost:44389/api/Product/get_products_by_category/${categoryId}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (categoryId !== null) {
      fetchProducts();
    } else {
      setProducts([]); 
    }
  }, [categoryId]);

  const handleClick = (productId: number, productName: string, productPrice: number) => {
    console.log('Product clicked:', productId, productName, productPrice);
    // qitu duhet logjika
  };

  return (
    <div className="products-section">
      {products.map((product) => (
        <div key={product.id} className="product-box" onClick={() => handleClick(product.id, product.name, product.price)}>
          <div>
            <h3>{product.name}</h3>
            <p>Price: {product.price}€</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;

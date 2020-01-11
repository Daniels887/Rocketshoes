import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async function loadProducts() {
      const response = await api.get('products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    })();
  }, []);

  return (
    <ProductList>
      {products.map(product => (
        <li>
          <img src={product.image} alt="Tênis" />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
          <button type="button">
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

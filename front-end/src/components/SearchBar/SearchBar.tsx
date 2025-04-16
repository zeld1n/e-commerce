'use client';
import React, { useState } from 'react';
import { Product } from '@/types/product';
import Image from 'next/image';

type Props = {
  products: Product[];
};

const SearchBar: React.FC<Props> = ({ products }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="mb-10">
      <input
        type="search"
        placeholder="Search products..."
        onChange={handleChange}
        value={searchInput}
        className="w-full mb-6 border border-gray-300 rounded px-4 py-2"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => {
          if (
            searchInput &&
            !(product.name?.toLowerCase().includes(searchInput.toLowerCase()))
          ) {
            return null;
          }

          return (
            <div
              key={product.id || index}
              className="p-4 border rounded-lg shadow hover:shadow-md transition"
            >
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name || 'product image'}
                  width={100}
                  height={100}
                  className="mb-3"
                />
              ) : (
                <div className="mb-3 text-sm text-gray-500">No image available</div>
              )}
              <h3 className="text-lg font-semibold">Title: {product.name}</h3>
              <p className="text-gray-700">Price: ${product.price}</p>
              <p className="text-gray-700">Quantity: {product.quantity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;

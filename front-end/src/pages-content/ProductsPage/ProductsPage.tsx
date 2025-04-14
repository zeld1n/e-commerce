'use client'
import { Product } from '@/types/product';
import { useState } from 'react';
import Image from 'next/image';

type Props = {
  products: Product[];
};

export default function ProductsPage({ products }: Props) {
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const productsPerPage = 9;


  const filteredProducts = searchInput
    ? products.filter((product) =>
<<<<<<< HEAD
        product.title?.toLowerCase().includes(searchInput.toLowerCase())
=======
        product.name?.toLowerCase().includes(searchInput.toLowerCase())
>>>>>>> 4fa2f2d (Back)
      )
    : products; 

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Пагінація
  const paginatedProducts = filteredProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setCurrentPage(0);
  };

  return (
    <div>
      <div className="mb-6 border-b pb-4">
        <h1 className="font-medium text-2xl mb-3">Products</h1>

        <input
          type="search"
          placeholder="Search products..."
          value={searchInput}
          onChange={handleSearchChange}
          className="w-full border px-4 py-2 rounded mb-4"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">No products found matching your search.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
<<<<<<< HEAD
                <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
=======
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
>>>>>>> 4fa2f2d (Back)
                <p className="text-gray-700 mb-1">Price: ${product.price}</p>
                <p className="text-gray-700 mb-2">Quantity: {product.quantity}</p>

                {product.image ? (
                  <Image
                    src={product.image}
                    alt="product image"
                    width={100}
                    height={100}
                    className="rounded"
                  />
                ) : (
                  <p className="text-sm text-gray-400">No product image available</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
            >
              Previous
            </button>

            <span>
              Page {totalPages === 0 ? 0 : currentPage + 1} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 4fa2f2d (Back)

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';

type ApiResponse = {
  products: Product[];
  totalPages: number;
};

const Skeleton = () => (
  <div className="border rounded-lg p-4 shadow-sm animate-pulse bg-gray-200">
    <div className="h-4 bg-gray-300 rounded mb-2"></div>
    <div className="h-3 bg-gray-300 rounded mb-2"></div>
    <div className="h-3 bg-gray-300 rounded mb-2"></div>
    <div className="h-24 bg-gray-300 rounded mb-2"></div>
  </div>
);

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(false);

  const productsPerPage = 9;
  const router = useRouter();  


  const handleAddToCart = (product: Product) => {
    const storedCart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
  
    const existingProductIndex = storedCart.findIndex(item => item.id === product.id);
  
    if (existingProductIndex !== -1) {
      storedCart[existingProductIndex].quantity += 1;
    } else {
      storedCart.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(storedCart));
    console.log('Product added to cart:', storedCart);
  };
  

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/products/all?page=${currentPage}&size=${productsPerPage}&search=${encodeURIComponent(searchInput)}&sortBy=${sortBy}&sortDir=${sortDirection}`
      );
      const data: ApiResponse = await res.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchInput, sortBy, sortDirection]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (id: number) => {
    router.push(`/products/${id}`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    const half = Math.floor(maxPageButtons / 2);

    let start = Math.max(0, currentPage - half);
    const end = Math.min(totalPages, start + maxPageButtons);

    if (end - start < maxPageButtons) {
      start = Math.max(0, end - maxPageButtons);
    }

    for (let i = start; i < end; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200'} hover:bg-blue-300 transition`}
        >
          {i + 1}
        </button>
      );
    }

    return pageNumbers;
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

        <div className="flex flex-wrap items-center gap-4 mb-2">
          <div>
            <label className="mr-2 font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="quantity">Quantity</option>
            </select>
          </div>

          <div>
            <label className="mr-2 font-medium">Direction:</label>
            <select
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}
              className="border px-2 py-1 rounded"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {Array.from({ length: productsPerPage }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-600">No products found matching your search.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition transform hover:scale-105 bg-white"
              >
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-700 mb-1">Price: ${product.price}</p>
                <p className="text-gray-700 mb-2">Quantity: {product.quantity}</p>

                {product.image ? (
                  <Image
                    src={product.image}
                    alt="product image"
                    width={100}
                    height={100}
                    className="rounded mb-4"
                  />
                ) : (
                  <p className="text-sm text-gray-400 mb-4">No product image available</p>
                )}

                  <button
                    onClick={() => handleViewDetails(product.id)}
                    className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full mt-2 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Add to Cart
                  </button>

              </div>
            ))}
          </div>

          <div className="flex justify-center items-center flex-wrap gap-2 mb-4">
            <button
              onClick={() => handlePageChange(0)}
              disabled={currentPage === 0}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
            >
              First
            </button>

            <button
              onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
            >
              Previous
            </button>

            {renderPageNumbers()}

            <button
              onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage >= totalPages - 1}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
            >
              Next
            </button>

            <button
              onClick={() => handlePageChange(totalPages - 1)}
              disabled={currentPage >= totalPages - 1}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
            >
              Last
            </button>
          </div>

          <div className="text-center text-sm text-gray-500">
            Showing page {totalPages === 0 ? 0 : currentPage + 1} of {totalPages}
          </div>
        </>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import Image from 'next/image';

const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  useEffect(() => {
    if (!id) return;

    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/products/get/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product details');
        const data: Product = await res.json();
        setProduct(data);
      } catch (err) {
        setError('Error loading product details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const addToCart = () => {
    if (!product) return;
  
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = cart.findIndex((item: Product) => item.id === product.id);
  
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    setIsAdded(true);

  };
  

  if (isLoading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;
  if (product.status !== 'Active') return <p>This product is not available.</p>;


  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>

      {product.image ? (
        <Image src={product.image} alt={product.name} width={500}
  height={500} className=" rounded mb-4" />
      ) : (
        <p className="text-sm text-gray-400 mb-4">No image available</p>
      )}

      <div className="text-gray-700 mb-4">
        <p className="mb-2"><strong>Price:</strong> ${product.price}</p>
        <p className="mb-2"><strong>Quantity:</strong> {product.quantity}</p>
        <p className="mb-4"><strong>Description:</strong> {product.description || 'No description available'}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={addToCart}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Add to Cart
        </button>

        <button
          onClick={() => router.push('/products')}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Back to Products
        </button>
      </div>

      {isAdded && (
        <p className="mt-4 text-green-600 font-medium">✔ Product added to cart!</p>
      )}
    </div>
  );
};

export default ProductDetails;

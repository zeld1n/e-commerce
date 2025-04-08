'use client'
import { Product } from '@/types/product';
import { useState } from 'react';
import Image from 'next/image';

type Props = {
  products: Product[];
}

export default function ProductsPage(props: Props) {
  const [isProductsVisible, setIsProductsVisible] = useState(false);

  const handleProductsVisibility = async () => {
    setIsProductsVisible(state => !state);
  }

  const dataToRender = () => {
    if (isProductsVisible) {
      return props.products.slice(0, 10);
    }

    return [];
  }

  return (
    <div>
      <div className={' mb-[20px] border-b-1'}>
        <h1 className={'font-medium text-2xl mb-[5px]'}>Products</h1>
        <button
          className={'bg-sky-950 text-white px-[15px] py-[5px] rounded cursor-pointer mb-[20px]'}
          onClick={handleProductsVisibility}
        >
          {isProductsVisible ? 'Hide products' : 'Show products'}
        </button>
      </div>

      <ul>
        {
          dataToRender()
            .map(product => (
              <li key={product.id} className={'mb-[5px] pb-[5px] border-b-1'}>
                <p>Product id: {product.id}</p>
                <p>Title: {product.title}</p>
                <p>Price: {product.price}</p>
                <p>quantity: {product.quantity}</p>
                {product.image ? (
                  <Image 
                    src={product.image}
                    alt={'product image'}
                    width={50}
                    height={50}
                  />
                ) : 'No product image available'}
              </li>
            ))
        }
      </ul>
    </div>
  )
}

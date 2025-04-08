import ProductsPage from '@/pages-content/ProductsPage/ProductsPage';
import { Product } from '@/types/product';

const fetchProductsFromBackEnd = async (): Promise<Product[]> => {
  const response = await fetch('http://localhost:8080/product');
  return await response.json();
}

export default async function Page() {
  const products = await fetchProductsFromBackEnd();

  return <ProductsPage products={products}/>;
}

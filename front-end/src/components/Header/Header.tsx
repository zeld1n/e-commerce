'use client';

import Link from 'next/link';
import { Product } from '@/types/product';
import { useAuth } from "@/app/context/auth-context";
import { useState, useEffect } from 'react';
import { ShoppingBagIcon, ShoppingCartIcon, UserCircleIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isLoggedIn, userData, logout} = useAuth();


  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  const handleCartUpdate = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
    console.log('Cart refreshed from localStorage:', storedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCartAndLinkClick = () => {
    handleCartToggle();  
    handleLinkClick();
    handleCartUpdate();   
  };

  const handleIncreaseQuantity = (id: number) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));  
  };

  const handleDecreaseQuantity = (id: number) => {
    const updatedCart = cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));  
  };

  return (
    <header className="flex justify-between items-center p-4 bg-sky-950 text-white relative z-50">
      <Link
        href="/homepage"
        className="transition-colors duration-300 ease-in-out hover:bg-gray-700 p-2 rounded text-xl font-bold"
        onClick={handleLinkClick}
      >
        E-Commerce
      </Link>

      {/* bur-menu */}
      <button
        className="md:hidden absolute right-4"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* navbar */}
      <nav>
        <ul
          className={`flex flex-col md:flex-row gap-4 md:gap-6 absolute md:static top-[70px] left-0 w-full md:w-auto bg-sky-950 md:bg-transparent p-4 md:p-0 transition-all duration-300 ease-in-out ${isMenuOpen ? 'block' : 'hidden md:flex'}`}
        >
          <li className="flex items-center">
            <Link
              href="/products"
              className="transition-colors duration-300 ease-in-out hover:bg-gray-700 p-2 rounded flex items-center"
              onClick={handleLinkClick}
            >
              <ShoppingBagIcon className="w-5 h-5" /> Products
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              href="/about-us"
              className="transition-colors duration-300 ease-in-out hover:bg-gray-700 p-2 rounded flex items-center"
              onClick={handleLinkClick}
            >
              <UserIcon className="w-5 h-5" /> About Us
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <button
                  className="transition-colors duration-300 ease-in-out hover:bg-gray-700 p-2 rounded flex items-center gap-1 cursor-pointer"
                  onClick={handleCartAndLinkClick}
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  <span>Cart</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    handleLinkClick(); 
                  }}
                  className="transition-colors duration-300 ease-in-out hover:bg-gray-700 p-2 rounded flex items-center gap-1 cursor-pointer"
                >
                  <XMarkIcon className="w-5 h-5"/>
                  Logout
                </button>
              </li>

              <li>
                <Link
                  href="/profile"
                  className="transition-colors duration-300 ease-in-out hover:bg-gray-700 p-2 rounded flex items-center gap-1"
                  onClick={handleLinkClick}
                >
                  <UserCircleIcon className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
              </li>

              {userData?.role === 'admin' && (
                <li>
                  <Link
                    href="/adminPanel"
                    className="transition-colors duration-300 ease-in-out hover:bg-gray-700 p-2 rounded flex items-center gap-1"
                    onClick={handleLinkClick}
                  >
                    <UserCircleIcon className="w-5 h-5" />
                    <span>Admin Panel</span>
                  </Link>
                </li>
              )}
            </>
          ) : (
            <li>
              <Link
                href="/authform"
                className="transition-colors duration-300 ease-in-out hover:bg-gray-700 p-2 rounded flex items-center gap-1"
                onClick={handleLinkClick}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/*корзинка*/}
      <div
        className={`fixed top-0 right-0 w-[300px] h-full bg-white shadow-lg z-40 transition-all duration-500 ease-in-out transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900 cursor-pointer"
          onClick={handleCartToggle}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Cart</h3>
          <ul className="mt-4 text-gray-900">
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <li key={item.id} className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <p>{item.name} (x{item.quantity})</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p>€{(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))
            ) : (
              <li className="text-gray-500">Your cart is empty.</li>
            )}
          </ul>
          <div className="mt-4">
            <p className="font-semibold text-gray-900">Total: €{calculateTotal()}</p>
            <button className="w-full mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

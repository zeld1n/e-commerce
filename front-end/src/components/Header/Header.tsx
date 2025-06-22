'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Heart, User } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from "@/app/context/auth-context"; // предполагаем, что useAuth возвращает { isLoggedIn, userData, logout }

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const { isLoggedIn, userData, logout } = useAuth();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);


  const handleCartUpdate = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
    console.log('Cart refreshed from localStorage:', storedCart);
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

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleQuantityChange = (id: number, delta: number) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Лого */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            E-Commerce
          </Link>

          {/* Навигация (только desktop) */}
          <nav className="hidden lg:flex  gap-6 text-gray-700 font-medium">
            <Link href="/homepage" className="hover:text-blue-600">Home</Link>
            <Link href="/products" className="hover:text-blue-600">Products</Link>
            <Link href="/about-us" className="hover:text-blue-600">About Us</Link>
          </nav>

          {/* Иконки действий */}
          <div className="flex items-center gap-4">
            <button className="relative text-gray-700 hover:text-red-500">
              <Heart className="h-6 w-6" />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>

            {/* Корзина */}
            <button onClick={handleCartAndLinkClick} className="relative text-gray-700 hover:text-blue-600">
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Профиль / Логин */}
            {isLoggedIn ? (
              <div className="relative">
                <button onClick={toggleProfile} className="text-gray-700 hover:text-blue-600">
                  <User className="h-6 w-6" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md border rounded-lg py-2">
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Il mio Profilo</Link>
                    <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100">I miei Ordini</Link>
                    <Link href="/wishlist" className="block px-4 py-2 hover:bg-gray-100">Lista Desideri</Link>
                    {userData?.role === 'admin' && (
                      <Link href="/adminPanel" className="block px-4 py-2 hover:bg-gray-100 text-blue-600">Admin Panel</Link>
                    )}
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/authform" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
            )}

            {/* Mobile меню */}
            <button onClick={toggleMenu} className="lg:hidden text-gray-700">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile меню */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md border-t">
          <nav className="flex flex-col p-4 gap-4">
            <Link href="/homepage" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600">Prodotti</Link>
            <Link href="/about-us" className="text-gray-700 hover:text-blue-600">About Us</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contatti</Link>
          </nav>
        </div>
      )}

      {/* Сайдбар корзины */}
      <div className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 transition-transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4">
          <button onClick={handleCartToggle} className="absolute top-4 right-4 text-gray-700 hover:text-black">
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
          <ul>
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <li key={item.id} className="border-b py-2">
                  <div className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">€{(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))
            ) : (
              <li className="text-gray-500">Your cart is empty.</li>
            )}
          </ul>
          <p className="mt-4 font-semibold">Total: €{calculateTotal()}</p>
          <Link href="/checkout">
            <button className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Checkout</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;

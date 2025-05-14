'use client'
import { useState,useEffect } from 'react';
import { CreditCard, Truck, ShieldCheck, X } from 'lucide-react';
import { Product} from '@/types/product';
import  Image from 'next/image';



export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Italia',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  
  const [cartItems, setCartItems] = useState<Product[]>([]);

   useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(storedCart);
    }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const removeItem = (id:number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 4.99;
  const total = subtotal + shipping;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Ordine inviato con successo!');
  };

  return (
    
    <div className="flex flex-col min-h-screen bg-sky-950 text-white">


      {/* Main Content */}
      <main className="flex-grow py-8 bg-sky-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Shipping */}
              <div className="bg-sky-900 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Indirizzo di spedizione</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-sky-200">Nome</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-sky-800 border border-sky-700 rounded-md text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-sky-200">Cognome</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-sky-800 border border-sky-700 rounded-md text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-sky-200">Indirizzo</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-sky-800 border border-sky-700 rounded-md text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-sky-200">Città</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-sky-800 border border-sky-700 rounded-md text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-sky-200">CAP</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-sky-800 border border-sky-700 rounded-md text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-sky-200">Paese</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-sky-800 border border-sky-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option>Italia</option>
                      <option>Francia</option>
                      <option>Germania</option>
                      <option>Spagna</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-sky-900 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Metodo di pagamento</h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-sky-200">Numero carta</label>
                    <div className="mt-1 relative">
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="block w-full px-3 py-2 bg-sky-800 border border-sky-700 rounded-md text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                      <CreditCard className="absolute right-3 top-2 text-sky-400" size={20} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-sky-200">Nome sulla carta</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-sky-800 border border-sky-700 rounded-md text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-sky-200">Data di scadenza</label>
                      <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                        className="mt-1 block w-full px-3 py-2 bg-sky-800 border border-sky-700 rounded-md text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-sky-200">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="mt-1 block w-full px-3 py-2 bg-sky-800 border border-sky-700 rounded-md text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                Completaʼordine
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-sky-900 p-6 rounded-lg shadow sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Riepilogo ordine</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                    <Image
                src={item.image ? item.image : '/placeholder.png'} 
                alt={item.name}
                width={48}
                height={48}
                className="object-cover rounded"
                />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-sky-300">Quantità: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>€{(item.price * item.quantity).toFixed(2)}</span>
                      <button onClick={() => removeItem(item.id)} className="text-sky-400 hover:text-sky-300">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Costs */}
              <div className="border-t border-sky-800 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sky-300">Subtotale</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sky-300">Spedizione</span>
                  <span>€{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-sky-800">
                  <span>Totale</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-sky-800">
                <div className="flex items-center justify-center space-x-4 text-sky-300">
                  <div className="flex flex-col items-center">
                    <ShieldCheck size={24} />
                    <span className="text-xs mt-1">Pagamento Sicuro</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Truck size={24} />
                    <span className="text-xs mt-1">Spedizione Rapida</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
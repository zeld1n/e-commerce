'use client'
import React, { useEffect, useState } from 'react';
import { User, Package, MapPin, Settings, Edit2, Truck, CheckCircle, Clock, X } from 'lucide-react';
import { Product } from '@/types/product';

type Order = {
  id: number;
  createdAt: string; 
  status: string;
  totalAmount: number; 
  prodotti: Product[];
  tracking?: string;
};

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  addressStreet?: string;
  addressZipCode?: string;
  addressCity?: string;
  addressCountry?: string;
  imageUrl?: string;
  lastSeen: string;
  spent?: number;
  username?: string;
  password?: string;
  role?: string;
  orders: Order[];
};

const EcommerceProfile = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'address' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Управляем адресом отдельным стейтом, если нужно редактировать отдельно
  const [shippingAddress, setShippingAddress] = useState({
    via: '',
    citta: '',
    provincia: '',
    cap: '',
    paese: '',
  });

  const orders = profile?.orders || [];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('https://demo-deploy-gs0s.onrender.com/users/profile',{
          credentials: "include",
        });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProfile(data);
        setShippingAddress({
          via: data.via || '',
          citta: data.citta || '',
          provincia: data.provincia || '',
          cap: data.cap || '',
          paese: data.paese || '',
        });
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Consegnato':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'In Transito':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'In Elaborazione':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Consegnato':
        return 'bg-green-100 text-green-800';
      case 'In Transito':
        return 'bg-blue-100 text-blue-800';
      case 'In Elaborazione':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleProfileUpdate = (field: keyof UserProfile, value: string | number | boolean) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };



  const OrderModal: React.FC<{ order: Order; onClose: () => void }> = ({ order, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Dettagli Ordine {order.id}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStatusIcon(order.status)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Data ordine</p>
              <p className="font-medium">{new Date(order.createdAt).toLocaleString('it-IT', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Prodotti Ordinati</h3>
            <div className="space-y-3">
              {order.prodotti.map((prodotto, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">{prodotto.name}</p>
                    <p className="text-sm text-gray-600">Quantità: {prodotto.quantity}</p>
                  </div>
                  <p className="font-medium">€{prodotto.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t font-bold text-lg">
              <span>Totale</span>
              <span>€{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Informazioni Spedizione</h3>
            <p className="text-gray-600">
              {shippingAddress.via}, {shippingAddress.citta}, {shippingAddress.provincia}, {shippingAddress.cap}, {shippingAddress.paese}
            </p>
            <p className="text-sm text-gray-500 mt-1">Codice tracking: {order.tracking || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ciao, {profile.firstName}!</h1>
              <p className="text-gray-600">Gestisci il tuo profilo e i tuoi ordini</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            {(['profile', 'orders', 'address', 'settings'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {{
                  profile: <User className="w-5 h-5" />,
                  orders: <Package className="w-5 h-5" />,
                  address: <MapPin className="w-5 h-5" />,
                  settings: <Settings className="w-5 h-5" />,
                }[tab]}
                <span>
                  {{
                    profile: 'Profilo',
                    orders: 'I Miei Ordini',
                    address: 'Indirizzo',
                    settings: 'Impostazioni',
                  }[tab]}
                </span>
              </button>
            ))}
          </div>

          {/* Tabs content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div>
                {!isEditing ? (
                  <div className="space-y-4">
                    <p><strong>First Name:</strong> {profile.firstName}</p>
                    <p><strong>Last Name:</strong> {profile.lastName}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Last seen:</strong> {new Date(profile.lastSeen).toLocaleString('it-IT', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                  
                   </p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-4 inline-flex items-center space-x-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Modifica Profilo</span>
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      setIsEditing(false);
                      // TODO: send update to backend
                    }}
                    className="space-y-4 max-w-md"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nome</label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={e => handleProfileUpdate('firstName', e.target.value)}
                        className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cognome</label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={e => handleProfileUpdate('lastName', e.target.value)}
                        className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={e => handleProfileUpdate('email', e.target.value)}
                        className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                      />
                    </div>
                  
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                      >
                        Salva
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
                      >
                        Annulla
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                {orders.length === 0 ? (
                  <p>Non hai ordini.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div
                        key={order.id}
                        className="flex justify-between items-center border rounded p-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div>
                          <p className="font-semibold">Ordine #{order.id}</p>
                          <p className="text-sm text-gray-600">
                            Data: {new Date(order.createdAt).toLocaleString('it-IT', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold">€{order.totalAmount.toFixed(2)}</span>
                          {getStatusIcon(order.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedOrder && (
                  <OrderModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                  />
                )}
              </div>
            )}

            {activeTab === 'address' && (
  !isEditing ? (
    <div className="space-y-4">
      <p><strong>Street:</strong> {profile.addressStreet}</p>
      <p><strong>City:</strong> {profile.addressCity}</p>
      <p><strong>Zip Code:</strong> {profile.addressZipCode}</p>
      <p><strong>Country:</strong> {profile.addressCountry || '-'}</p>
      <button
        onClick={() => setIsEditing(true)}
        className="mt-4 inline-flex items-center space-x-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        <Edit2 className="w-4 h-4" />
        <span>Modifica Indirizzo</span>
      </button>
    </div>
  ) : (
    <form
      onSubmit={e => {
        e.preventDefault();
        setIsEditing(false);
        // TODO: отправить обновление адреса на backend
      }}
      className="space-y-4 max-w-md"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Street</label>
        <input
          type="text"
          value={profile.addressStreet}
          onChange={e => handleProfileUpdate('addressStreet', e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          value={profile.addressCity}
          onChange={e => handleProfileUpdate('addressCity', e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Zip Code</label>
        <input
          type="text"
          value={profile.addressZipCode}
          onChange={e => handleProfileUpdate('addressZipCode', e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <input
          type="text"
          value={profile.addressCountry || ''}
          onChange={e => handleProfileUpdate('addressCountry', e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Salva
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
        >
          Annulla
        </button>
      </div>
    </form>
  )
)}

            {activeTab === 'settings' && (
              <div>
                <p>Impostazioni account in costruzione...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceProfile;

'use client'
import React, { useState } from 'react';
import { User, Package, MapPin, Settings, Edit2, Eye, Truck, CheckCircle, Clock, X } from 'lucide-react';

const EcommerceProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const [userProfile, setUserProfile] = useState({
    nome: 'Marco',
    cognome: 'Rossi',
    email: 'marco.rossi@email.com',
    telefono: '+39 333 123 4567',
    dataNascita: '1990-05-15'
  });

  const [shippingAddress, setShippingAddress] = useState({
    via: 'Via Giuseppe Verdi, 123',
    citta: 'Milano',
    cap: '20121',
    provincia: 'MI',
    paese: 'Italia'
  });

  const orders = [
    {
      id: 'ORD-2024-001',
      data: '2024-06-15',
      stato: 'Consegnato',
      totale: 89.99,
      prodotti: [
        { nome: 'Cuffie Bluetooth Premium', prezzo: 59.99, quantita: 1 },
        { nome: 'Custodia Protettiva', prezzo: 29.99, quantita: 1 }
      ],
      tracking: 'IT123456789',
      indirizzo: 'Via Giuseppe Verdi, 123, Milano'
    },
    {
      id: 'ORD-2024-002',
      data: '2024-06-10',
      stato: 'In Transito',
      totale: 149.50,
      prodotti: [
        { nome: 'Smartphone Stand', prezzo: 24.99, quantita: 2 },
        { nome: 'Caricatore Wireless', prezzo: 99.99, quantita: 1 }
      ],
      tracking: 'IT987654321',
      indirizzo: 'Via Giuseppe Verdi, 123, Milano'
    },
    {
      id: 'ORD-2024-003',
      data: '2024-06-01',
      stato: 'In Elaborazione',
      totale: 234.99,
      prodotti: [
        { nome: 'Tablet 10 pollici', prezzo: 199.99, quantita: 1 },
        { nome: 'Cover Protettiva', prezzo: 34.99, quantita: 1 }
      ],
      tracking: 'IT456789123',
      indirizzo: 'Via Giuseppe Verdi, 123, Milano'
    }
  ];

  const getStatusIcon = (status) => {
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

  const getStatusColor = (status) => {
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

  const handleProfileUpdate = (field, value) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressUpdate = (field, value) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
  };

  const OrderModal = ({ order, onClose }) => (
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
              {getStatusIcon(order.stato)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.stato)}`}>
                {order.stato}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Data ordine</p>
              <p className="font-medium">{new Date(order.data).toLocaleDateString('it-IT')}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Prodotti Ordinati</h3>
            <div className="space-y-3">
              {order.prodotti.map((prodotto, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">{prodotto.nome}</p>
                    <p className="text-sm text-gray-600">Quantità: {prodotto.quantita}</p>
                  </div>
                  <p className="font-medium">€{prodotto.prezzo.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t font-bold text-lg">
              <span>Totale</span>
              <span>€{order.totale.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Informazioni Spedizione</h3>
            <p className="text-gray-600">{order.indirizzo}</p>
            <p className="text-sm text-gray-500 mt-1">Codice tracking: {order.tracking}</p>
          </div>
        </div>
      </div>
    </div>
  );

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
              <h1 className="text-2xl font-bold text-gray-900">Ciao, {userProfile.nome}!</h1>
              <p className="text-gray-600">Gestisci il tuo profilo e i tuoi ordini</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Profilo</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>I Miei Ordini</span>
            </button>
            <button
              onClick={() => setActiveTab('address')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'address'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span>Indirizzo</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Impostazioni</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'profile' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Informazioni Personali</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>{isEditing ? 'Salva' : 'Modifica'}</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userProfile.nome}
                      onChange={(e) => handleProfileUpdate('nome', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{userProfile.nome}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cognome</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userProfile.cognome}
                      onChange={(e) => handleProfileUpdate('cognome', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{userProfile.cognome}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => handleProfileUpdate('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{userProfile.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userProfile.telefono}
                      onChange={(e) => handleProfileUpdate('telefono', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{userProfile.telefono}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data di Nascita</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={userProfile.dataNascita}
                      onChange={(e) => handleProfileUpdate('dataNascita', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{new Date(userProfile.dataNascita).toLocaleDateString('it-IT')}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">I Miei Ordini</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <p className="text-gray-600 text-sm">Ordinato il {new Date(order.data).toLocaleDateString('it-IT')}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.stato)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.stato)}`}>
                          {order.stato}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">{order.prodotti.length} prodotto{order.prodotti.length > 1 ? 'i' : ''}</p>
                        <p className="font-semibold text-lg">€{order.totale.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Visualizza</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'address' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Indirizzo di Spedizione</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>{isEditing ? 'Salva' : 'Modifica'}</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Via e Numero Civico</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={shippingAddress.via}
                      onChange={(e) => handleAddressUpdate('via', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{shippingAddress.via}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Città</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={shippingAddress.citta}
                      onChange={(e) => handleAddressUpdate('citta', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{shippingAddress.citta}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CAP</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={shippingAddress.cap}
                      onChange={(e) => handleAddressUpdate('cap', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{shippingAddress.cap}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Provincia</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={shippingAddress.provincia}
                      onChange={(e) => handleAddressUpdate('provincia', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{shippingAddress.provincia}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Paese</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={shippingAddress.paese}
                      onChange={(e) => handleAddressUpdate('paese', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{shippingAddress.paese}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Impostazioni Account</h2>
              <div className="space-y-6">
                
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Sicurezza</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Cambia Password
                  </button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 text-red-600">Zona Pericolosa</h3>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    Elimina Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Modal */}
      {selectedOrder && (
        <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
};

export default EcommerceProfile;
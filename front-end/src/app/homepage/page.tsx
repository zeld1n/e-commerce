'use client'
import React, { useState, useEffect } from 'react';
import { ShoppingCart,  Star, ChevronLeft, ChevronRight, Truck, Shield, Clock, Award } from 'lucide-react';

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Nuova Collezione Primavera",
      subtitle: "Scopri i trend di stagione",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      cta: "Acquista Ora"
    },
    {
      title: "Sconti fino al 50%",
      subtitle: "Su una selezione di prodotti",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      cta: "Vedi Offerte"
    },
    {
      title: "Spedizione Gratuita",
      subtitle: "Per ordini superiori a €50",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      cta: "Scopri di Più"
    }
  ];

  const categories = [
    { name: "Electronics", icon: "💻", color: "from-blue-500 to-purple-600" },
    { name: "Clothing", icon: "👕", color: "from-pink-500 to-rose-600" },
    { name: "Home & Kitchen", icon: "🏠", color: "from-green-500 to-teal-600" },
    { name: "Toys", icon: "⚽", color: "from-orange-500 to-red-600" },
    { name: "Books", icon: "📚", color: "from-indigo-500 to-blue-600" }
  ];



  
  const featuredProducts = [
    {
      id: 1,
      name: "Smartphone Pro Max",
      price: 899,
      originalPrice: 1099,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 234,
      badge: "Bestseller"
    },
    {
      id: 2,
      name: "Cuffie Wireless",
      price: 199,
      originalPrice: 249,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.6,
      reviews: 156,
      badge: "Nuovo"
    },
    {
      id: 3,
      name: "Sneakers Limited",
      price: 129,
      originalPrice: 179,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviews: 89,
      badge: "Limitato"
    },
    {
      id: 4,
      name: "Orologio Smart",
      price: 299,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      reviews: 203,
      badge: "Sconto"
    }
  ];

  const features = [
    { icon: Truck, title: "Spedizione Veloce", desc: "Consegna in 24-48h" },
    { icon: Shield, title: "Acquisti Sicuri", desc: "Pagamenti protetti" },
    { icon: Clock, title: "Supporto 24/7", desc: "Assistenza sempre attiva" },
    { icon: Award, title: "Garanzia Premium", desc: "2 anni su tutti i prodotti" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
                index === currentSlide ? 'translate-x-0' : 
                index < currentSlide ? '-translate-x-full' : 'translate-x-full'
              }`}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="text-white max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 opacity-90">
                    {slide.subtitle}
                  </p>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blue-200 group-hover:to-purple-200">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Esplora le Categorie
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trova quello che cerchi nella nostra vasta selezione di prodotti
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="group cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${category.color} p-8 rounded-2xl text-center text-white transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}>
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Prodotti in Evidenza
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              I nostri prodotti più venduti e apprezzati dai clienti
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.badge}
                    </span>
                  </div>
                
                  
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-800">€{product.price}</span>
                      <span className="text-lg text-gray-400 line-through">€{product.originalPrice}</span>
                    </div>
                    <span className="text-green-600 font-semibold">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Aggiungi al Carrello</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     

    </div>
  );
};

export default Homepage;
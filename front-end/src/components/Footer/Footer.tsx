'use client';

import Link from 'next/link';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 

} from 'lucide-react';
export const Footer = () => {
  return (
    
    <footer className="bg-gray-900 text-white">
        <div className="container mx-15 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
                E-commerce
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Since 2025, E-commerce has been your trusted partner for online shopping. 
                We offer quality products, competitive prices and exceptional customer service. 
                Your satisfaction is our priority.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">Via Milano 123, 20121 Milano, Italia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">+39 02 1234 5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">info@e-commerce.it</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex space-x-4 mt-6">
                <a href="#" className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-blue-400 p-3 rounded-full hover:bg-blue-500 transition-all duration-300 transform hover:scale-110">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-red-600 p-3 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-110">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
            </div>
            </div>

    </footer>
  );
};

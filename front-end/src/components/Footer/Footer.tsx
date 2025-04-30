'use client';

import Link from 'next/link';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

export const Footer = () => {
  return (
    <footer className="bg-sky-950 text-white px-8 py-8 mt-8 w-full">
      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Логотип и описание */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">E-Commerce</h2>
          <p className="text-sm max-w-md">
            Your one-stop shop for the best products.
          </p>
        </div>

        {/* Контакты */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Contatti</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <EnvelopeIcon className="w-5 h-5 text-white" />
              <Link href="mailto:example@ecommerce.com" className="text-sm hover:text-gray-400">
                example@ecommerce.com
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="w-5 h-5 text-white" />
              <Link href="tel:+123456789" className="text-sm hover:text-gray-400">
                +1 (234) 567-89
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

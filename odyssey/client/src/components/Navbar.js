import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-blue-600 tracking-wide">Odyssey</div>

          <ul className="flex items-center space-x-6 text-gray-700 font-medium">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-600">About</Link></li>

            {/* Dropdown */}
            <li className="relative group cursor-pointer">
              <span className="hover:text-blue-600">Category</span>
              <ul className="absolute left-0 mt-2 w-40 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                <li className="px-4 py-2 hover:bg-blue-50">
                  <Link to="/categories/domestic" className="block text-sm">Domestic</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-50">
                  <Link to="/categories/international" className="block text-sm">International</Link>
                </li>
              </ul>
            </li>

            <li><Link to="/gallery" className="hover:text-blue-600">Gallery</Link></li>
            <li><Link to="/booking" className="hover:text-blue-600">Booking</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

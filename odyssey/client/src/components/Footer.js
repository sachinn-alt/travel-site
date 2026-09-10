import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center mt-8">
      <p>&copy; {new Date().getFullYear()} Odyssey Travel. All rights reserved.</p>
    </footer>
  );
};
export default Footer;
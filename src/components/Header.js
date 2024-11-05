import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Sign Language Platform</Link>
        <ul className="flex space-x-4">
          <li><Link to="/learn" className="hover:underline">Learn</Link></li>
          <li><Link to="/test" className="hover:underline">Test</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
          <li><Link to="/team" className="hover:underline">Team</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
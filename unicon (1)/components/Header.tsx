
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { APP_NAME } from '../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-dark-card text-light-text' : 'text-medium-text hover:bg-dark-card hover:text-light-text'
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
      isActive ? 'bg-dark-card text-light-text' : 'text-medium-text hover:bg-dark-card hover:text-light-text'
    }`;

  return (
    <nav className="bg-dark-bg/80 backdrop-blur-sm sticky top-0 z-50 border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              {APP_NAME}
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/generate" className={navLinkClass}>Generate</NavLink>
                <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
                <NavLink to="/pricing" className={navLinkClass}>Pricing</NavLink>
                <NavLink to="/about" className={navLinkClass}>About</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link to="/auth" className="text-medium-text hover:text-light-text px-3 py-2 rounded-md text-sm font-medium">Log in</Link>
              <Link to="/auth" className="ml-4 bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">Sign up</Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="bg-dark-card inline-flex items-center justify-center p-2 rounded-md text-medium-text hover:text-light-text hover:bg-dark-border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/generate" className={mobileNavLinkClass}>Generate</NavLink>
            <NavLink to="/dashboard" className={mobileNavLinkClass}>Dashboard</NavLink>
            <NavLink to="/pricing" className={mobileNavLinkClass}>Pricing</NavLink>
            <NavLink to="/about" className={mobileNavLinkClass}>About</NavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-dark-border">
            <div className="flex items-center px-5">
              <Link to="/auth" className="w-full text-center text-medium-text hover:text-light-text px-3 py-2 rounded-md text-base font-medium">Log in</Link>
              <Link to="/auth" className="w-full text-center ml-4 bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2 rounded-md text-base font-medium transition-colors">Sign up</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;

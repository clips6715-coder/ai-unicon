
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-bg border-t border-dark-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
             <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              {APP_NAME}
            </Link>
            <p className="mt-4 text-medium-text text-sm">AI-powered video creation at your fingertips.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-light-text tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/generate" className="text-base text-medium-text hover:text-light-text">Generate</Link></li>
              <li><Link to="/pricing" className="text-base text-medium-text hover:text-light-text">Pricing</Link></li>
              <li><Link to="/dashboard" className="text-base text-medium-text hover:text-light-text">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-light-text tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/about" className="text-base text-medium-text hover:text-light-text">About</Link></li>
              <li><Link to="/contact" className="text-base text-medium-text hover:text-light-text">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-light-text tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/help" className="text-base text-medium-text hover:text-light-text">Help Center</Link></li>
              <li><Link to="#" className="text-base text-medium-text hover:text-light-text">Terms of Service</Link></li>
              <li><Link to="#" className="text-base text-medium-text hover:text-light-text">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-dark-border pt-8 text-center">
          <p className="text-base text-medium-text">&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

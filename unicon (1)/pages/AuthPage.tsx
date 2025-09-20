
import React, { useState } from 'react';
import Button from '../components/Button';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-dark-card p-10 rounded-lg border border-dark-border">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-light-text">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>
        
        <div className="flex justify-center border-b border-dark-border">
            <button onClick={() => setIsLogin(true)} className={`px-4 py-2 text-sm font-medium ${isLogin ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-medium-text'}`}>
                Login
            </button>
            <button onClick={() => setIsLogin(false)} className={`px-4 py-2 text-sm font-medium ${!isLogin ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-medium-text'}`}>
                Sign Up
            </button>
        </div>

        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input id="name" name="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-dark-border bg-dark-bg placeholder-medium-text text-light-text rounded-t-md focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm" placeholder="Full Name" />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-dark-border bg-dark-bg placeholder-medium-text text-light-text ${isLogin ? 'rounded-t-md' : ''} focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm`} placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-dark-border bg-dark-bg placeholder-medium-text text-light-text rounded-b-md focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            {isLogin && (
              <div className="text-sm">
                <a href="#" className="font-medium text-brand-secondary hover:text-brand-primary">
                  Forgot your password?
                </a>
              </div>
            )}
          </div>

          <div>
            <Button type="submit" className="w-full">
              {isLogin ? 'Sign in' : 'Sign up'}
            </Button>
          </div>
        </form>

         <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-dark-card text-medium-text">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" className="w-full">
            Google
          </Button>
          <Button variant="secondary" className="w-full">
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

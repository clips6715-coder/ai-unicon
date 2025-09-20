
import React from 'react';
import Button from '../components/Button';

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="relative bg-dark-card shadow-xl rounded-lg border border-dark-border">
        <div className="grid lg:grid-cols-2">
          <div className="relative px-6 py-10 sm:px-10 lg:py-16">
            <h2 className="text-3xl font-extrabold text-light-text tracking-tight">Get in touch</h2>
            <p className="mt-2 text-lg text-medium-text">We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.</p>
          </div>
          <div className="px-6 py-10 sm:px-10 lg:py-16 bg-slate-900/50 rounded-r-lg">
            <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="full-name" className="sr-only">Full name</label>
                <input type="text" name="full-name" id="full-name" autoComplete="name" className="block w-full shadow-sm py-3 px-4 placeholder-medium-text bg-dark-bg border border-dark-border rounded-md focus:ring-brand-primary focus:border-brand-primary" placeholder="Full name" />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" className="block w-full shadow-sm py-3 px-4 placeholder-medium-text bg-dark-bg border border-dark-border rounded-md focus:ring-brand-primary focus:border-brand-primary" placeholder="Email" />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea id="message" name="message" rows={4} className="block w-full shadow-sm py-3 px-4 placeholder-medium-text bg-dark-bg border border-dark-border rounded-md focus:ring-brand-primary focus:border-brand-primary" placeholder="Message"></textarea>
              </div>
              <div>
                <Button type="submit" className="w-full">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

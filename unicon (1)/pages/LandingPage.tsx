
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { ICONS } from '../constants';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-primary text-white">
      {icon}
    </div>
    <h3 className="mt-5 text-lg font-medium text-light-text">{title}</h3>
    <p className="mt-2 text-base text-medium-text">{description}</p>
  </div>
);

const LandingPage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative text-center py-20 md:py-32 lg:py-40 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-slate-900 to-black animate-gradient-bg bg-[length:200%_200%]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-200">
            Create Explainer Videos with AI in Minutes
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-medium-text">
            Turn your scripts or ideas into engaging, professional videos. No experience required. Let our AI be your creative director.
          </p>
          <div className="mt-8">
            <Link to="/generate">
              <Button size="lg">
                Generate Your Video Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-3xl font-bold tracking-tight text-light-text sm:text-4xl">
            See It In Action
          </h2>
          <div className="mt-10 aspect-video w-full bg-dark-card rounded-lg border border-dark-border overflow-hidden shadow-2xl animate-subtle-pulse">
            <img src="https://picsum.photos/seed/demovideo/1280/720" alt="Demo video placeholder" className="w-full h-full object-cover" />
             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <div className="text-white scale-150">{ICONS.play}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-900/50 py-16 sm:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-light-text sm:text-4xl">Everything You Need to Create</h2>
            <p className="mt-4 text-lg text-medium-text">Powerful features that make video creation simple and fast.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={ICONS.ai}
              title="AI-Powered Scripting"
              description="Just provide a topic, and our AI will generate a compelling script, scene by scene."
            />
            <FeatureCard
              icon={ICONS.voice}
              title="Natural Voiceovers"
              description="Choose from a wide range of AI-generated voices in multiple languages and accents."
            />
            <FeatureCard
              icon={ICONS.styles}
              title="Multiple Video Styles"
              description="Select from various styles like whiteboard, 2D animation, or corporate to match your brand."
            />
          </div>
        </div>
      </section>
      
       {/* Pricing Preview Section */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-light-text sm:text-4xl">Simple, Transparent Pricing</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-medium-text">Choose a plan that works for you. Start for free.</p>
          <div className="mt-12 grid max-w-md mx-auto gap-8 md:max-w-3xl md:grid-cols-2 lg:max-w-5xl">
            <div className="bg-dark-card p-8 rounded-lg border border-dark-border">
              <h3 className="text-lg font-semibold text-light-text">Free</h3>
              <p className="mt-4 text-4xl font-bold text-light-text">$0<span className="text-lg font-medium text-medium-text">/mo</span></p>
              <p className="mt-4 text-medium-text">For individuals just getting started.</p>
              <Link to="/pricing" className="mt-6 block"><Button variant="secondary" className="w-full">Get Started</Button></Link>
            </div>
            <div className="bg-dark-card p-8 rounded-lg border-2 border-brand-primary relative">
               <p className="absolute top-0 -translate-y-1/2 bg-brand-primary px-3 py-0.5 text-sm font-semibold tracking-wide text-white rounded-full">Most Popular</p>
              <h3 className="text-lg font-semibold text-light-text">Pro</h3>
              <p className="mt-4 text-4xl font-bold text-light-text">$29<span className="text-lg font-medium text-medium-text">/mo</span></p>
              <p className="mt-4 text-medium-text">For professionals creating videos regularly.</p>
              <Link to="/pricing" className="mt-6 block"><Button className="w-full">Choose Plan</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

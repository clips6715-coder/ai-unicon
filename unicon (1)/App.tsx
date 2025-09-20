
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import GeneratorPage from './pages/GeneratorPage';
import PreviewPage from './pages/PreviewPage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import AuthPage from './pages/AuthPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HelpPage from './pages/HelpPage';

const App: React.FC = () => {
    return (
        <HashRouter>
            <MainContent />
        </HashRouter>
    );
};

const MainContent: React.FC = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/generate" element={<GeneratorPage />} />
                    <Route path="/preview/:id" element={<PreviewPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/help" element={<HelpPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;

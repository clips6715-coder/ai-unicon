
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const CheckIcon = () => (
    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const PricingCard: React.FC<{plan: any, isPopular: boolean}> = ({ plan, isPopular }) => (
    <div className={`bg-dark-card p-8 rounded-lg border ${isPopular ? 'border-2 border-brand-primary' : 'border-dark-border'} relative flex flex-col`}>
        {isPopular && <p className="absolute top-0 -translate-y-1/2 bg-brand-primary px-3 py-0.5 text-sm font-semibold tracking-wide text-white rounded-full">Most Popular</p>}
        <h3 className="text-lg font-semibold text-light-text">{plan.name}</h3>
        <p className="mt-4 text-medium-text">{plan.description}</p>
        <p className="mt-6 text-4xl font-bold text-light-text">${plan.price}<span className="text-lg font-medium text-medium-text">/mo</span></p>
        <Link to="/auth" className="mt-8">
            <Button variant={isPopular ? 'primary' : 'secondary'} className="w-full">
                {plan.cta}
            </Button>
        </Link>
        <ul className="mt-8 space-y-4 text-medium-text text-sm flex-grow">
            {plan.features.map((feature: string) => (
                <li key={feature} className="flex items-start">
                    <CheckIcon />
                    <span className="ml-3">{feature}</span>
                </li>
            ))}
        </ul>
    </div>
);

const PricingPage: React.FC = () => {
    const plans = [
        {
            name: "Free",
            description: "For individuals and hobbyists getting started.",
            price: 0,
            cta: "Start for Free",
            features: [
                "Up to 3 videos per month",
                "720p resolution",
                "Watermarked videos",
                "Limited voice options",
                "Standard support"
            ]
        },
        {
            name: "Pro",
            description: "For professionals and small businesses.",
            price: 29,
            cta: "Choose Pro",
            features: [
                "Up to 30 videos per month",
                "1080p resolution",
                "No watermarks",
                "Premium voice options",
                "Custom branding",
                "Priority support"
            ]
        },
        {
            name: "Team",
            description: "For collaborative teams and agencies.",
            price: 79,
            cta: "Contact Sales",
            features: [
                "Unlimited videos",
                "4K resolution",
                "All Pro features",
                "Team collaboration tools",
                "Multiple user seats",
                "Dedicated account manager"
            ]
        }
    ];

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-light-text sm:text-4xl">Find the Perfect Plan</h1>
                <p className="mt-4 text-lg text-medium-text">Start for free, and upgrade when you're ready.</p>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-3">
                <PricingCard plan={plans[0]} isPopular={false} />
                <PricingCard plan={plans[1]} isPopular={true} />
                <PricingCard plan={plans[2]} isPopular={false} />
            </div>
        </div>
    );
};

export default PricingPage;

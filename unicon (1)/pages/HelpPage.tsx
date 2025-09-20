
import React, { useState } from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-dark-border">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-4"
            >
                <span className="font-medium text-light-text">{question}</span>
                <span className="ml-6 h-7 flex items-center">
                    <svg className={`h-6 w-6 transform transition-transform ${isOpen ? '-rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            {isOpen && (
                <div className="pb-4 pr-12 text-medium-text">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};


const HelpPage: React.FC = () => {
    const faqs = [
        {
            question: "How does the AI video generation work?",
            answer: "You provide a text prompt or a full script. Our AI analyzes the text, breaks it down into scenes, generates relevant visuals, and pairs it with a natural-sounding voiceover in the style you select. The entire process is automated to save you time."
        },
        {
            question: "What kind of videos can I create?",
            answer: "Our platform is ideal for creating explainer videos, product demonstrations, educational content, social media marketing videos, and internal training materials. Any concept that can be explained with a script can be turned into a video."
        },
        {
            question: "Can I use my own voice or branding?",
            answer: "On our Pro plan, you can upload your own brand colors, logos, and fonts. The ability to upload custom voice tracks is a feature we are actively developing and will be available soon."
        },
        {
            question: "What is the maximum video length?",
            answer: "The maximum video length depends on your plan. The Free plan allows for videos up to 60 seconds, while our paid plans offer longer video durations. Please see our Pricing page for more details."
        },
        {
            question: "What happens if I'm not happy with the generated video?",
            answer: "We want you to be happy with your creation. You can easily regenerate the video with different settings or edit the script to refine the output. Each regeneration will use credits according to your plan."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-center text-3xl font-extrabold text-light-text sm:text-4xl">
                    Frequently Asked Questions
                </h2>
                <div className="mt-12 space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HelpPage;


import React from 'react';
import { APP_NAME } from '../constants';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-slate-900/50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">About Us</h2>
                <p className="mt-1 text-4xl font-extrabold text-light-text sm:text-5xl sm:tracking-tight lg:text-6xl">
                    Democratizing Video Creation
                </p>
                <p className="max-w-3xl mt-5 mx-auto text-xl text-medium-text">
                    At {APP_NAME}, our mission is to empower creators, marketers, and educators to share their stories and ideas through the power of video, without the traditional barriers of cost, time, and technical skill.
                </p>
            </div>
            <div className="mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-light-text">Our Story</h3>
                        <p className="mt-4 text-medium-text">
                            Founded by a team of AI researchers and video producers, {APP_NAME} was born from a simple observation: creating high-quality video content is hard. We believed that recent advancements in generative AI could fundamentally change that. We set out to build a platform that is not only powerful but also intuitive and accessible to everyone, regardless of their background.
                        </p>
                        <p className="mt-4 text-medium-text">
                            Today, we are proud to offer a state-of-the-art tool that transforms simple text into dynamic, engaging explainer videos, complete with professional voiceovers and visuals. We're just getting started on our journey to redefine the future of content creation.
                        </p>
                    </div>
                    <div className="w-full aspect-square rounded-lg overflow-hidden">
                        <img src="https://picsum.photos/seed/team/600/600" alt="Our Team" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AboutPage;

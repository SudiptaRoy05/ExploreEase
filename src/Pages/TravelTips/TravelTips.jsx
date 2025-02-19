import React from 'react';
import { Link } from 'react-router-dom';

export default function TravelTips() {
    const tips = [
        {
            title: "Packing Essentials for Your Trip",
            description: "Learn how to pack efficiently for your trip with our packing checklist and tips.",
            link: "/packing-essentials"
        },
        {
            title: "How to Travel Sustainably",
            description: "Discover ways to reduce your environmental footprint while traveling.",
            link: "/sustainable-travel"
        },
        {
            title: "Top Travel Safety Tips",
            description: "Stay safe on your travels with our expert safety advice for travelers.",
            link: "/travel-safety"
        },
        {
            title: "Money-Saving Travel Tips",
            description: "Save money on your next trip with these insider tips and tricks.",
            link: "/money-saving-tips"
        }
    ];

    return (
        <div className="w-10/12 mx-auto bg-white mt-6 rounded-lg py-12">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Travel Tips & Guides</h2>
                <p className="text-gray-600 mb-10">
                    Check out our essential tips and guides to make your next trip unforgettable!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {tips.map((tip, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">{tip.title}</h3>
                            <p className="text-gray-600 mb-4">{tip.description}</p>
                            <Link to={tip.link} className="text-blue-500 hover:underline">
                                Read more
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

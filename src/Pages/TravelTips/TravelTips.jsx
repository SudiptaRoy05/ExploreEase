import React from 'react';
import { Link } from 'react-router-dom';
import { FaSuitcase, FaLeaf, FaShieldAlt, FaMoneyBillWave } from 'react-icons/fa';

export default function TravelTips() {
    const tips = [
        {
            id: 1,
            title: "Packing Essentials for Your Trip",
            description: "Learn how to pack efficiently for your trip with our expert packing checklist and space-saving hacks.",
            link: "/packing-essentials",
            icon: <FaSuitcase className="text-3xl text-blue-500" />
        },
        {
            id: 2,
            title: "How to Travel Sustainably",
            description: "Discover eco-friendly ways to explore the world while minimizing your environmental footprint.",
            link: "/sustainable-travel",
            icon: <FaLeaf className="text-3xl text-green-500" />
        },
        {
            id: 3,
            title: "Top Travel Safety Tips",
            description: "Stay secure during your adventures with expert advice on safety, travel insurance, and emergency plans.",
            link: "/travel-safety",
            icon: <FaShieldAlt className="text-3xl text-yellow-500" />
        },
        {
            id: 4,
            title: "Money-Saving Travel Tips",
            description: "Travel smarter! Learn insider tips to save money on flights, accommodations, and activities.",
            link: "/money-saving-tips",
            icon: <FaMoneyBillWave className="text-3xl text-green-500" />
        }
    ];

    return (
        <div className="w-11/12 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white mt-6 rounded-lg">
            <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Travel Tips & Guides</h2>
                <p className="text-lg text-gray-600 mt-4">
                    Explore expert tips and tricks to make your next adventure stress-free and unforgettable!
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {tips.map((tip) => (
                    <div key={tip.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center gap-3 mb-4">
                            {tip.icon}
                            <h3 className="text-xl font-semibold text-gray-800">{tip.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-4">{tip.description}</p>
                        <Link to={`/tipsdetails/${tip.id}`} className="inline-block mt-2 text-blue-600 font-medium hover:text-blue-800 transition">
                            Read More →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

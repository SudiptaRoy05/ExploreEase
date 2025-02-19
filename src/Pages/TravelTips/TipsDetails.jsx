import React from 'react';
import { useParams } from 'react-router-dom';
import { FaSuitcase, FaLeaf, FaShieldAlt, FaMoneyBillWave } from 'react-icons/fa';

// Travel Tips Data
const tips = [
    {
        id: 1,
        title: "Packing Essentials for Your Trip",
        description: "Packing efficiently is crucial for any traveler. Start by creating a checklist to ensure you don’t forget essentials like travel documents, toiletries, and appropriate clothing. Rolling your clothes instead of folding them can save space and reduce wrinkles. Always carry a portable charger to keep your devices powered on the go. Packing cubes can help organize your suitcase better, making it easier to find what you need. Consider the weather at your destination and pack accordingly, but try to limit unnecessary items to keep your luggage light. If flying, keep essentials like medication, a change of clothes, and important travel documents in your carry-on in case of baggage delays. Remember, packing smartly can make your travel experience stress-free and enjoyable.",
        icon: <FaSuitcase className="text-4xl text-blue-500" />
    },
    {
        id: 2,
        title: "How to Travel Sustainably",
        description: "Sustainable travel is all about minimizing your environmental footprint while maximizing positive contributions to local communities. Start by choosing eco-friendly accommodations that implement green practices like energy conservation and waste reduction. Opt for public transportation, walking, or biking instead of taxis or rental cars to reduce carbon emissions. Bring reusable water bottles, bags, and utensils to cut down on plastic waste. Support local businesses by dining at local restaurants and purchasing handmade souvenirs. When visiting natural attractions, respect wildlife and follow 'Leave No Trace' principles. Simple actions, like taking shorter showers and turning off hotel room lights when leaving, also contribute to sustainability. By making conscious choices, you can help protect the planet while still enjoying incredible travel experiences.",
        icon: <FaLeaf className="text-4xl text-green-500" />
    },
    {
        id: 3,
        title: "Top Travel Safety Tips",
        description: "Safety should always be a priority when traveling. Start by researching your destination thoroughly, including local customs, emergency contacts, and any travel advisories. Keep digital and physical copies of important documents like your passport, visa, and insurance. Use anti-theft backpacks or money belts to protect valuables from pickpockets. Be cautious when using public Wi-Fi—consider using a VPN to secure your data. Stay aware of your surroundings and avoid poorly lit or isolated areas, especially at night. If traveling solo, always inform a friend or family member about your plans. Learn basic emergency phrases in the local language in case you need help. Lastly, trust your instincts—if something feels off, remove yourself from the situation. Taking these precautions can help ensure a smooth and secure journey.",
        icon: <FaShieldAlt className="text-4xl text-yellow-500" />
    },
    {
        id: 4,
        title: "Money-Saving Travel Tips",
        description: "Traveling on a budget is entirely possible with the right strategies. Start by booking flights in advance and using price comparison websites to find the best deals. Consider traveling during off-peak seasons to enjoy lower prices on accommodation and attractions. Instead of staying in expensive hotels, opt for budget-friendly hostels, guesthouses, or Airbnb. Use public transport instead of taxis to save money. Many destinations offer free or low-cost attractions, such as museums with free entry days or city walking tours. Cooking some of your meals instead of dining out for every meal can help cut down costs. Look for travel reward programs and credit card points that offer discounts on flights and hotels. With careful planning, you can enjoy amazing travel experiences without breaking the bank.",
        icon: <FaMoneyBillWave className="text-4xl text-green-500" />
    }
];

export default function TipsDetails() {
    const { id } = useParams();
    const tip = tips.find(tip => tip.id === parseInt(id));

    if (!tip) {
        return <p className="text-center text-red-500 text-lg">Tip not found!</p>;
    }

    return (
        <div className="w-11/12 max-w-4xl mx-auto py-12 px-6 sm:px-10 lg:px-12">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <div className="flex items-center gap-3 mb-6">
                    {tip.icon}
                    <h2 className="text-3xl font-extrabold text-gray-900">{tip.title}</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">{tip.description}</p>
            </div>
        </div>
    );
}

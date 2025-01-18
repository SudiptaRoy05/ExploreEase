
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Details() {

    const { id } = useParams();
    const [details, setDetails] = useState(null);
    
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/allpackage/details/${id}`);
                setDetails(response.data); 
            } catch (error) {
                console.error("Error fetching details:", error);
            }
        };

        if (id) {
            fetchDetails();
        }

    }, [id]);

    console.log(details)

    return (
        
        <div className="p-6 max-w-7xl mx-auto">
            {/* Gallery Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-center mb-6">Explore the Tour Locations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {details.images?.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Location ${index + 1}`}
                            className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                        />
                    ))}
                </div>
            </section>

            {/* About the Tour Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-center mb-6">About The Tour</h2>
                <p className="text-lg text-gray-700 mb-4">{details.description}</p>
            </section>

            {/* Tour Plan Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-center mb-6">Tour Plan</h2>
                <div className="space-y-4">
                    {details.plan?.map((day, index) => (
                        <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold mb-2">{`Day ${index + 1}: ${day.title}`}</h3>
                            <p className="text-gray-600">{day.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tour Guides Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-center mb-6">Meet Our Tour Guides</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {details.guides?.map((guide, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                            <img src={guide.image} alt={guide.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                            <h4 className="text-xl font-semibold mb-2">{guide.name}</h4>
                            <a href={`/guide/${guide.id}`} className="text-blue-500 hover:underline">View Profile</a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Booking Form Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-center mb-6">Book Your Tour</h2>
                <form className="space-y-6 bg-gray-100 p-8 rounded-lg shadow-md">
                    {/* Package Name */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Package Name</label>
                        <input
                            type="text"
                            value={details.name}
                            readOnly
                            className="w-full p-3 border rounded-lg bg-white text-gray-600"
                        />
                    </div>
                    {/* Tourist Name */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Tourist Name</label>
                        <input
                            type="text"
                            value="Tourist Name" // Replace with dynamic user data
                            readOnly
                            className="w-full p-3 border rounded-lg bg-white text-gray-600"
                        />
                    </div>
                    {/* Tourist Email */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Tourist Email</label>
                        <input
                            type="email"
                            value="tourist@example.com" // Replace with dynamic user data
                            readOnly
                            className="w-full p-3 border rounded-lg bg-white text-gray-600"
                        />
                    </div>
                    {/* Tour Date */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Tour Date</label>
                        <input
                            type="date"
                            className="w-full p-3 border rounded-lg bg-white text-gray-600"
                        />
                    </div>
                    {/* Tour Guide */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Tour Guide</label>
                        <select className="w-full p-3 border rounded-lg bg-white text-gray-600">
                            {details.guides?.map((guide, index) => (
                                <option key={index} value={guide.name}>
                                    {guide.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Submit Button */}
                    <div>
                        <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                            Book Now
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

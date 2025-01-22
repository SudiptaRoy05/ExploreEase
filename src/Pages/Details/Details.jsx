import { useEffect, useRef, useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

import lightGallery from "lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export default function Details() {

    const axiosSecure = useAxiosSecure();
    const galleryRef = useRef(null);
    const { user } = useContext(AuthContext);
    const pkgDetail = useLoaderData();
    const [tourDate, setTourDate] = useState(null);

    const { data: guides = [], refetch } = useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/allguide?role=tourguide');
                return res.data;
            } catch (err) {
                throw new Error(err.response?.data?.message || 'Failed to fetch guides');
            }
        },
    });


    console.log(guides)

    useEffect(() => {
        const lg = lightGallery(galleryRef.current, {
            plugins: [lgThumbnail, lgZoom],
            speed: 500,
        });

        return () => {
            if (lg) {
                lg.destroy();
            }
        };
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto bg-gradient-to-b from-gray-100 to-white">
            {/* Gallery Section */}
            <section className="mb-12">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">{pkgDetail.name}</h2>
                <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {pkgDetail.image?.map((image, index) => (
                        <a
                            href={image?.imageUrl}
                            key={index}
                            data-lg-size="1600-1067"
                            className="gallery-item"
                        >
                            <img
                                src={image?.imageUrl}
                                alt={`Location ${index + 1}`}
                                className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                            />
                        </a>
                    ))}
                </div>
            </section>

            {/* About the Tour Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">About The Tour</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{pkgDetail.description}</p>
            </section>

            {/* Tour Plan Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Tour Plan</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    {pkgDetail.tourPlan || "Tour plan details are not available."}
                </p>
            </section>

            {/* Booking Form Section */}
            {/* Booking Form Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Book Your Tour</h2>
                <form className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                    <div>
                        <label className="block text-lg font-semibold mb-2">Package Name</label>
                        <input
                            type="text"
                            value={pkgDetail.name}
                            readOnly
                            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Tourist Name</label>
                        <input
                            type="text"
                            value={user?.displayName || "Tourist Name"}
                            readOnly
                            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Tourist Email</label>
                        <input
                            type="email"
                            value={user?.email || "tourist@example.com"}
                            readOnly
                            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Tour Date</label>
                        <DatePicker
                            selected={tourDate}
                            onChange={(date) => setTourDate(date)}
                            dateFormat="yyyy/MM/dd"
                            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Tourist Image</label>
                        <input
                            type="text"
                            value={user?.photoURL || "No image available"}
                            readOnly
                            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Price</label>
                        <input
                            type="text"
                            value={`$${pkgDetail.price}`}
                            readOnly
                            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
                        />
                    </div>

                    {/* Guide Dropdown */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Select Guide</label>
                        <select
                            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select a guide
                            </option>
                            {guides.map((guide) => (
                                <option key={guide._id} value={guide._id}>
                                    {guide.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Book Now
                        </button>
                    </div>
                </form>
            </section>

        </div>
    );
}

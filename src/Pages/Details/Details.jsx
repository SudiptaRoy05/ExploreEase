import { useEffect, useRef, useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
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
import Swal from "sweetalert2";

export default function Details() {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const galleryRef = useRef(null);
    const { user } = useContext(AuthContext);
    const pkgDetail = useLoaderData();
    const [tourDate, setTourDate] = useState(null);
    const [selectedGuide, setSelectedGuide] = useState(null);

    const { data: guides = [], refetch } = useQuery({
        queryKey: ["guides"],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get("/allguide?role=tourguide");
                return res.data;
            } catch (err) {
                throw new Error(
                    err.response?.data?.message || "Failed to fetch guides"
                );
            }
        },
    });

    // console.log(guides)

    const handleBooking = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const touristName = form.get("touristName");
        const touristEmail = form.get("touristEmail");
        const tourDate = form.get("tourDate");
        const guideEmail = selectedGuide?.email;
        const guideName = selectedGuide?.name;
        const price = form.get("price");
        const status = "pending";
        const packageName = pkgDetail.name;
        const packageId = pkgDetail._id; 

        const bookingData = {
            packageName,
            packageId,
            touristName,
            touristEmail,
            tourDate,
            guideEmail,
            guideName,
            price,
            status,
        };

        console.log("Booking Data:", bookingData);

        try {
            const { data } = await axiosSecure.post('http://localhost:5000/mybooking', bookingData);

            if (data?.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Booking Successful",
                    text: "Your booking has been confirmed!",
                });
                navigate("/dashboard/mybooking");
            } else {
                throw new Error("Booking failed. Please try again.");
            }
        } catch (error) {
            console.error("Error booking tour:", error);
            Swal.fire({
                icon: "error",
                title: "Booking Failed",
                text: error.message || "Something went wrong. Please try again later.",
            });
        }
    };

    const handleGuideChange = (e) => {
        const guideId = e.target.value;
        const selected = guides.find((guide) => guide._id === guideId);
        setSelectedGuide(selected);
    };

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
        <div className="p-6 max-w-7xl mx-auto bg-gradient-to-b from-blue-50 via-white to-gray-50 min-h-screen">
            {/* Tour Package Header */}
            <header className="mb-16 text-center">
                <h1 className="text-5xl font-extrabold text-gray-800">
                    {pkgDetail.name}
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    Explore the beauty of this destination with an unforgettable journey.
                </p>
            </header>

            {/* Gallery Section */}
            <section className="mb-16">
                <h2 className="text-4xl font-semibold text-center text-gray-800 mb-10">
                    Tour Highlights
                </h2>
                <div
                    ref={galleryRef}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                >
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
                                className="w-full h-64 object-cover rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
                            />
                        </a>
                    ))}
                </div>
            </section>

            {/* About the Tour Section */}
            <section className="mb-16">
                <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
                    About The Tour
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
                    {pkgDetail.description || "No description available."}
                </p>
            </section>

            {/* Tour Plan Section */}
            <section className="mb-16">
                <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
                    Tour Plan
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
                    {pkgDetail.tourPlan || "Tour plan details are not available."}
                </p>
            </section>

            {/* Tour Guides Section */}
            <section className="mb-16">
                <h2 className="text-4xl font-semibold text-center text-gray-800 mb-10">
                    Meet Our Tour Guides
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {guides.map((guide) => (
                        <div
                            key={guide._id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => window.location.href = `/guide/${guide._id}`}
                        >
                            <img
                                src={guide?.image}
                                alt={guide.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-2xl font-semibold text-gray-800">{guide.name}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Booking Form Section */}
            <section className="mb-16">
                <h2 className="text-4xl font-semibold text-center text-gray-800 mb-10">
                    Book Your Tour
                </h2>
                <form onSubmit={handleBooking} className="space-y-8 bg-white p-10 rounded-lg shadow-xl max-w-3xl mx-auto">
                    <div>
                        <label className="block text-lg font-semibold mb-2">Package Name</label>
                        <input
                            type="text"
                            name="packageName"
                            defaultValue={pkgDetail.name}
                            readOnly
                            className="w-full p-4 border rounded-lg bg-gray-100 text-gray-700 shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Tourist Name</label>
                        <input
                            type="text"
                            name="touristName"
                            defaultValue={user?.displayName || "Tourist Name"}
                            readOnly
                            className="w-full p-4 border rounded-lg bg-gray-100 text-gray-700 shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Tourist Email</label>
                        <input
                            type="email"
                            name="touristEmail"
                            defaultValue={user?.email || "tourist@example.com"}
                            readOnly
                            className="w-full p-4 border rounded-lg bg-gray-100 text-gray-700 shadow-sm"
                        />
                    </div>

                    {/* Grid Layout for Tour Date and Select Guide */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-semibold mb-2">Tour Date</label>
                            <DatePicker
                                selected={tourDate}
                                onChange={(date) => setTourDate(date)}
                                dateFormat="yyyy/MM/dd"
                                className="w-full p-4 border rounded-lg bg-gray-100 text-gray-700 shadow-sm"
                            />
                            <input
                                type="hidden"
                                name="tourDate"
                                value={tourDate ? tourDate.toISOString().split('T')[0] : ""}
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-2">Select Guide</label>
                            <select
                                className="w-full p-4 border rounded-lg bg-gray-100 text-gray-700 shadow-sm"
                                defaultValue=""
                                onChange={handleGuideChange}
                                name="guideId"
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
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Tourist Image</label>
                        <input
                            type="text"
                            name="touristImage"
                            value={user?.photoURL || "No image available"}
                            readOnly
                            className="w-full p-4 border rounded-lg bg-gray-100 text-gray-700 shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Price</label>
                        <input
                            type="text"
                            name="price"
                            value={`${pkgDetail.price}`}
                            readOnly
                            className="w-full p-4 border rounded-lg bg-gray-100 text-gray-700 shadow-sm"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                        >
                            Book Now
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

import { useEffect, useRef, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

// Import LightGallery and plugins
import lightGallery from "lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

// Import LightGallery styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";

export default function Details() {
    const galleryRef = useRef(null); // Ref for the gallery container
    const { user } = useContext(AuthContext);
    const pkgDetail = useLoaderData(); // Package details

    useEffect(() => {
        // Initialize LightGallery
        const lg = lightGallery(galleryRef.current, {
            plugins: [lgThumbnail, lgZoom],
            speed: 500,
            licenseKey: "your-valid-license-key", // Replace with your LightGallery license key
        });

        // Cleanup function to destroy LightGallery
        return () => {
            if (lg) {
                lg.destroy();
            }
        };
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Gallery Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-center mb-6">{pkgDetail.name}</h2>
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
                <h2 className="text-3xl font-semibold text-center mb-6">About The Tour</h2>
                <p className="text-lg text-gray-700 mb-4">{pkgDetail.description}</p>
            </section>

            {/* Tour Plan Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-center mb-6">Tour Plan</h2>
                <p className="text-lg text-gray-700 mb-4">
                    {pkgDetail.tourPlan || "Tour plan details are not available."}
                </p>
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
                            value={pkgDetail.name}
                            readOnly
                            className="w-full p-3 border rounded-lg bg-white text-gray-600"
                        />
                    </div>
                    {/* Tourist Name */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Tourist Name</label>
                        <input
                            type="text"
                            value={user?.displayName || "Tourist Name"}
                            readOnly
                            className="w-full p-3 border rounded-lg bg-white text-gray-600"
                        />
                    </div>
                    {/* Tourist Email */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Tourist Email</label>
                        <input
                            type="email"
                            value={user?.email || "tourist@example.com"}
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
                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                        >
                            Book Now
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

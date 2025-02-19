function Location() {
    const hotelLocation = { lat: 23.7561, lng: 90.3872 }; // Coordinates for Firmgate, Dhaka, Bangladesh
    const zoomLevel = 16; // Closer view of the location

    return (
        <div className="w-10/12 mx-auto bg-white p-3 mt-6 rounded-lg">
            <div className="text-center my-10 font-sans">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Our Location</h2>
                <p className="text-gray-600 text-base md:text-lg mb-5">
                    Welcome to ExploreEase. Below is our location on the map:
                </p>
                <div className="w-full max-w-full mx-auto h-[400px] rounded-lg overflow-hidden shadow-lg border border-gray-300">
                    <iframe
                        className="w-full h-full border-none"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${hotelLocation.lng - 0.01
                            },${hotelLocation.lat - 0.01},${hotelLocation.lng + 0.01},${hotelLocation.lat + 0.01
                            }&layer=mapnik&marker=${hotelLocation.lat},${hotelLocation.lng}&zoom=${zoomLevel}`}
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default Location

export default function Card({ pkg }) {
    const { name, images, category, price } = pkg;

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-gradient-to-r from-blue-500 to-green-400 max-w-sm md:max-w-md mx-auto transition-transform transform hover:scale-105">
            {/* Photo */}
            {images && images.length > 0 ? (
                <img
                    src={images[0]} // Display the first image in the array
                    alt={name}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
            ) : (
                <div className="w-full h-48 bg-gray-200 rounded-t-lg mb-4 flex items-center justify-center">
                    <p className="text-gray-500">No Image Available</p>
                </div>
            )}

            {/* Tour Type */}
            <p className="text-sm text-blue-600 font-semibold uppercase mb-2">{category}</p>

            {/* Trip Title */}
            <h4 className="text-xl font-bold mb-2 text-gray-800">{name}</h4>

            {/* Price */}
            <p className="text-lg text-gray-700 font-medium mb-4">$ {price}</p>

            {/* View Details Button */}
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            >
                View Details
            </button>
        </div>
    );
}

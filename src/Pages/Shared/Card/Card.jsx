import { Link } from "react-router-dom";

export default function Card({ pkg }) {
    const { _id, name, image, duration, destination, category, price } = pkg;

    return (
        <div className="group relative overflow-hidden rounded-xl bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 w-72 flex flex-col">
            {/* Photo */}
            <div className="relative w-full h-44 overflow-hidden">
                {image && image.length > 0 ? (
                    <img
                        src={image[0]?.imageUrl}
                        alt={name}
                        className="w-full h-full object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="bg-gray-200 flex items-center justify-center h-full">
                        <p className="text-gray-500 text-sm">No Image Available</p>
                    </div>
                )}
                <span className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-green-400 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                    {category}
                </span>
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-1.5 text-left flex-grow"> {/* Allow content area to grow */}
                <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
                <p className="text-base text-gray-700 font-medium">
                    <span className="font-semibold text-blue-500">Price:</span> $ {price}
                </p>
                <p className="text-xs text-gray-600">
                    <span className="font-medium text-green-500">Duration:</span> {duration} Days
                </p>
                <p className="text-xs text-gray-600">
                    <span className="font-medium text-indigo-500">Destination:</span> {destination}
                </p>
            </div>

            {/* Button */}
            <div className="px-4 pb-4 mt-auto">
                <Link
                    to={`/details/${_id}`}
                    className="block w-full text-left bg-gradient-to-r from-blue-500 to-green-400 text-white font-medium py-2 rounded-md shadow-md hover:from-blue-600 hover:to-green-500 hover:shadow-lg transition-all duration-300 text-sm px-4"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}

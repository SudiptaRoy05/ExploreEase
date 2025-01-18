import { Link } from "react-router-dom";

export default function Card({ pkg }) {
    const { _id, name, image, duration, destination, category, price } = pkg;


    return (
        <div className="card bg-base-100 shadow-xl border border-gradient-to-r from-blue-500 to-green-400">
            {/* Photo */}
            {image && image.length > 0 ? (
                <figure>
                    <img
                        src={image[0]?.imageUrl}
                        alt={name}
                        className="w-full h-48 object-cover"
                    />
                </figure>
            ) : (
                <figure className="bg-gray-200 flex items-center justify-center h-48">
                    <p className="text-gray-500">No Image Available</p>
                </figure>
            )}
            <div className="card-body">
                <p className="badge bg-gradient-to-r from-blue-500 to-green-400 text-white px-4 py-1 rounded-full">
                    {category}
                </p>
                <h4 className="card-title text-lg font-bold">{name}</h4>
                <p className="text-lg text-gray-700 font-medium">Price: $ {price}</p>
                <p className="text-sm text-gray-600">Duration: {duration} Days</p>
                <p className="text-sm text-gray-600">Destination: {destination}</p>
                <div className="card-actions justify-end">
                    <Link
                        to={`/details/${_id}`}
                        className="btn bg-gradient-to-r from-blue-500 to-green-400 text-white hover:from-blue-600 hover:to-green-500 transition"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

import { Link } from "react-router-dom";

export default function StoryCard({ story }) {
    return (
        <div className="group relative overflow-hidden rounded-lg bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 w-64">
            {/* Image */}
            <div className="relative w-full h-36 overflow-hidden">
                <img
                    src={story.images[0]?.imageUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                    alt={story.title}
                    className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Content */}
            <div className="p-3 space-y-1.5 text-left">
                <h2 className="text-base font-semibold text-gray-800">{story.title}</h2>
                <p className="text-xs text-gray-600">{story.content.slice(0, 80)}...</p>

                {/* User Info & Read More Button */}
                <div className="flex items-center justify-between mt-2">
                    {/* User Details */}
                    <div className="flex items-center space-x-2">
                        <img
                            src={story.user.image}
                            alt={story.user.name}
                            className="w-6 h-6 rounded-full border border-gray-300"
                        />
                        <span className="text-xs text-gray-600">{story.user.name}</span>
                    </div>

                    {/* New Button */}
                    <Link to={`/community/details/${story._id}`}>
                        <button className="text-xs font-medium text-blue-500 hover:underline">
                            Read More →
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

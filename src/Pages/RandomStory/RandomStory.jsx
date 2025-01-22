import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StoryCard from "../Community/StoryCard";
import { Link } from "react-router-dom";

export default function RandomStory() {
    const { data: stories = [] } = useQuery({
        queryKey: ['story'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/stories');
            console.log(res.data);
            return res.data;
        },
    });

    return (
        <div className="p-6 sm:p-12 bg-gray-50">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">Featured Stories</h2>
                <div className="space-x-4">
                    <Link to="/community">
                        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold rounded-lg shadow hover:scale-105 transition-transform">
                            All Stories
                        </button>
                    </Link>
                    <Link to="/dashboard/addstories">
                        <button className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-red-400 text-white font-semibold rounded-lg shadow hover:scale-105 transition-transform">
                            Add Story
                        </button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    stories.map(story => (
                        <StoryCard key={story._id} story={story} />
                    ))
                }
            </div>
        </div>
    );
}

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StoryCard from "../Community/StoryCard";
import { Link } from "react-router-dom";

export default function RandomStory() {
    const { data: stories = [] } = useQuery({
        queryKey: ['story'],
        queryFn: async () => {
            const res = await axios.get('https://tourmanagement-puce.vercel.app/stories');
            //console.log(res.data);
            return res.data;
        },
    });

    return (
        <div className="w-11/12 sm:w-10/12 mx-auto p-4 sm:p-8 md:p-12 bg-white rounded-lg shadow-lg">
            <div className="flex flex-wrap justify-between items-center mb-6 sm:mb-8 gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Featured Stories</h2>
                <div className="flex gap-3 sm:gap-4">
                    <Link to="/community">
                        <button className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold rounded-lg shadow hover:scale-105 transition-transform">
                            All Stories
                        </button>
                    </Link>
                    <Link to="/dashboard/addstories">
                        <button className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-500 to-red-400 text-white font-semibold rounded-lg shadow hover:scale-105 transition-transform">
                            Add Story
                        </button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {stories.map(story => (
                    <StoryCard key={story._id} story={story} />
                ))}
            </div>
        </div>
    );
}

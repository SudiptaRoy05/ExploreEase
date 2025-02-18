import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StoryCard from "./StoryCard";

const Stories = () => {
    const { data: stories = [] } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const res = await axios.get('https://tourmanagement-puce.vercel.app/allstories');
            return res.data;
        },
    });

    return (
        <div className="mx-auto w-10/12 my-6">
            <h1 className="text-4xl font-bold text-center mb-4 text-blue-600">Community Stories</h1>
            <p className="text-lg text-center text-gray-700 mb-8">
                Welcome to the community stories page! Explore the wonderful experiences shared by our community members.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {
                    stories.map(story => (
                        <StoryCard key={story._id} story={story} />
                    ))
                }
            </div>
        </div>
    );
};

export default Stories;

import Swal from "sweetalert2";
import { useState } from 'react';
import { useLoaderData } from "react-router-dom";
import Rating from "react-rating-stars-component";
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";

export default function GuideDetails() {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const guideData = useLoaderData();
    const [rating, setRating] = useState(0);


    const handleReview = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const comments = form.get("comment");
        const ratings = rating;
        const name = user?.displayName;
        const guideId = guideData._id;

        const reviewData = {
            comments,
            ratings,
            guideId,
            name,
        };

        try {
            const { data } = await axiosSecure.post("/review", reviewData);
            if (data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Review Submitted",
                    text: "Your review has been successfully submitted!",
                    timer: 3000,
                    showConfirmButton: false,
                });

                // Reset form and rating state
                e.target.reset();
                setRating(0);

                // Refetch the reviews to update the list
                refetch();
            } else {
                throw new Error("Failed to submit review.");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: "There was an error submitting your review. Please try again.",
                confirmButtonText: "OK",
            });
            console.error("Error submitting review:", error);
        }
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const { data: reviews, refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review/${guideData._id}`);
            //console.log(res.data)
            return res.data;
        },
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-12">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-blue-500 to-green-400 p-6 text-center text-white">
                    <img
                        src={guideData.image}
                        alt={guideData.name}
                        className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg mb-4"
                    />
                    <h1 className="text-3xl font-bold">{guideData.name}</h1>
                    <h2 className="text-lg font-medium capitalize">{guideData.role}</h2>
                </div>

                <div className="p-8 border-t">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Reviews & Ratings</h3>
                    <div className="space-y-6">
                        {reviews?.map((review) => (
                            <div
                                key={review._id}
                                className="p-6 bg-gradient-to-br from-gray-50 to-blue-100 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:space-x-6"
                            >
                                {/* Reviewer Info */}
                                <div className="sm:w-1/4">
                                    <h4 className="text-lg font-semibold text-blue-600">{review.name}</h4>
                                    <Rating
                                        count={5}
                                        size={20}
                                        value={review.ratings}
                                        activeColor="#ffd700"
                                        isHalf={true}
                                        edit={false}
                                    />
                                </div>

                                {/* Review Comments */}
                                <p className="mt-4 sm:mt-0 sm:w-3/4 text-gray-700 text-sm leading-relaxed">
                                    {review.comments}
                                </p>
                            </div>
                        ))}

                        {reviews?.length === 0 && (
                            <p className="text-gray-600 text-center">No reviews yet. Be the first to leave one!</p>
                        )}
                    </div>
                </div>

                <div className="p-8 border-t bg-gray-50">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Leave a Review</h3>
                    <form onSubmit={handleReview} className="space-y-4">
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                readOnly
                                value={user?.displayName || 'Anonymous'}
                                placeholder="Your Name"
                                className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Comment</label>
                            <textarea
                                placeholder="Your Review"
                                name='comment'
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="3"
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Rating</label>
                            <Rating
                                count={5}
                                size={24}
                                activeColor="#ffd700"
                                isHalf={true}
                                onChange={handleRatingChange}
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn px-6 py-2 bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold rounded-lg shadow hover:scale-105 transition-transform"
                            >
                                Submit Review
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

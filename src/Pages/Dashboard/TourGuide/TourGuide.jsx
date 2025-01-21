import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

function TourGuide() {
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const application = Object.fromEntries(form.entries());
        const applicationData = {
            ...application,
            name: user?.displayName || "Anonymous User",
            email: user?.email || "No email provided",
            image: user?.photoURL || "",
        };

        try {
            const { data } = await axios.post('http://localhost:5000/application', applicationData);

            if (data.insertedId) {
                Swal.fire({
                    title: 'Application Submitted!',
                    text: `Your application has been successfully submitted. Your Application ID is: ${data.insertedId}`,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
            } else {
                Swal.fire({
                    title: 'Submission Failed!',
                    text: 'There was an issue submitting your application. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while submitting your application. Please try again.',
                icon: 'error',
                confirmButtonText: 'Retry',
            });
        }
    };


    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Join as a Tour Guide</h1>
            <div className="flex items-center mb-6 gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
                {user?.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt="User Profile"
                        className="w-16 h-16 rounded-full border-2 border-blue-500"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold">
                        {user?.displayName ? user.displayName[0] : "A"}
                    </div>
                )}
                <div>
                    <p className="text-lg font-semibold text-gray-800">{user?.displayName || "Anonymous User"}</p>
                    <p className="text-sm text-gray-600">{user?.email || "No email provided"}</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Application Title */}
                <div>
                    <label className="block text-lg font-semibold mb-2">Application Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter application title"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Reason */}
                <div>
                    <label className="block text-lg font-semibold mb-2">Why do you want to be a Tour Guide?</label>
                    <textarea
                        name="reason"
                        placeholder="Write your reason here..."
                        className="textarea textarea-bordered w-full h-24"
                        required
                    ></textarea>
                </div>

                {/* CV Link */}
                <div>
                    <label className="block text-lg font-semibold mb-2">CV Link</label>
                    <input
                        type="url"
                        name="cvLink"
                        placeholder="Enter CV link (e.g., Google Drive or Dropbox URL)"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full py-2 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-green-400 hover:to-blue-500 transition-all shadow-lg rounded-lg"
                    >
                        Submit Application
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TourGuide;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function ManageCandidate() {
    const axiosSecure = useAxiosSecure();
    const { data: applications = [], refetch } = useQuery({
        queryKey: ["application"],
        queryFn: async () => {
            const res = await axiosSecure("/application");
            return res.data;
        },
    });

    const handleRole = async (email) => {
        try {
            console.log(email);
            const role = "tourguide";

            const confirmation = await Swal.fire({
                title: "Are you sure?",
                text: `Do you want to set this user as a ${role}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, update it!",
            });

            if (confirmation.isConfirmed) {
                const res = await axiosSecure.patch(`/users/${email}`, { role });

                // const delRes = await axiosSecure.delete(`/application/${email}`)
                Swal.fire(
                    "Updated!",
                    `The user's role has been updated to ${role}.`,
                    "success"
                );
                refetch()
            }
        } catch (error) {
            console.error("Error updating role:", error);
            Swal.fire("Error", "An error occurred while updating the role. Please try again.", "error");
        }
    };

    const handleReject = async (email) => {
        const confirmation = await Swal.fire({
            title: "Are you sure?",
            text: `Do you want to reject the application`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject it!",
        });

        if (confirmation.isConfirmed) {
            const delRes = await axiosSecure.delete(`/application/${email}`)
            Swal.fire(
                "Rejected!",
                `The user's application has been deleted.`,
                "success"
            );
            refetch()
        }
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Manage Candidates
            </h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">#</th>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">CV Link</th>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {applications.map((application, idx) => (
                            <tr
                                key={application._id}
                                className="hover:bg-gray-50 transition duration-200"
                            >
                                <td className="px-6 py-4 text-sm text-gray-700">{idx + 1}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <img
                                            src={application?.image || "/default-avatar.png"}
                                            alt={application?.name || "Candidate Image"}
                                            className="w-10 h-10 rounded-full object-cover border"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">{application?.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{application?.email}</td>
                                <td className="px-6 py-4 text-sm text-blue-500 underline">
                                    <a
                                        href={application?.cvLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View CV
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleRole(application.email)}
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 active:bg-green-700 transition duration-200"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleReject(application.email)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 active:bg-red-700 transition duration-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

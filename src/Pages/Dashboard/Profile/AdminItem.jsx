import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaMoneyCheckAlt, FaUserFriends, FaBox, FaBookOpen, FaUsers } from "react-icons/fa";
import AllUser from "./AllUser";
import ManageCandidate from "./ManageCandidate";
import Loading from "../../../Components/Loading";

export default function AdminItem() {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["adminStats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/totals");
            return res.data;
        },
    });

    if (isLoading) return <div className="flex justify-center items-center h-60"><Loading /></div>;
    if (isError) return <div className="flex justify-center items-center h-60 text-red-500">Error fetching data</div>;

    const { totalPayment, totalTourGuides, totalPackages, totalClients, totalStories } = data;

    return (
        <div className=" min-h-screen">
            <div className="rounded-lg shadow-xl  mb-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Dashboard Stats</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Total Payment */}
                    <div className="stat bg-gradient-to-r from-teal-400 to-blue-500 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                        <div className="stat-figure text-white">
                            <FaMoneyCheckAlt size={40} />
                        </div>
                        <div className="stat-title text-lg font-semibold text-white">Total Payment</div>
                        <div className="stat-value text-white text-2xl">${totalPayment?.toLocaleString()}</div>
                        <div className="stat-desc text-gray-100">Revenue collected</div>
                    </div>

                    {/* Total Tour Guides */}
                    <div className="stat bg-gradient-to-r from-green-400 to-teal-500 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                        <div className="stat-figure text-white">
                            <FaUserFriends size={40} />
                        </div>
                        <div className="stat-title text-lg font-semibold text-white">Total Tour Guides</div>
                        <div className="stat-value text-white text-2xl">{totalTourGuides}</div>
                        <div className="stat-desc text-gray-100">Guides registered</div>
                    </div>

                    {/* Total Packages */}
                    <div className="stat bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                        <div className="stat-figure text-white">
                            <FaBox size={40} />
                        </div>
                        <div className="stat-title text-lg font-semibold text-white">Total Packages</div>
                        <div className="stat-value text-white text-2xl">{totalPackages}</div>
                        <div className="stat-desc text-gray-100">Active packages</div>
                    </div>

                    {/* Total Clients */}
                    <div className="stat bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                        <div className="stat-figure text-white">
                            <FaUsers size={40} />
                        </div>
                        <div className="stat-title text-lg font-semibold text-white">Total Clients</div>
                        <div className="stat-value text-white text-2xl">{totalClients}</div>
                        <div className="stat-desc text-gray-100">Clients registered</div>
                    </div>

                    {/* Total Stories */}
                    <div className="stat bg-gradient-to-r from-red-400 to-pink-500 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                        <div className="stat-figure text-white">
                            <FaBookOpen size={40} />
                        </div>
                        <div className="stat-title text-lg font-semibold text-white">Total Stories</div>
                        <div className="stat-value text-white text-2xl">{totalStories}</div>
                        <div className="stat-desc text-gray-100">Stories shared</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-800 shadow-lg rounded-lg p-6">
                    <AllUser />
                </div>

                <div className="shadow-lg rounded-lg p-6">
                    <ManageCandidate />
                </div>
            </div>
        </div>
    );
}

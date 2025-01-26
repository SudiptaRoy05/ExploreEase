import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaMoneyCheckAlt, FaUserFriends, FaBox, FaBookOpen, FaUsers } from "react-icons/fa";
import AllUser from "./AllUser";
import ManageCandidate from "./ManageCandidate";

export default function AdminItem() {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["adminStats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/totals");
            return res.data;
        },
    });

    if (isLoading) return <div className="flex justify-center items-center h-60">Loading...</div>;
    if (isError) return <div className="flex justify-center items-center h-60 text-red-500">Error fetching data</div>;

    const { totalPayment, totalTourGuides, totalPackages, totalClients, totalStories } = data;

    return (
        <div>
            <div className="p-6 max-w-6xl mx-auto bg-gradient-to-b from-gray-100 to-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Dashboard Stats</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Total Payment */}
                    <div className="stat bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                        <div className="stat-figure text-primary">
                            <FaMoneyCheckAlt size={40} className="text-blue-500" />
                        </div>
                        <div className="stat-title text-lg font-semibold">Total Payment</div>
                        <div className="stat-value text-primary text-2xl">${totalPayment?.toLocaleString()}</div>
                        <div className="stat-desc text-gray-500">Revenue collected</div>
                    </div>

                    {/* Total Tour Guides */}
                    <div className="stat bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                        <div className="stat-figure text-secondary">
                            <FaUserFriends size={40} className="text-green-500" />
                        </div>
                        <div className="stat-title text-lg font-semibold">Total Tour Guides</div>
                        <div className="stat-value text-secondary text-2xl">{totalTourGuides}</div>
                        <div className="stat-desc text-gray-500">Guides registered</div>
                    </div>

                    {/* Total Packages */}
                    <div className="stat bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                        <div className="stat-figure text-accent">
                            <FaBox size={40} className="text-yellow-500" />
                        </div>
                        <div className="stat-title text-lg font-semibold">Total Packages</div>
                        <div className="stat-value text-accent text-2xl">{totalPackages}</div>
                        <div className="stat-desc text-gray-500">Active packages</div>
                    </div>

                    {/* Total Clients */}
                    <div className="stat bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                        <div className="stat-figure text-info">
                            <FaUsers size={40} className="text-purple-500" />
                        </div>
                        <div className="stat-title text-lg font-semibold">Total Clients</div>
                        <div className="stat-value text-info text-2xl">{totalClients}</div>
                        <div className="stat-desc text-gray-500">Clients registered</div>
                    </div>

                    {/* Total Stories */}
                    <div className="stat bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                        <div className="stat-figure text-danger">
                            <FaBookOpen size={40} className="text-red-500" />
                        </div>
                        <div className="stat-title text-lg font-semibold">Total Stories</div>
                        <div className="stat-value text-danger text-2xl">{totalStories}</div>
                        <div className="stat-desc text-gray-500">Stories shared</div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <AllUser></AllUser>
                </div>
            </div>
            <div>
                <div>
                    <ManageCandidate></ManageCandidate>
                </div>
            </div>
        </div>
    );
}

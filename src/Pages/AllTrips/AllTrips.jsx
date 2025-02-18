import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "../Shared/Card/Card";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export default function AllTrips() {
    const axiosSecure = useAxiosSecure();
    const { data: packages = [] } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allpackage');
            //console.log(res.data);
            return res.data;
        },
    });

    return (
        <div className="bg-gray-100 p-6 w-10/12 mx-auto ">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">All Packages</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {packages?.map(pkg => (
                    <Card key={pkg._id} pkg={pkg} />
                ))}
            </div>
        </div>
    );
}

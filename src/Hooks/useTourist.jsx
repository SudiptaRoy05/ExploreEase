import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


export default function useTourist() {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isTourist, isPending: isTouristLOading } = useQuery({
        queryKey: [user?.email, "isTourist"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/tourist/${user?.email}`)
            return res.data?.tourist || false;
        }
    })
return [isTourist, isTouristLOading];
}

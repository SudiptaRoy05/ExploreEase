import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useTourGuide() {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isTourGuide, isLoading: isTourGuideLoading } = useQuery({
        queryKey: [user?.email, "isTourGuide"],
        enabled: !loading && !!user?.email, // Ensures query only runs when user.email is available
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/tourguide/${user?.email}`);
            return res.data?.tourguide || false;
        },
    });

    return [isTourGuide, isTourGuideLoading];
}

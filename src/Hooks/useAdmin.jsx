import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useAdmin() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading && !!user?.email, // Ensure query runs only when user is available
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      return res.data?.admin || false;
    },
  });

  return [isAdmin, isAdminLoading];
}

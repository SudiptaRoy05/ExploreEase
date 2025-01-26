import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Components/Loading";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";

function AdminRoute({children}) {
  const { user, loading } = useAuth()
    const [isAdmin, isAdminLOading] = useAdmin();
    const location = useLocation();
    if (loading || isAdminLOading) {
        return <Loading></Loading>
    }
    if (user && isAdmin) {
        return children
    }

    return <Navigate to='/login' state={{ form: location }} replace></Navigate>
}

export default AdminRoute

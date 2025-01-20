import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../Components/Loading";

export default function PrivateRoute({ children }) {
    const location = useLocation(); 
    const { user, loading } = useContext(AuthContext);
    
    if (loading) {
        return <Loading />; 
    }
    
    if (user) {
        return children;
    }
    
    return <Navigate to='/login' state={{ from: location }} replace />; 
}

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useTourGuide from "../Hooks/useTourGuid";
import Loading from "../Components/Loading";

export default function GuideRoute({children}) {
    const { user, loading } = useAuth()
    const [isTourGuide, isTourGuideLoading] = useTourGuide();
    const location = useLocation();
    if (loading || isTourGuideLoading) {
        return <Loading></Loading>
    }
    if (user && isTourGuide) {
        return children
    }

    return <Navigate to='/login' state={{ form: location }} replace></Navigate>
}

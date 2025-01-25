import useAdmin from "../../../Hooks/useAdmin";
import AdminItem from "./AdminItem";
import TouristProfile from "./TouristProfile";

export default function Profile() {
    const [isAdmin] = useAdmin();
    return (
        <div>
            <TouristProfile></TouristProfile>
            <div>
                {
                    isAdmin && (
                        <>
                            <AdminItem></AdminItem>
                        </>
                    )
                }
            </div>
        </div>
    )
}

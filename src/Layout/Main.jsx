import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";


export default function Main() {
    const location = useLocation();
    const isLogin = location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div>
            {
                isLogin || <Navbar></Navbar>
            }
            <Outlet></Outlet>
            {
                isLogin || <Footer></Footer>
            }
        </div>
    )
}

import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
function OwnerLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
};
export default OwnerLayout;
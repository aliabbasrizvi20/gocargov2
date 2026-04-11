import { Outlet } from "react-router";
import Header from "../components/Header";

function CarLayout({ children }) {
    return (
        <>
            <Header />
            <Outlet />
            
        </>
    )
};
export default CarLayout;
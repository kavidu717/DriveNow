import Header from "../Common/Header";
import Footer from "../Common/Footer";
import {Outlet} from "react-router-dom";


export default function UserLayout() {
    return (
        <>
            <Header/>
           <Outlet/>


            <Footer/>
        </>
    );
}
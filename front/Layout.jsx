import { Outlet } from 'react-router-dom';
import Header from "./src/components/Header.jsx";

export default function Layout() {
    return (
        <>
            <Header />
            <div className={"ml-64 p-6"}>
                <Outlet />
            </div>

        </>
    );
}
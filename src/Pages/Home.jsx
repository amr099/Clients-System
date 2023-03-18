import { Outlet } from "react-router-dom";
import Nav from "components/Nav";
import { useState } from "react";

export default function Home() {
    const [nav, setNav] = useState(true);
    return (
        <div className='row gx-5 w-100'>
            {nav ? (
                <Nav />
            ) : (
                <i class='bi bi-list' onClick={() => setNav(!nav)}></i>
            )}
            <Outlet />
        </div>
    );
}

import {Outlet} from "react-router";
import Button from "../components/Button/Button";
import Time from "../components/Time/Time";
const Layout = () => {
    return (
        <>
            <main>
                <Outlet/>
            </main>
            <footer>
                <Button/>
                <Time/>
            </footer>
        </>
    )
};

export default Layout;
import {Outlet} from "react-router";
import Button from "../components/Button/Button";
import Time from "../components/Time/Time";
import ModalWin from "../components/ModalWin/ModalWin";
import {useState} from "react";
const Layout = ({user, userChange}) => {
    const [show, setShow] = useState(false)

    return (
        <>
            <main>
                <Outlet/>
            </main>
            <footer>
                <Button state={show} click={setShow}/>
                <ModalWin user={user} change={userChange} show={show}/>
                <Time/>
            </footer>
        </>
    )
};

export default Layout;
import {useNavigate} from "react-router";
import {useEffect} from "react";

const ProtectRouter = ({user, children}) => {
    const nav = useNavigate()

    useEffect(() => {
        if(!user.auth) {
            nav("/signin")
        }
    })

    return children
};

export default ProtectRouter;
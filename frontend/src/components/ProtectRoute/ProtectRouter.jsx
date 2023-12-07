import {useNavigate} from "react-router";
import {useEffect} from "react";
import {is_auth} from "../../lib/utils/API";

const ProtectRouter = ({user, children}) => {
    const nav = useNavigate()

    useEffect(() => {
        if(!user.auth && !is_auth()) {
            nav("/signin")
        }
    })

    return children
};

export default ProtectRouter;
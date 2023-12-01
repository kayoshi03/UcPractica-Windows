import {useNavigate} from "react-router";

const ProtectRouter = ({user, children}) => {
    const nav = useNavigate()
    if(!user) {
        nav("/signin")
    }
    return children
};

export default ProtectRouter;
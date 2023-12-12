import {Route, Routes} from "react-router";
import Layout from "./Layout/Layout";
import ProtectRouter from "./components/ProtectRoute/ProtectRouter";
import SignIn from "./Layout/Page/SignIn/SignIn";
import {useState} from "react";
import Home from "./Layout/Page/Home/Home";
import SignUp from "./Layout/Page/SignUp/SignUp";
import {is_auth} from "./lib/utils/API";

const name = localStorage.getItem("name")
const auth = localStorage.getItem("auth")
console.log(name)
const App = () => {
    const [user, setUser] = useState(auth === "true" ? {name: name, auth: true} : {name: "", auth: false});

    console.log(user)

    return (
        <>
            <Routes>
                <Route path="/signin" element={<SignIn user={user} sign={setUser}/>}/>
                <Route path="/signup" element={<SignUp sign={setUser}/>}/>
                <Route element={<Layout user={user} userChange={setUser}/>}>
                    <Route index path="/" element={<ProtectRouter user={user} children={<Home/>}/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;

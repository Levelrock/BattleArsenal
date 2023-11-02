import { Outlet} from "react-router-dom";
import Login from "../pages/logIn/LogIn" 

export const isAuth = () => {
    return JSON.parse(localStorage.getItem("token"));
}

const ProtectedRoutes = () => {
    const auth = isAuth()

    return auth ? <Outlet/> : <Login />
}

export default ProtectedRoutes
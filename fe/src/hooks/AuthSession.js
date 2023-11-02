import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../middleware/protectedRoutes"


export const useSession= () => {
    const session = isAuth()
    const decodeSession = session ? jwtDecode(session) : null ;
    const navigate = useNavigate()

    const checkTokenExpirationTime = () => {
        const convertUnixDateToMillisecond = decodeSession.exp * 1000
        const expirationDate = new Date(convertUnixDateToMillisecond)
        const currentData = new Date()

        if (expirationDate < currentData) {
            localStorage.clear()
        }

        console.log(expirationDate)
    }

    useEffect(() => {
        if (!session) {
            navigate('/', {replace: true})
        }
        checkTokenExpirationTime();
    }, [navigate, session]);

    return decodeSession

}
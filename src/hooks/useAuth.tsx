import { useEffect } from "react"
import { isAuthenticated } from "../utils/auth"
import { useNavigate } from "react-router-dom"

const UseAuthProtected = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/auth/login', { replace: true });
        }
    }, [navigate]);
}

export default UseAuthProtected
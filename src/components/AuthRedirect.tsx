import { useEffect } from "react";
import { useAuthCtx } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

const AuthRedirect = () => {
    const { user, isLoading } = useAuthCtx();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
            if (user) {
                navigate("/dashboard", { replace: true });
            } else {
                navigate("/auth/login", { replace: true });

            }
        }
    }, [navigate, user, isLoading]);

    return (
        <Spin size="large" />
    )
}

export default AuthRedirect
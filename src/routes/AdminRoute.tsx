import type { FC, ReactNode } from "react";
import { useAuthCtx } from "../context/AuthContext";
import { AccessLimited } from "../components";

interface props {
    children: ReactNode
}
const AdminRoute: FC<props> = ({ children }) => {
    const { user } = useAuthCtx();

    if (user?.role !== 'admin') {
        return <AccessLimited />;
    }
    return children;
};

export default AdminRoute;
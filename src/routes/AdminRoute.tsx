import type { FC, ReactNode } from "react";
import { useAuthCtx } from "../context/AuthContext";

interface props {
    children: ReactNode
}
const AdminRoute: FC<props> = ({ children }) => {
    const { user } = useAuthCtx();

    if (user?.role !== 'admin') {
        return <div style={{ padding: 24 }}>Access Denied. Admins only.</div>;
    }
    return children;
};

export default AdminRoute;
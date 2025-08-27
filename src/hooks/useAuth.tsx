import type { FC, ReactNode } from "react"
import { isAuthenticated } from "../utils/auth"
import { Navigate } from "react-router-dom"

interface isAuthProps {
    children: ReactNode
}
const UseAuthProtected: FC<isAuthProps> = ({ children }) => {
    return isAuthenticated.toString() ? <>{children}</> : <Navigate to={'/auth/login'} />
}

export default UseAuthProtected
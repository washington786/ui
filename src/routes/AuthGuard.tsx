import { useEffect, useState, type FC, type ReactNode } from 'react'
import UseAuthProtected from '../hooks/useAuth';
import { Spin } from 'antd';

interface props {
    children: ReactNode
}
const AuthGuard: FC<props> = ({ children }) => {
    UseAuthProtected();
    const [verified, setVerified] = useState(false);
    useEffect(() => {
        setVerified(true);
    }, []);
    return verified ? children : <Spin size='large' />
}

export default AuthGuard

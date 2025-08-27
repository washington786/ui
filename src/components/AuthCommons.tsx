/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";

export const LoginTitle = ({ children }: { children: React.ReactNode }) => (
    <Title level={2}>{children}</Title>
)

export const LoginButton = ({ children, ...props }: any) => (
    <Button type="primary" {...props}>
        {children}
    </Button>
)

export const LoginLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link to={to}>{children}</Link>
)

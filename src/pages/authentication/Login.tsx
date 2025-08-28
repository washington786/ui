/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Card, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { styles } from './styles'
import { LoginButton, LoginLink } from '../../components/AuthCommons'
import { useAuthCtx } from '../../context/AuthContext'

const { Title } = Typography

export const Login = () => {
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const { login } = useAuthCtx();

    const onFinish = async (values: { email: string, password: string }) => {
        setLoading(true)
        try {
            await login(values.email, values.password);
            navigate('/dashboard')
        } catch (err: any) {
            alert(`Login failed ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={styles.container}>
            <Card style={styles.card}>
                <Title level={2}>Login</Title>
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <LoginButton type="primary" htmlType="submit" loading={loading} block>
                            Login
                        </LoginButton>
                    </Form.Item>
                </Form>
                <p>
                    No account? <LoginLink to="/auth/register">Register</LoginLink>
                </p>
            </Card>
        </div>
    )
}

export default Login
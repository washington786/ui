/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Card, Typography } from 'antd'
import { useState } from 'react'
import { api } from '../../services/api'
import { setToken } from '../../utils/auth'
import { useNavigate } from 'react-router-dom'
import { styles } from './styles'
import { LoginButton, LoginLink } from '../../components/AuthCommons'

const { Title } = Typography

export const Login = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onFinish = async (values: any) => {
        setLoading(true)
        try {
            const res = await api.post('/users/login', values)
            setToken(res.data.token)
            navigate('/dashboard/issues')
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
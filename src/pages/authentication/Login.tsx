/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Button, Card, Typography } from 'antd'
import { useState } from 'react'
import { api } from '../../services/api'
import { setToken } from '../../utils/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { styles } from './styles'

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
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <p>
                    No account? <Link to="/register">Register</Link>
                </p>
            </Card>
        </div>
    )
}

export default Login
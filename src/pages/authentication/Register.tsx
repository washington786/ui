/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Form, Input } from 'antd'
import { api } from '../../services/api'
import { useState } from 'react'
import { setToken } from '../../utils/auth'
import { useNavigate } from 'react-router-dom'

import { LoginButton, LoginLink, LoginTitle } from '../../components/AuthCommons';

import { styles } from './styles';

export const Register = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onFinish = async (values: any) => {
        setLoading(true)
        try {
            const res = await api.post('/users/register', values)
            setToken(res.data.token)
            navigate('/dashboard/issues')
        } catch (err: any) {
            alert(`Registration failed: $${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={styles.container}>
            <Card style={styles.card}>
                <LoginTitle>Register</LoginTitle>
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <LoginButton htmlType="submit" loading={loading} block>
                            Register
                        </LoginButton>
                    </Form.Item>
                </Form>
                <p>
                    Already have an account? <LoginLink to="/auth/login">Login</LoginLink>
                </p>
            </Card>
        </div>
    )
}

export default Register
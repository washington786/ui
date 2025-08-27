import { Layout, Card, Typography, Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/auth';

const { Title, Paragraph } = Typography;

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate('/auth/login', { replace: true });
    };

    return (
        <Layout style={{ padding: '20px', background: '#f0f2f5' }}>
            <Card
                title="User Profile"
                style={{ maxWidth: 900, margin: '0 auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
                <div style={{ textAlign: 'center' }}>
                    <Title level={3}>John Doe</Title>
                    <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                        john@example.com
                    </Paragraph>
                    <Paragraph>
                        <strong>Role:</strong> Admin
                    </Paragraph>
                    <Paragraph>
                        <strong>Member since:</strong> January 2024
                    </Paragraph>
                    <Divider />
                    <Button type="primary" danger onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </Card>
        </Layout>
    );
};

export default Profile
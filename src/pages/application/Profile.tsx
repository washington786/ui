import { Card, Typography, Button, Divider, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuthCtx } from '../../context/AuthContext';

const { Title, Text } = Typography;

export const Profile = () => {
    const { logout, user } = useAuthCtx();

    return (
        <div style={{
            padding: '40px 20px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Card
                hoverable
                style={{
                    maxWidth: 600,
                    width: '100%',
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
            >
                {/* Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: 32,
                    position: 'relative',
                }}>
                    <Avatar
                        size={80}
                        icon={<UserOutlined />}
                        style={{
                            backgroundColor: '#1890ff',
                            marginBottom: 16,
                            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                        }}
                    />
                    <Title level={3} style={{ margin: 0, color: '#1f1f1f' }}>
                        {user?.name}
                    </Title>
                    <Text type="secondary">{user?.email}</Text>
                </div>

                {/* Info Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    marginBottom: 24,
                }}>
                    <div style={infoItemStyle}>
                        <Text strong>Role</Text>
                        <Tag color="geekblue">{user?.role}</Tag>
                    </div>

                    <div style={infoItemStyle}>
                        <Text strong>Member Since</Text>
                        <Text>{user?.createdAt}</Text>
                    </div>

                </div>

                <Divider style={{ margin: '24px 0' }} />

                {/* Logout Button */}
                <div style={{ textAlign: 'center' }}>
                    <Button
                        type="primary"
                        danger
                        icon={<LogoutOutlined />}
                        size="large"
                        onClick={logout}
                        style={{
                            borderRadius: 8,
                            fontWeight: 500,
                            boxShadow: '0 4px 10px rgba(255, 77, 77, 0.2)',
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </Card>
        </div>
    );
};

// Reusable style
const infoItemStyle = {
    padding: '12px 16px',
    background: '#f9f9f9',
    borderRadius: 8,
    border: '1px solid #f0f0f0',
};

const Tag = ({ children, color }: { children: React.ReactNode; color: string }) => (
    <span
        style={{
            padding: '4px 12px',
            borderRadius: 20,
            backgroundColor: `${color}15`,
            color: `var(--ant-color-${color}, ${color})`,
            fontSize: 12,
            fontWeight: 600,
            border: `1px solid ${color}30`,
        }}
    >
        {children}
    </span>
);
export default Profile;
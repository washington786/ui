import { Alert, Button, Card } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const AccessLimited = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f7f9fc 0%, #e8edf3 100%)',
                padding: '20px',
            }}
        >
            <Card
                bordered={false}
                style={{
                    maxWidth: 500,
                    width: '100%',
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                }}
            >
                <div style={{ textAlign: 'center', padding: '40px 24px' }}>
                    {/* Lock Icon */}
                    <div
                        style={{
                            fontSize: 64,
                            color: '#ff4d4f',
                            marginBottom: 24,
                            display: 'inline-block',
                            padding: '20px',
                            borderRadius: '50%',
                            background: '#fff1f0',
                            boxShadow: '0 4px 10px rgba(255, 77, 77, 0.1)',
                        }}
                    >
                        <LockOutlined />
                    </div>

                    {/* Title & Message */}
                    <h1 style={{ fontSize: 28, fontWeight: 600, color: '#1f1f1f', marginBottom: 12 }}>
                        Access Denied
                    </h1>
                    <p style={{ color: '#595959', lineHeight: 1.6, marginBottom: 32 }}>
                        You don't have permission to view this page.
                        <br />
                        Only administrators can access this section.
                    </p>

                    {/* Warning Alert */}
                    <Alert
                        message="Restricted Area"
                        description="This content is protected and only available to users with admin privileges."
                        type="warning"
                        showIcon
                        style={{ marginBottom: 24, textAlign: 'left' }}
                    />

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => navigate(-1)}
                            style={{ borderRadius: 8 }}
                        >
                            Go Back
                        </Button>
                        <Button
                            size="large"
                            onClick={() => navigate('/dashboard/issues')}
                            style={{ borderRadius: 8 }}
                        >
                            Back to Home
                        </Button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};
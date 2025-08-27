import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                padding: '20px',
            }}
        >
            <Result
                status="404"
                title="404"
                subTitle={
                    <div style={{ fontSize: 18, color: '#595959', marginBottom: 24 }}>
                        Sorry, the page you visited does not exist.
                    </div>
                }
                extra={
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                        <Button
                            type="primary"
                            icon={<ArrowLeftOutlined />}
                            size="large"
                            onClick={() => navigate(-1)}
                        >
                            Go Back
                        </Button>
                    </div>
                }
                style={{ background: 'white', padding: '40px', borderRadius: 16, boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
            />
        </motion.div>
    );
};

export default NotFound;
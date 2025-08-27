import { Layout, Menu } from 'antd'
import {
    HomeOutlined,
    BugOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Sider } = Layout

const Sidebar = () => {
    const navigate = useNavigate()

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            width={250}
            style={{
                background: '#fff',
                position: 'sticky',
                top: 0,
                height: '100vh',
                boxShadow: '2px 0 8px rgba(0,0,0,0.1)'
            }}
        >
            <div style={{
                height: 64,
                padding: '0 16px',
                display: 'flex',
                alignItems: 'center',
                fontSize: 18,
                fontWeight: 'bold',
                borderBottom: '1px solid #eee'
            }}>
                Issue Tracker
            </div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['issues']}
                onClick={({ key }) => navigate(key)}
                items={[
                    { key: '/dashboard/issues', icon: <BugOutlined />, label: 'Issues' },
                    { key: '/dashboard/profile', icon: <HomeOutlined />, label: 'Profile' },
                ]}
            />
        </Sider>
    )
}

export default Sidebar

import { Layout } from 'antd'
import Sidebar from './Sidebar'

const { Content } = Layout

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout>
                <Content style={{ margin: '24px', background: '#fff', padding: 24, borderRadius: 8 }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}
export default Layout
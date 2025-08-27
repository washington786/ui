
import { Layout as AntLayout } from 'antd';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';

export const AppLayout = () => {
    return (
        <AntLayout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <AntLayout>
                <Content style={{ margin: '24px', background: '#fff', padding: 24, borderRadius: 8 }}>
                    <Outlet />
                </Content>
            </AntLayout>
        </AntLayout>
    )
}
export default AppLayout
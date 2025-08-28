/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    Tag,
    Typography,
    Card,
    Space,
    Button,
    Modal,
} from 'antd';
import { type Key } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import type { User } from '../../utils/IUser';
import type { ColumnsType } from 'antd/es/table';
import useUsers from '../../hooks/useUsers';

const { Text } = Typography;

export const Users = () => {
    const { deleteModal, user, data, isLoading, deleteMutation, setDeleteModal } = useUsers();

    const columns: ColumnsType<User> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <Text strong>{text}</Text>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            filters: [
                { text: 'User', value: 'user' },
                { text: 'Admin', value: 'admin' },
            ],
            onFilter: (value: Key | boolean, record: User) => record.role === value,
            render: (role: 'user' | 'admin') => (
                <Tag color={role === 'admin' ? 'purple' : 'blue'}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                </Tag>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: User) => (
                <Space>
                    <Button
                        size="small"
                        type="dashed"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => setDeleteModal({ visible: true, id: record.id })}
                    />
                </Space>
            ),
        },
    ];

    return (
        <Card
            title="Users"
            style={{ margin: '0 auto', maxWidth: 1000 }}
        >
            <Table
                rowKey="id"
                columns={columns}
                dataSource={data?.filter(usr => usr.id != user?.id)}
                loading={isLoading}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 800 }}
            />

            <Modal
                title="Delete User"
                open={deleteModal.visible}
                onOk={() => deleteModal.id && deleteMutation.mutate(deleteModal.id)}
                confirmLoading={deleteMutation.isPending}
                onCancel={() => setDeleteModal({ visible: false, id: null })}
                okButtonProps={{ danger: true }}
            >
                Are you sure you want to delete this user?
            </Modal>
        </Card>
    );
};

export default Users;
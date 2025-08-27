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
import { useState } from 'react';
import { api } from '../../services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { User } from '../../utils/IUser';

const { Text } = Typography;


export const Users = () => {
    const [deleteModal, setDeleteModal] = useState<{ visible: boolean; id: string | null }>({
        visible: false,
        id: null,
    });

    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await api.get('/users');
            return res.data as User[];
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/users/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setDeleteModal({ visible: false, id: null });
        },
    });

    const columns = [
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
            onFilter: (value: boolean | React.Key, record: User) => record.role === value,
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
                    <Button size="small" type="default" icon={<EditOutlined />}>
                        Edit
                    </Button>
                    <Button
                        size="small"
                        type="dashed"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => setDeleteModal({ visible: true, id: record.id })}
                    >
                        Remove
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Card
            title="Users"
            bordered={false}
            style={{ margin: '0 auto', maxWidth: 1000 }}
        >
            <Table
                rowKey="id"
                columns={columns}
                dataSource={data}
                loading={isLoading}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 800 }}
            />

            <Modal
                title="Delete User"
                open={deleteModal.visible}
                onOk={() => deleteMutation.mutate(deleteModal.id!)}
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
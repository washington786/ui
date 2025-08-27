/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    Tag,
    Button,
    Space,
    Modal,
    DatePicker,
    Select,
    Typography,
    Card,
    Form,
    Input,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Key } from 'react';
import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';
import type { Issue, IssuePriority, IssueStatus } from '../../utils/types/issues';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

export const Issues = () => {
    const [filters, setFilters] = useState<{
        status?: IssueStatus;
        priority?: IssuePriority;
        dateRange?: [string, string];
    }>({});
    const [deleteModal, setDeleteModal] = useState<{ visible: boolean; id: string | null }>({
        visible: false,
        id: null,
    });
    const [viewModal, setViewModal] = useState<{ visible: boolean; issue: Issue | null }>({
        visible: false,
        issue: null,
    });

    const [editModal, setEditModal] = useState<{ visible: boolean; issue: Issue | null }>({
        visible: false,
        issue: null,
    });
    const [addModal, setAddModal] = useState<{ visible: boolean }>({ visible: false });

    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ['issues'],
        queryFn: async () => {
            const res = await api.get('/issues');
            return res.data as Issue[];
        },
    });

    const addMutation = useMutation({
        mutationFn: async (values: Omit<Issue, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
            const res = await api.post('/issues', values);
            return res.data as Issue;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] });
            setAddModal({ visible: false });
        },
    });

    const editMutation = useMutation({
        mutationFn: async (values: { id: string } & Omit<Issue, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
            const res = await api.patch(`/issues/${values.id}`, {
                title: values.title,
                description: values.description,
                status: values.status,
                priority: values.priority,
            });
            return res.data as Issue;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] });
            setEditModal({ visible: false, issue: null });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/issues/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] });
            setDeleteModal({ visible: false, id: null });
        },
    });

    const filteredData = useMemo(() => {
        if (!data) return [];

        return data.filter((issue: Issue) => {
            const { status, priority, dateRange } = filters;

            if (status && issue.status !== status) return false;
            if (priority && issue.priority !== priority) return false;

            if (dateRange) {
                const [start, end] = dateRange;
                const created = new Date(issue.createdAt);
                if (created < new Date(start) || created > new Date(end)) return false;
            }

            return true;
        });
    }, [data, filters]);

    const columns: ColumnsType<Issue> = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text: string) => <Text strong>{text}</Text>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Open', value: 'open' },
                { text: 'In Progress', value: 'in-progress' },
                { text: 'Resolved', value: 'resolved' },
            ],
            onFilter: (value: boolean | Key, record: Issue) => record.status === value,
            render: (status: IssueStatus) => {
                let color = 'default';
                if (status === 'open') color = 'red';
                if (status === 'in-progress') color = 'blue';
                if (status === 'resolved') color = 'green';
                return <Tag color={color}>{status.replace('-', ' ')}</Tag>;
            },
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            filters: [
                { text: 'Low', value: 'low' },
                { text: 'Medium', value: 'medium' },
                { text: 'High', value: 'high' },
            ],
            onFilter: (value: boolean | Key, record: Issue) => record.priority === value,
            render: (priority: IssuePriority) => (
                <Tag style={{ fontWeight: 'bold' }}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Tag>
            ),
        },
        {
            title: 'Created By',
            dataIndex: ['createdBy', 'name'],
            key: 'createdBy',
            render: (name: string) => <Text type="secondary">{name}</Text>,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a: Issue, b: Issue) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Issue) => (
                <Space>
                    <Button
                        size="small"
                        type="primary"
                        ghost
                        icon={<EyeOutlined />}
                        onClick={() => setViewModal({ visible: true, issue: record })}
                        title="View"
                    />
                    <Button
                        size="small"
                        type="default"
                        icon={<EditOutlined />}
                        onClick={() => setEditModal({ visible: true, issue: record })}
                        title="Edit"
                    />
                    <Button
                        size="small"
                        type="dashed"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => setDeleteModal({ visible: true, id: record.id })}
                        title="Delete"
                    />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card
                title="Issues"
                bordered={false}
                extra={
                    <Space wrap>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setAddModal({ visible: true })}
                        >
                            Add Issue
                        </Button>

                        <Select
                            placeholder="Filter by status"
                            allowClear
                            style={{ width: 150 }}
                            onChange={(value) =>
                                setFilters((f) => ({ ...f, status: value as IssueStatus | undefined }))
                            }
                        >
                            <Option value="open">Open</Option>
                            <Option value="in-progress">In Progress</Option>
                            <Option value="resolved">Resolved</Option>
                        </Select>

                        <Select
                            placeholder="Filter by priority"
                            allowClear
                            style={{ width: 150 }}
                            onChange={(value) =>
                                setFilters((f) => ({ ...f, priority: value as IssuePriority | undefined }))
                            }
                        >
                            <Option value="low">Low</Option>
                            <Option value="medium">Medium</Option>
                            <Option value="high">High</Option>
                        </Select>

                        <RangePicker
                            onChange={(dates, dateStrings) => {
                                if (dates) {
                                    setFilters((f) => ({ ...f, dateRange: dateStrings as [string, string] }));
                                } else {
                                    setFilters((f) => ({ ...f, dateRange: undefined }));
                                }
                            }}
                        />
                    </Space>
                }
            >
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={filteredData}
                    loading={isLoading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50'],
                    }}
                    scroll={{ x: 1000 }}
                />
            </Card>

            {/* View Modal */}
            <Modal
                title="Issue Details"
                open={viewModal.visible}
                onCancel={() => setViewModal({ visible: false, issue: null })}
                footer={null}
            >
                {viewModal.issue && (
                    <div>
                        <p><strong>Title:</strong> {viewModal.issue.title}</p>
                        <p><strong>Description:</strong> {viewModal.issue.description}</p>
                        <p><strong>Status:</strong> {viewModal.issue.status.replace('-', ' ')}</p>
                        <p><strong>Priority:</strong> {viewModal.issue.priority}</p>
                        <p><strong>Created By:</strong> {viewModal.issue.createdBy.name} ({viewModal.issue.createdBy.email})</p>
                        <p><strong>Created At:</strong> {new Date(viewModal.issue.createdAt).toLocaleString()}</p>
                    </div>
                )}
            </Modal>

            {/* Add Issue Modal */}
            <Modal
                title="Add New Issue"
                open={addModal.visible}
                confirmLoading={addMutation.isPending}
                onOk={() => {
                    // Form will handle submit
                }}
                onCancel={() => setAddModal({ visible: false })}
            >
                <Form
                    layout="vertical"
                    onFinish={(values) => {
                        addMutation.mutate(values);
                    }}
                >
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="status" label="Status" initialValue="open" rules={[{ required: true }]}>
                        <Select>
                            <Option value="open">Open</Option>
                            <Option value="in-progress">In Progress</Option>
                            <Option value="resolved">Resolved</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="priority" label="Priority" initialValue="medium" rules={[{ required: true }]}>
                        <Select>
                            <Option value="low">Low</Option>
                            <Option value="medium">Medium</Option>
                            <Option value="high">High</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                title="Delete Issue"
                open={deleteModal.visible}
                onOk={() => deleteMutation.mutate(deleteModal.id!)}
                confirmLoading={deleteMutation.isPending}
                onCancel={() => setDeleteModal({ visible: false, id: null })}
                okButtonProps={{ danger: true }}
            >
                Are you sure you want to delete this issue?
            </Modal>

            {/* Edit Issue Modal */}
            <Modal
                title="Edit Issue"
                open={editModal.visible}
                confirmLoading={editMutation.isPending}
                onOk={() => {
                    // Form will handle submit
                }}
                onCancel={() => setEditModal({ visible: false, issue: null })}
            >
                <Form
                    layout="vertical"
                    initialValues={editModal.issue || {}}
                    onFinish={(values) => {
                        editMutation.mutate({ id: editModal.issue!.id, ...values });
                    }}
                >
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                        <Select>
                            <Option value="open">Open</Option>
                            <Option value="in-progress">In Progress</Option>
                            <Option value="resolved">Resolved</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
                        <Select>
                            <Option value="low">Low</Option>
                            <Option value="medium">Medium</Option>
                            <Option value="high">High</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Issues;
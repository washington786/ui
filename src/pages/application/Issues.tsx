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
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Key } from 'react';
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import type { Issue, IssuePriority, IssueStatus } from '../../utils/types/issues';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

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

    const { data, isLoading } = useQuery({
        queryKey: ['issues'],
        queryFn: async () => {
            const res = await api.get('/issues');
            return res.data as Issue[];
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
                        onClick={() => {
                            // Handle view action
                        }}
                    />
                    <Button
                        size="small"
                        type="default"
                        icon={<EditOutlined />}
                    />
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
        <div style={{ padding: '24px' }}>
            <Card
                title="Issues"
                bordered={false}
                extra={
                    <Space wrap>
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

            <Modal
                title="Delete Issue"
                open={deleteModal.visible}
                onOk={() => {
                    // Add delete logic later
                }}
                confirmLoading={false}
                onCancel={() => setDeleteModal({ visible: false, id: null })}
                okButtonProps={{ danger: true }}
            >
                Are you sure you want to delete this issue?
            </Modal>
        </div>
    );
};

export default Issues;
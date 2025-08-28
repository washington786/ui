/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    Tag,
    Button,
    Space,
    DatePicker,
    Select,
    Typography,
    Card,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Key } from 'react';
import { useState, useMemo } from 'react';
import type { Issue, IssuePriority, IssueStatus } from '../../utils/types/issues';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { useAuthCtx } from '../../context/AuthContext';
import { AddModal, EditModal, DeleteModal, ViewModel } from '../../components';
import { useIssues } from '../../hooks/useIssues';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

export const Issues = () => {

    const { user } = useAuthCtx();

    const {
        // data for issues
        issues,
        isIssuesLoading,

        // Mutations

        addMutation,
        editMutation,
        deleteMutation,

        // Modal state
        addModal,
        setAddModal,
        editModal,
        setEditModal,
        deleteModal,
        setDeleteModal,
        viewModal,
        setViewModal, } = useIssues();

    const [filters, setFilters] = useState<{
        status?: IssueStatus;
        priority?: IssuePriority;
        dateRange?: [string, string];
    }>({});

    const filteredData = useMemo(() => {
        if (!issues) return [];

        return issues.filter((issue: Issue) => {
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
    }, [issues, filters]);

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
                        disabled={user?.role != "admin"}
                        icon={<EditOutlined />}
                        onClick={() => setEditModal({ visible: true, issue: record })}
                        title="Edit"
                    />
                    <Button
                        size="small"
                        type="dashed"
                        disabled={user?.role != "admin"}
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => setDeleteModal({ visible: true, id: record._id })}
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
                    loading={isIssuesLoading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50'],
                    }}
                    scroll={{ x: 1000 }}
                />
            </Card>

            {/* View Modal */}
            <ViewModel setViewModal={setViewModal} viewModal={viewModal} />

            {/* Add Issue Modal */}
            <AddModal addModal={addModal} setAddModal={setAddModal} onLoadingConfirmation={addMutation.isPending} onAdd={(values) => addMutation.mutate(values)} />

            {/* Delete Confirmation Modal */}
            <DeleteModal deleteLoading={deleteMutation.isPending} deleteModal={deleteModal} onDeleteConfirmation={() => deleteMutation.mutate(deleteModal.id!)} setDeleteModal={setDeleteModal} />

            {/* Edit Issue Modal */}
            <EditModal
                editModal={editModal}
                setEditModal={setEditModal}
                onEdit={(values) => {
                    editMutation.mutate({ id: editModal.issue!._id, ...values });
                }}
                onLoadingConfirmation={editMutation.isPending} />
        </div>
    );
};

export default Issues;
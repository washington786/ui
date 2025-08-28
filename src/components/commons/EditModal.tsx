/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Modal, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { type FC } from 'react'
import type { Issue } from '../../utils/types/issues';

interface props {
    editModal: { visible: boolean, issue: Issue | null },
    setEditModal: (modalState: { visible: boolean; issue: Issue | null }) => void;
    onLoadingConfirmation: boolean;
    onEdit(values: any): void;
    onSubmitOk?(): void;
}

const EditModal: FC<props> = ({ editModal, setEditModal, onLoadingConfirmation, onEdit, onSubmitOk }) => {
    return (
        <Modal
            title="Edit Issue"
            open={editModal.visible}
            confirmLoading={onLoadingConfirmation}
            onOk={onSubmitOk}
            onCancel={() => setEditModal({ visible: false, issue: null })}
        >
            <Form
                layout="vertical"
                initialValues={editModal.issue || {}}
                onFinish={(values) => {
                    onEdit(values);
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
    )
}

export default EditModal
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Modal, Select } from 'antd';
import { type FC } from 'react';
import type { Issue } from '../../utils/types/issues';

interface Props {
    editModal: { visible: boolean; issue: Issue | null };
    setEditModal: (modalState: { visible: boolean; issue: Issue | null }) => void;
    onLoadingConfirmation: boolean;
    onEdit: (values: any) => void;
}

const EditModal: FC<Props> = ({ editModal, setEditModal, onLoadingConfirmation, onEdit }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        form.resetFields();
        setEditModal({ visible: false, issue: null });
    };

    return (
        <Modal
            title="Edit Issue"
            open={editModal.visible}
            confirmLoading={onLoadingConfirmation}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={editModal.issue || {}}
                onFinish={(values) => {
                    onEdit({ id: editModal.issue?._id, ...values });
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
                        <Select.Option value="open">Open</Select.Option>
                        <Select.Option value="in-progress">In Progress</Select.Option>
                        <Select.Option value="resolved">Resolved</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="low">Low</Select.Option>
                        <Select.Option value="medium">Medium</Select.Option>
                        <Select.Option value="high">High</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditModal;
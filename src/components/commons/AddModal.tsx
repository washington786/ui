/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Modal, Select } from 'antd';
import type { FC } from 'react';

interface Props {
    addModal: { visible: boolean };
    setAddModal: (modalState: { visible: boolean }) => void;
    onLoadingConfirmation: boolean;
    onAdd: (values: any) => void;
}

const AddModal: FC<Props> = ({
    addModal,
    onAdd,
    onLoadingConfirmation,
    setAddModal,
}) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        form.resetFields();
        setAddModal({ visible: false });
    };

    return (
        <Modal
            title="Add New Issue"
            open={addModal.visible}
            confirmLoading={onLoadingConfirmation}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    onAdd(values);
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
                        <Select.Option value="open">Open</Select.Option>
                        <Select.Option value="in-progress">In Progress</Select.Option>
                        <Select.Option value="resolved">Resolved</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="priority" label="Priority" initialValue="medium" rules={[{ required: true }]}>
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

export default AddModal;
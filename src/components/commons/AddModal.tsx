/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Modal, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import type { FC } from 'react';

interface props {
    addModal: { visible: boolean },
    setAddModal: (modalState: { visible: boolean; }) => void;
    onLoadingConfirmation: boolean;
    onAdd(values: any): void;
    onSubmitOk?(): void;
}

const AddModal: FC<props> = ({ addModal, onAdd, onLoadingConfirmation, setAddModal, onSubmitOk }) => {
    return (
        <Modal
            title="Add New Issue"
            open={addModal.visible}
            confirmLoading={onLoadingConfirmation}
            onOk={onSubmitOk}
            onCancel={() => setAddModal({ visible: false })}
        >
            <Form
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
    )
}

export default AddModal
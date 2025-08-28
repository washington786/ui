import { Modal } from 'antd'
import { type FC } from 'react'

interface props {
    onDeleteConfirmation(): void;
    deleteModal: { visible: boolean }
    setDeleteModal(modalState: { visible: boolean, id: string | null }): void;
    deleteLoading: boolean;
}

const DeleteModal: FC<props> = ({ deleteModal, onDeleteConfirmation, setDeleteModal, deleteLoading }) => {
    return (
        <Modal
            title="Delete Issue"
            open={deleteModal.visible}
            onOk={onDeleteConfirmation}
            confirmLoading={deleteLoading}
            onCancel={() => setDeleteModal({ visible: false, id: null })}
            okButtonProps={{ danger: true }}
        >
            Are you sure you want to delete this issue?
        </Modal>
    )
}

export default DeleteModal
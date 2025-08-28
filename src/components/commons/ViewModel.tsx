import { Modal } from 'antd'
import { type FC } from 'react'
import type { Issue } from '../../utils/types/issues';

interface props {
    viewModal: { visible: boolean, issue: Issue | null },
    setViewModal: (modalState: { visible: boolean; issue: Issue | null }) => void;
}
const ViewModel: FC<props> = ({ setViewModal, viewModal }) => {
    return (
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
    )
}

export default ViewModel
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { Issue } from "../utils/types/issues";
import { api } from "../services/api";
import { message } from "antd";

type CreateIssueData = Omit<Issue, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>;
type UpdateIssueData = Partial<CreateIssueData> & { id: string };

export const useIssues = () => {
    const queryClient = useQueryClient();

    // Modal state
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

    // Fetch issues
    const {
        data: issues = [],
        isLoading: isIssuesLoading,
        isError,
    } = useQuery({
        queryKey: ['issues'],
        queryFn: async () => {
            const res = await api.get('/issues');
            // Map _id → id for frontend
            return res.data.map((issue: any) => ({
                ...issue,
                id: issue._id,
            })) as Issue[];
        },
    });

    // Add mutation
    const addMutation = useMutation({
        mutationFn: async (values: CreateIssueData) => {
            const res = await api.post('/issues', values);
            return {
                ...res.data,
                id: res.data._id, // Map _id → id
            } as Issue;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] });
            setAddModal({ visible: false });
            message.success('Issue created successfully');
        },
        onError: (error: any) => {
            message.error(error.response?.data?.msg || 'Failed to create issue');
        },
    });

    // Edit mutation
    const editMutation = useMutation({
        mutationFn: async ({ id, ...updateData }: UpdateIssueData) => {
            const res = await api.put(`/issues/${id}`, updateData);
            return {
                ...res.data,
                id: res.data._id,
            } as Issue;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] });
            setEditModal({ visible: false, issue: null });
            message.success('Issue updated successfully');
        },
        onError: (error: any) => {
            message.error(error.response?.data?.msg || 'Failed to update issue');
        },
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            if (!id) throw new Error('Invalid issue ID');
            await api.delete(`/issues/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] });
            setDeleteModal({ visible: false, id: null });
            message.success('Issue deleted');
        },
        onError: (error: any) => {
            message.error(error.response?.data?.msg || 'Failed to delete issue');
        },
    });

    return {
        // Query
        issues,
        isIssuesLoading,
        isError,

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
        setViewModal,
    };
};
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { Issue } from "../utils/types/issues";
import { api } from "../services/api";

export const useIssues = () => {
    const queryClient = useQueryClient();

    // Local state for modals
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

    // useQuery at top level
    const {
        data: issues,
        isLoading: isIssuesLoading,
        isError,
    } = useQuery({
        queryKey: ['issues'],
        queryFn: async () => {
            const res = await api.get('/issues');
            return res.data as Issue[];
        },
    });

    // Add mutation
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

    // Edit mutation
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

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/issues/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] });
            setDeleteModal({ visible: false, id: null });
        },
    });

    // Return all state and logic
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
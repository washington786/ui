/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuthCtx } from "../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "../utils/IUser";
import { api } from "../services/api";

const useUsers = () => {
    const queryClient = useQueryClient();

    const [deleteModal, setDeleteModal] = useState<{ visible: boolean; id: string | null }>({
        visible: false,
        id: null,
    });
    const { user } = useAuthCtx();


    const { data, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await api.get('/users/list');
            return res.data.map((user: any) => ({
                ...user,
                id: user._id,
            })) as User[];
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            if (!id) throw new Error('Invalid user ID');
            await api.delete(`/users/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setDeleteModal({ visible: false, id: null });
        },
    });
    return { deleteModal, user, data, isLoading, deleteMutation, setDeleteModal }
}

export default useUsers
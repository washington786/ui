import { createBrowserRouter, Navigate } from "react-router-dom";

import { Issues, Login, NotFound, Profile, Register } from "../pages";
import { Layout } from "../components";
import UseAuthProtected from "../hooks/useAuth";

const router = createBrowserRouter([
    // Root:redirect to auth login
    {
        path: '/',
        element: <Navigate to="/auth/login" />,
    },

    // Dashboard routes (with layout)
    {
        path: '/dashboard',
        element: <UseAuthProtected><Layout /></UseAuthProtected>,
        children: [
            { index: true, element: <Issues /> },
            { path: 'profile', element: <Profile /> },
        ],
    },

    // Authentication routes
    {
        path: '/auth',
        children: [
            { index: true, element: <Navigate to="login" /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
        ],
    },

    // 404 page route
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;
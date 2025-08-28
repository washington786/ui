import { createBrowserRouter, Navigate } from "react-router-dom";

import { Issues, Login, NotFound, Profile, Register, Users } from "../pages";
import AppLayout from "../components/Layouts/Layout";
import AuthGuard from "./AuthGuard";
import AdminRoute from "./AdminRoute";
import { AuthRedirect } from "../components";

const router = createBrowserRouter([
    // Root:redirect to auth login
    {
        path: '/',
        element: <AuthRedirect />,
    },

    // Dashboard routes (with layout)
    {
        path: '/dashboard',
        element: <AuthGuard><AppLayout /></AuthGuard>,
        children: [
            { index: true, element: <Navigate to="issues" /> },
            { path: "issues", element: <Issues /> },
            { path: 'profile', element: <Profile /> },
            { path: "users", element: <AdminRoute><Users /></AdminRoute> }
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
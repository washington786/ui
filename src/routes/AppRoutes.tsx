// router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";

// Pages
import { Issues, Login, NotFound, Profile, Register } from "../pages";
import { Layout } from "../components";

const router = createBrowserRouter([
    // Root → redirect to auth login
    {
        path: '/',
        element: <Navigate to="/auth/login" />,
    },

    // Dashboard routes (with layout)
    {
        path: '/dashboard',
        element: <Layout />,
        children: [
            { index: true, element: <Issues /> },
            { path: 'profile', element: <Profile /> },
        ],
    },

    // Auth routes
    {
        path: '/auth',
        children: [
            { index: true, element: <Navigate to="login" /> }, // ✅ Relative redirect
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
        ],
    },

    // 404
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;
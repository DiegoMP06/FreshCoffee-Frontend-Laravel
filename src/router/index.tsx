import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../views/Home";
import AdminLayout from "../layouts/AdminLayout";
import Orders from "../views/Admin/Orders";
import Products from "../views/Admin/Products";
import CreateProduct from "../views/Admin/CreateProduct";
import EditProduct from "../views/Admin/EditProduct";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            }
        ]
    }, 
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '',
                element: <Orders />,
            },
            {
                path: 'products',
                element: <Products />,
            },
            {
                path: 'products/create',
                element: <CreateProduct />,
            },
            {
                path: 'products/:id/edit',
                element: <EditProduct />,
            },
        ],
    }
]);

export default router;
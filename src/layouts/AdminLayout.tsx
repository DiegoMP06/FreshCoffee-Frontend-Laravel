import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import useAuth from "../hooks/useAuth";
import AdminHeader from "../components/AdminHeader";
import AdminMobileMenu from "../components/AdminMobileMenu";

export default function AdminLayout() {
    const { user, logout } = useAuth({
        middleware: 'admin',
        url: '/',
    })

    return (
        <div className="md:flex md:overflow-hidden md:h-screen">
            <AdminSidebar user={user} logout={logout} />

            <AdminMobileMenu user={user} logout={logout} />

            <AdminHeader />

            <div className="flex-1 bg-gray-100 overflow-y-auto min-h-screen">
                <main className="px-4 py-6 container mx-auto mt-16 md:mt-0">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

import { Outlet } from "react-router-dom";

export default function AuthLayout() {

    return (
        <div className="flex flex-col ">
            <picture className="max-w-96 mx-auto px-4 pt-10 pb-10">
                <img src="/logo.png" alt="Imagen de Logo" className="block w-full" />
            </picture>

            <div className="flex-1 w-full mx-auto max-w-2xl px-4 py-10">
                <main className="bg-gray-100 shadow-lg rounded p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

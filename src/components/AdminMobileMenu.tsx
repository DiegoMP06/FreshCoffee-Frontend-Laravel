import { Dialog, DialogPanel } from "@headlessui/react";
import useKiosk from "../hooks/useKiosk";
import { User } from "../schemas";
import AppService from "../services/AppService";
import { Link } from "react-router-dom";

type Props = {
    user?: User;
    logout: () => void;
};

export default function AdminMobileMenu({ user, logout }: Props) {
    const { state, dispatch } = useKiosk();
    const handleLogout = () => AppService.csrf(logout);

    return (
        <Dialog open={state.menu} onClose={() => dispatch({ type: "handle-click-menu" })} className="md:hidden relative z-50">
            <div className="fixed inset-0 bg-white/50 flex justify-end">
                <DialogPanel className="max-w-lg w-2/3 px-4 py-6 bg-white overflow-y-auto">
                    <picture className="block mb-6">
                        <img src="/logo.png" alt="Logotipo de FreshCoffee" className="block max-w-52 w-full" />
                    </picture>

                    <p className="text-xl my-6">
                        Hola: {''}
                        <span className="font-bold">
                            {user?.name}
                        </span>
                    </p>

                    <div className="my-6 grid grid-cols-1">
                        <Link className="text-gray-700 font-bold px-4 py-2 border text-xl hover:text-white hover:bg-cyan-600 transition-colors truncate block" to="/admin">
                            Ordenes
                        </Link>

                        <Link className="text-gray-700 font-bold px-4 py-2 border text-xl hover:text-white hover:bg-cyan-600 transition-colors truncate block" to="/admin/products">
                            Productos
                        </Link>
                    </div>

                    <button
                        className="my-6 block w-full bg-red-500 hover:bg-red-600 px-4 py-2 transition-colors text-white font-bold truncate uppercase"
                        title="Cancelar Orden"
                        onClick={handleLogout}
                    >
                        Cerrar Sesion
                    </button>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

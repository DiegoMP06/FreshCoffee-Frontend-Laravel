import useKiosk from "../hooks/useKiosk";
import { User } from "../schemas";
import AppService from "../services/AppService";
import Category from "./Category";

type Props = {
    user?: User;
    logout: () => void;
};

export default function Sidebar({ logout, user }: Props) {
    const { state } = useKiosk();

    const handleLogout = () => AppService.csrf(logout);

    return (
        <aside className="hidden md:block md:w-52 xl:w-72 px-4 py-6 overflow-y-auto">
            <picture className="block mb-6">
                <img src="/logo.png" alt="Logotipo de FreshCoffee" className="block max-w-52 w-full" />
            </picture>

            <p className="text-xl my-6">
                Hola: {''}
                <span className="font-bold">
                    {user?.name}
                </span>
            </p>

            <div className="my-6">
                {state.categories.map((category) => (
                    <Category key={category.id} category={category} />
                ))}
            </div>

            <button
                className="my-6 block w-full bg-red-500 hover:bg-red-600 px-4 py-2 transition-colors text-white font-bold truncate uppercase"
                title="Cancelar Orden"
                onClick={handleLogout}
            >
                Cancelar Orden
            </button>
        </aside>
    )
}

import { useMemo } from "react";
import useKiosk from "../hooks/useKiosk";
import type { Category } from "../schemas"

type CategoryProps = {
    category: Category;
}

export default function Category({ category }: CategoryProps) {
    const { dispatch, state } = useKiosk();
    const { name, icon, id } = category;

    const currentCategoryClasses = useMemo(() => (id: Category['id']) => state.currentCategory.id === id ? 'bg-cyan-600 text-white' : 'text-gray-700', [state.currentCategory]);

    return (
        <button
            type="button"
            className={`flex items-center gap-4 border w-full px-4 py-2 hover:bg-cyan-600 hover:text-white transition-colors cursor-pointer ${currentCategoryClasses(id)}`}
            title={name}
            onClick={() => dispatch({ type: 'set-current-category', payload: { id } })}
        >
            <img
                src={`${import.meta.env.VITE_BACKEND_URL}/storage/categories/${icon}`}
                alt={`icono de la categoria ${name}`}
                className="size-12"
            />

            <p className="text-lg font-bold truncate">
                {name}
            </p>
        </button>
    )
}

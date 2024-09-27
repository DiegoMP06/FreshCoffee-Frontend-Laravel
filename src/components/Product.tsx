import { useMemo } from "react";
import { formatCurrency } from "../helpers";
import useKiosk from "../hooks/useKiosk";
import type { Product } from "../schemas";

type ProductProps = {
    product: Product;
}

export default function Product({ product }: ProductProps) {
    const { dispatch, state } = useKiosk();
    const { name, price, image } = product

    const isInOrder = useMemo(() => (id: Product['id']) => state.order.some(item => item.id === id), [state.order]);

    return (
        <div className="shadow-lg bg-white flex flex-col">
            <img
                src={`${import.meta.env.VITE_BACKEND_URL}/storage/products/${image}`}
                alt={`imagen del producto ${name}`}
                className="border"
            />

            <div className="p-4 space-y-5">
                <h3 className="text-2xl font-bold text-gray-700 truncate" title={name}>
                    {name}
                </h3>

                <p className="text-4xl font-bold text-cyan-600">
                    {formatCurrency(Number(price))}
                </p>

                <button
                    type="button"
                    className="text-white font-bold uppercase bg-cyan-950 hover:bg-cyan-900 transition-colors px-4 py-2 w-full"
                    onClick={() => dispatch({type: 'handle-click-modal', payload: {product}})}
                >
                    { isInOrder(product.id) ? 'Editar' : 'Añadir'}
                </button>
            </div>
        </div>
    )
}

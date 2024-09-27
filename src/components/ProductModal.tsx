import { useEffect, useState } from "react";
import { formatCurrency } from "../helpers";
import useKiosk from "../hooks/useKiosk"
import { OrderItem } from "../types";
import { toast } from "react-toastify";

export default function ProductModal() {
    const { state, dispatch } = useKiosk();
    const [quantity, setQuantity] = useState(1);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const item = state.order.find(item => item.id === state.currentProduct.id);

        if(item) {
            setEdit(true);
            setQuantity(item.quantity);
        }
    }, [state.currentProduct]);

    const MAX_QUANTITY = 5;
    const MIN_QUANTITY = 1;

    const handleAddQuantity = () =>
        quantity < MAX_QUANTITY && setQuantity(quantity + 1);

    const handleSubstractQuantity = () =>
        quantity > MIN_QUANTITY && setQuantity(quantity - 1);

    const handleSaveOrder = () => {
        const existItem = state.order.some(item => item.id === state.currentProduct.id);

        const {id, name, price, image} = state.currentProduct

        const item: OrderItem = {
            id,
            name,
            price,
            image,
            quantity
        }

        if(existItem) {
            dispatch({ type: 'update-order', payload: {item} });
            toast.success(`Se actualizo ${name} en el pedido`.toUpperCase());
            return;
        }
        
        dispatch({ type: 'add-to-order', payload: {item} })
        toast.success(`Se agrego ${name} al pedido`.toUpperCase());
    }

    return (
        <>
            <button
                type="button"
                className="text-white bg-red-500 hover:bg-red-600 transition-colors rounded-full p-2 fixed top-5 right-5"
                onClick={() => dispatch({ type: 'handle-click-modal', payload: {} })}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="md:flex gap-4">
                <div className="md:w-1/3">
                    <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/products/${state.currentProduct.image}`} alt={`Imagen del Producto ${state.currentProduct.name}`} />
                </div>

                <div className="md:w-2/3 flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-5">
                        <h1 className="text-2xl font-bold">
                            {state.currentProduct.name}
                        </h1>

                        <p className="font-bold text-4xl text-cyan-600">
                            {formatCurrency(Number(state.currentProduct.price))}
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex gap-4">
                            <button type="button" onClick={handleSubstractQuantity}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>

                            <p className="text-3xl">
                                {quantity}
                            </p>

                            <button type="button" onClick={handleAddQuantity}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>
                        </div>

                        <button
                            type="button"
                            className="bg-cyan-950 hover:bg-cyan-900 transition-colors text-white font-bold w-full block px-4 py-2 uppercase"
                            onClick={handleSaveOrder}
                        >
                            { edit ? 'Actualizar en el pedido' : 'Añadir al pedido' }
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

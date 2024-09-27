import Swal from "sweetalert2";
import { formatCurrency } from "../helpers";
import { OrderItem } from "../types"
import useKiosk from "../hooks/useKiosk";
import { toast } from "react-toastify";

type ProductSummaryProps = {
    item: OrderItem;
}

export default function ProductSummary({ item }: ProductSummaryProps) {
    const { dispatch } = useKiosk();
    const { id, name, price, quantity } = item;

    const handleDelete = () => {
        Swal.fire({
            title: '¡Atención!',
            text: '¿Deseas Eliminar de Tu Order?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            showConfirmButton: true,
            confirmButtonText: 'Si',
        })
            .then((response) => {
                if (response.isConfirmed) {
                    dispatch({ type: 'delete-item-order', payload: { id } })
                    toast.success('Se Elimino de tu orden'.toUpperCase());
                }
            })
    }

    return (
        <div className="space-y-1 p-4 bg-gray-100 shadow-lg">
            <div className="space-y-2">
                <p className="text-xl font-bold">
                    {name}
                </p>

                <p className="text-lg font-bold ">
                    Cantidad: {quantity}
                </p>

                <p className="text-lg font-bold text-cyan-600">
                    Precio: {formatCurrency(Number(price))}
                </p>

                <p className="text-lg text-gray-700">
                    Subtotal: {formatCurrency(Number(price) * quantity)}
                </p>
            </div>

            <div className="flex justify-between gap-2 pb-4">
                <button
                    type="button"
                    className="bg-sky-600 hover:bg-sky-700 transition-colors p-2 text-white font-bold uppercase text-center"
                    onClick={() => dispatch({ type: 'handle-edit-item', payload: { id } })}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>

                <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 transition-colors p-2 text-white font-bold uppercase text-center"
                    onClick={handleDelete}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}

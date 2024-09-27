import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Product } from "../schemas";
import { formatCurrency } from "../helpers";
import KioskService from "../services/KioskService";
import { toast } from "react-toastify";

type Props = {
    product: Product;
}

export default function ProductAdmin({ product }: Props) {
    const { id, name, price, image, available } = product

    const handleClikAvailable = () => {
        const FD = new FormData();

        FD.append('available', Number(!available).toString());

        KioskService.updateProduct(id, FD)
            .then(() => toast.success('El estado del producto se Actualizo Exitosamente'.toUpperCase()))
            .catch(() => toast.error('Ocurrio un error'.toUpperCase()))
    }

    const isAvailable = useMemo(() => available === 1, [available]);

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

                <div className="flex flex-col md:flex-row gap-4">
                    <Link
                        to={`/admin/products/${product.id}/edit`}
                        type="button"
                        className="text-white font-bold text-center uppercase bg-cyan-950 hover:bg-cyan-900 transition-colors px-4 py-2 w-full"
                    >
                        Editar
                    </Link>

                    <button
                        type="button"
                        className={`text-white font-bold text-center uppercase ${isAvailable ? 'bg-red-600 hover:bg-red-700': 'bg-green-600 hover:bg-green-700'} transition-colors px-4 py-2 w-full`}
                        onClick={handleClikAvailable}
                    >
                        { isAvailable ? 'Sin Stock' : 'Disponible' }
                    </button>
                </div>
            </div>
        </div>
    )
}

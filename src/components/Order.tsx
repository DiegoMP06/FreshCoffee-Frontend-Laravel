import { toast } from "react-toastify";
import { formatCurrency } from "../helpers";
import { type Order } from "../schemas"
import KioskService from "../services/KioskService";

type Props = {
    order: Order;
}

export default function Order({ order }: Props) {
    const handleCompleteOrder = () => {
        KioskService.updateOrder(order.id)
            .then(() => toast.success('Tu Pedido se Completo Exitosamente'.toUpperCase()))
            .catch(() => toast.error('Ocurrio un Error al Completar el Pedido'.toUpperCase()));
    }

    return (
        <div className="p-5 bg-white shadow space-y-2 border-b" key={order.id}>
            <p className="text-xl font-bold text-slate-600">Contenido del Pedido: </p>

            <div>
                {order.products.map(product => (
                    <div className="border-b border-b-slate-200 last-of-type:border-none py-4" key={product.id}>
                        <p className="text-sm text-gray-700">ID: {''}
                            <span className="font-bold">{product.id}</span>
                        </p>

                        <p className="font-bold text-gray-700">{product.name}</p>

                        <p className="text-gray-700">
                            Cantidad: {''}
                            <span className="font-bold">{product.pivot.quantity}</span>
                        </p>
                    </div>
                ))}
            </div>

            <p className="font-bold text-lg text-gray-700">
                Cliente: {' '}
                <span className="font-normal">{order.user.name}</span>
            </p>

            <p className="font-bold text-lg text-cyan-600">
                Total a Pagar: {' '}
                <span className="font-normal text-gray-700">{formatCurrency(Number(order.total))}</span>
            </p>

            <button onClick={handleCompleteOrder} type="button" className='bg-cyan-950 hover:bg-cyan-900 px-5 py-2 rounded uppercase font-bold text-white transition-colors text-center w-full cursor-pointer md:w-auto'>Completar</button>
        </div>
    )
}

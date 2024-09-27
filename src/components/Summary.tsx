import useKiosk from "../hooks/useKiosk";
import ProductSummary from "./ProductSummary";
import { formatCurrency } from "../helpers";

type Props = {
    handleNewOrder: () => void;
    isEmptyOrder: boolean;
};
export default function Summary({ handleNewOrder, isEmptyOrder }: Props) {
    const { state } = useKiosk();

    return (
        <aside className="hidden md:block md:w-72 xl:w-80 px-4 py-6 overflow-y-auto">
            <h2 className="text-3xl text-gray-700 font-bold mb-6">
                Resumen:
            </h2>

            <p className="my-6 text-gray-700 text-lg">
                Aqui puedes ver el resumen de tu pedido
            </p>

            <div className="my-6 ">
                {isEmptyOrder ? (
                    <p className="font-bold text-gray-700 text-center text-lg">
                        No Hay Elementos En El Pedido
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {state.order.map(item => (
                            <ProductSummary key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </div>

            <p className="my-6 text-xl">
                Total: {''}
                <span className="font-bold">
                    {formatCurrency(state.total)}
                </span>
            </p>

            <button
                type="button"
                className="text-white font-bold uppercase w-full block px-4 py-2 bg-cyan-950 hover:bg-cyan-900 transition-colors disabled:opacity-25 disabled:bg-cyan-900"
                disabled={isEmptyOrder}
                onClick={handleNewOrder}
            >
                Confirmar Pedido
            </button>
        </aside>
    )
}

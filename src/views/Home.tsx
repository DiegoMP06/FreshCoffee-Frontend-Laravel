import useKiosk from "../hooks/useKiosk"
import Product from '../components/Product';

export default function Home() {
    const { state } = useKiosk();

    const currentProducts = state.products.filter(product => product.category_id === state.currentCategory.id);

    return (
        <>
            <h1 className="font-bold text-3xl text-gray-700 mb-5">
                {state.currentCategory.name}
            </h1>

            <p className="text-gray-700 text-lg my-6">
                Elije y personaliza tu pedido a continuación.
            </p>

            <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {currentProducts.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}

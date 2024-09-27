import { Link } from "react-router-dom";
import ProductAdmin from "../../components/ProductAdmin";
import useKiosk from "../../hooks/useKiosk";

export default function Products() {
    const { state } = useKiosk();

    return (
        <>
            <h1 className="font-bold text-3xl text-gray-700 mb-5">
                Productos
            </h1>

            <p className="text-gray-700 text-lg my-6">
                Aqui puedes administar todos los productos.
            </p>

            <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {state.products.map(product => (
                    <ProductAdmin key={product.id} product={product} />
                ))}
            </div>

            <div>
                <Link to="/admin/products/create" className="block text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 p-2 rounded-full fixed bottom-5 right-5">
                    <svg className="size-10" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg>
                </Link>
            </div>
        </>
    )
}

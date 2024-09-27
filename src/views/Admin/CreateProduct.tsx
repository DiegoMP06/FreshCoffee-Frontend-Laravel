import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Catch, DraftProduct } from "../../types";
import KioskService from "../../services/KioskService";
import ProductForm from "../../components/ProductForm";


export default function CreateProduct() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<DraftProduct>()

    const onSubmit = (data: DraftProduct) => {
        if (!data?.image?.length || data?.image.length === 0) return;
        const FD = new FormData();
        
        FD.append('name', data.name);
        FD.append('price', data.price.toString());
        FD.append('image', data?.image[0]);
        FD.append('category_id', data.category_id.toString());

        KioskService.createProduct(FD)
            .then(() => {
                navigate('/admin/products')
                toast.success('El producto se Creó Exitosamente'.toUpperCase())
            })
            .catch((error: Catch<DraftProduct>) =>
                error.response?.status === 422 ?
                    Object.values(error.response.data.errors).forEach((error) => error.forEach((err) => toast.error(err.toUpperCase()))) :
                    toast.error('Ocurrio un error'.toUpperCase())
            );
    }

    return (
        <>
            <h1 className="font-bold text-3xl text-gray-700 mb-5">
                Agregar Producto
            </h1>

            <p className="text-gray-700 text-lg my-6">
                Aqui puedes agregar nuevos productos a tu menú.
            </p>

            <div className="my-6 max-w-2xl mx-auto">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <ProductForm register={register} errors={errors} />

                    <input type="submit" value="Agregar Producto" className="bg-cyan-600 hover:bg-cyan-700 transition-colors text-white w-full block font-bold px-4 py-2 rounded cursor-pointer uppercase" />
                </form>
            </div>
        </>
    )
}

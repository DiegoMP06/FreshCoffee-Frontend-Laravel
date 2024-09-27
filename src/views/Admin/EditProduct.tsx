import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProductForm from "../../components/ProductForm";
import { Catch, DraftProduct } from "../../types";
import { useEffect, useState } from "react";
import { ProductSchema } from "../../schemas";
import KioskService from "../../services/KioskService";
import { toast } from "react-toastify";

export default function EditProduct() {
    const params = useParams();
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState('');

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<DraftProduct>()
    const id = Number(params.id as string);

    useEffect(() => {
        KioskService.getProduct(id)
            .then(({ data: { data: [data] } }) => {
                const result = ProductSchema.safeParse(data);

                if (result.success) {
                    const { name, price, image, category_id } = result.data;
                    setValue('name', name);
                    setValue('price', price);
                    setCurrentImage(image);
                    setValue('category_id', category_id);
                } else {
                    navigate('/admin/products');
                }
            })
            .catch(() => navigate('/admin/products'));
    }, []);

    const onSubmit = (data: DraftProduct) => {
        const FD = new FormData();

        FD.append('name', data.name);
        FD.append('price', data.price.toString());
        if(data?.image?.length && data?.image.length > 0) 
            FD.append('image', data?.image[0]);	
        FD.append('category_id', data.category_id.toString());

        KioskService.updateProduct(id, FD)
            .then(() => {
                navigate('/admin/products');
                toast.success('El producto se Editó Exitosamente'.toUpperCase());
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
                Editar Producto
            </h1>

            <p className="text-gray-700 text-lg my-6">
                Aqui puedes editar los productos de tu menú.
            </p>

            <div className="my-6 max-w-2xl mx-auto">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <ProductForm 
                        register={register} 
                        errors={errors} 
                        edit
                        currentImage={currentImage}
                    />

                    <input type="submit" value="Agregar Producto" className="bg-cyan-600 hover:bg-cyan-700 transition-colors text-white w-full block font-bold px-4 py-2 rounded cursor-pointer uppercase" />
                </form>
            </div>
        </>
    )
}

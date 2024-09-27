import { FieldErrors, UseFormRegister } from "react-hook-form"
import { DraftProduct } from "../types";
import useKiosk from "../hooks/useKiosk";

type Props = {
    register: UseFormRegister<DraftProduct>;
    errors: FieldErrors<DraftProduct>;
    edit?: boolean;
    currentImage?: string;
}
export default function ProductForm({ register, errors, edit, currentImage }: Props) {
    const { state } = useKiosk();

    return (
        <>
            <div className="space-y-2">
                <label htmlFor="name" className="w-full block text-lg font-bold text-gray-700">
                    Nombre:
                </label>

                <input
                    type="text"
                    id="name"
                    placeholder="Nombre del Producto"
                    className="w-full block px-4 py-2 rounded bg-white placeholder:text-gray-400 text-gray-700"
                    {...register('name', {
                        required: {
                            value: true,
                            message: 'El nombre es requerido',
                        },
                        maxLength: {
                            value: 255,
                            message: 'El nombre no puede superar los 255 caracteres',
                        },
                    })}
                />

                {errors.name && <p className="text-red-700 font-bold text-sm uppercase py-2 pl-4 pr-10 border-l-4 border-red-700 bg-red-200 rounded">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="price" className="w-full block text-lg font-bold text-gray-700">
                    Precio:
                </label>

                <input
                    type="number"
                    id="price"
                    placeholder="Precio del Producto"
                    className="w-full block px-4 py-2 rounded bg-white placeholder:text-gray-400 text-gray-700"
                    {...register('price', {
                        required: {
                            value: true,
                            message: 'El precio es requerido',
                        },
                        min: {
                            value: 0,
                            message: 'El precio debe ser mayor a 0',
                        },
                        valueAsNumber: true,
                    })}
                />

                {errors.price && <p className="text-red-700 font-bold text-sm uppercase py-2 pl-4 pr-10 border-l-4 border-red-700 bg-red-200 rounded">{errors.price.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="image" className="w-full block text-lg font-bold text-gray-700">
                    Imagen:
                </label>

                <input
                    type="file"
                    accept="image/*"
                    id="image"
                    className="w-full block px-4 py-2 rounded bg-white placeholder:text-gray-400 text-gray-700"
                    {...register('image', {
                        required: {
                            value: edit ? false : true,
                            message: 'La imagen es requerida',
                        },
                        max: {
                            value: 1028,
                            message: 'La imagen no puede superar los 1028KB',
                        }
                    })}
                />


                {errors.image && <p className="text-red-700 font-bold text-sm uppercase py-2 pl-4 pr-10 border-l-4 border-red-700 bg-red-200 rounded">{errors.image.message}</p>}
            </div>

            {(edit && currentImage) && (
                <div className="space-y-2">
                    <p className="w-full block text-lg font-bold text-gray-700">
                        Imagen actual
                    </p>

                    <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/storage/products/${currentImage}`}
                        alt="Imagen del producto a editar"
                        className="w-full max-w-64 mt-6 block rounded"
                    />
                </div>
            )}

            <div className="space-y-2">
                <label htmlFor="category_id" className="w-full block text-lg font-bold text-gray-700">
                    Categoria:
                </label>

                <select
                    id="category_id"
                    className="w-full block px-4 py-2 rounded bg-white placeholder:text-gray-400 text-gray-700"
                    {...register('category_id', {
                        required: {
                            value: true,
                            message: 'La categoria es requerida',
                        },
                        valueAsNumber: true,
                    })}
                >
                    {state.categories.map(({ id, name }) => (
                        <option value={id} key={id}>
                            {name}
                        </option>
                    ))}
                </select>

                {errors.category_id && <p className="text-red-700 font-bold text-sm uppercase py-2 pl-4 pr-10 border-l-4 border-red-700 bg-red-200 rounded">{errors.category_id.message}</p>}
            </div>
        </>
    )
}

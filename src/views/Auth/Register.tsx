import { useForm } from "react-hook-form"
import { UserRegister } from "../../types";
import useAuth from "../../hooks/useAuth";
import AppService from "../../services/AppService";
import { Link } from "react-router-dom";

export default function Register() {
    const { register: auth } = useAuth({ middleware: 'guest', url: '/' })

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<UserRegister>();

    const onSubmit = (data: UserRegister) => 
        AppService.csrf(() => auth(data))

    return (
        <>
            <h1 className="font-black text-2xl text-cyan-600 mb-6">Crear Cuenta</h1>

            <form
                className="space-y-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="space-y-2">
                    <label htmlFor="name" className="w-full block text-lg font-bold text-gray-700">
                        Nombre:
                    </label>

                    <input
                        type="text"
                        id="name"
                        placeholder="Tu Nombre"
                        autoComplete="email"
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
                    <label htmlFor="email" className="w-full block text-lg font-bold text-gray-700">
                        Email:
                    </label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Tu Email"
                        autoComplete="email"
                        className="w-full block px-4 py-2 rounded bg-white placeholder:text-gray-400 text-gray-700"
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'El email es requerido',
                            },
                            maxLength: {
                                value: 255,
                                message: 'El email no puede superar los 255 caracteres',
                            },
                        })}
                    />

                    {errors.email && <p className="text-red-700 font-bold text-sm uppercase py-2 pl-4 pr-10 border-l-4 border-red-700 bg-red-200 rounded">{errors.email.message}</p>}

                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="w-full block text-lg font-bold text-gray-700">
                        Password:
                    </label>

                    <input
                        type="password"
                        id="password"
                        placeholder="Tu Password"
                        autoComplete="current-password"
                        className="w-full block px-4 py-2 rounded bg-white placeholder:text-gray-400 text-gray-700"
                        {...register('password', {
                            required: {
                                value: true,
                                message: 'El password es requerido',
                            },
                            minLength: {
                                value: 6,
                                message: 'El password debe contener al menos 6 caracteres',
                            }
                        })}
                    />

                    {errors.password && <p className="text-red-700 font-bold text-sm uppercase py-2 pl-4 pr-10 border-l-4 border-red-700 bg-red-200 rounded">{errors.password.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="password_confirmation" className="w-full block text-lg font-bold text-gray-700">
                        Repetir Password:
                    </label>

                    <input
                        type="password"
                        id="password_confirmation"
                        placeholder="Repite tu Password"
                        autoComplete="current-password"
                        className="w-full block px-4 py-2 rounded bg-white placeholder:text-gray-400 text-gray-700"
                        {...register('password_confirmation', {
                            required: {
                                value: true,
                                message: 'El password es requerido',
                            },
                            validate: (value) => value === getValues('password') || 'Los passwords no coinciden',
                        })}
                    />

                    {errors.password_confirmation && <p className="text-red-700 font-bold text-sm uppercase py-2 pl-4 pr-10 border-l-4 border-red-700 bg-red-200 rounded">{errors.password_confirmation.message}</p>}
                </div>

                <input type="submit" value="Iniciar Sesion" className="bg-cyan-600 hover:bg-cyan-700 transition-colors text-white w-full block font-bold px-4 py-2 rounded cursor-pointer uppercase" />
            </form>
            
            <Link to="/auth/login" className="text-lg font-semibold text-cyan-600 hover:underline block mt-6">
                ¿Ya Tienes una Cuenta? Iniciar Sesión
            </Link>
        </>
    )
}

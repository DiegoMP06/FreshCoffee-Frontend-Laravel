import { useForm } from "react-hook-form"
import useAuth from "../../hooks/useAuth"
import { UserLogin } from "../../types";
import AppService from "../../services/AppService";
import { Link } from "react-router-dom";

export default function Login() {
    const { login } = useAuth({ middleware: 'guest', url: '/' })

    const { register, handleSubmit, formState: { errors } } = useForm<UserLogin>();

    const onSubmit = (data: UserLogin) =>
        AppService.csrf(() => login(data))

    return (
        <>
            <h1 className="font-black text-2xl text-cyan-600 mb-6">Login</h1>

            <div className="">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                                }
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
                                }
                            })}
                        />

                        {errors.password && <p className="text-red-700 font-bold text-sm uppercase py-2 pl-4 pr-10 border-l-4 border-red-700 bg-red-200 rounded">{errors.password.message}</p>}
                    </div>

                    <input type="submit" value="Iniciar Sesion" className="bg-cyan-600 hover:bg-cyan-700 transition-colors text-white w-full block font-bold px-4 py-2 rounded cursor-pointer uppercase" />
                </form>
            </div>

            <Link to="/auth/register" className="text-lg font-semibold text-cyan-600 hover:underline block mt-6">
                ¿No Tienes una Cuenta Aun? Crear Cuenta
            </Link>
        </>
    )
}

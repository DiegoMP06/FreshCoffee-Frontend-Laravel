import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import AuthService from "../services/AuthService";
import { Catch, UserLogin, UserRegister } from "../types";
import { z } from "zod";
import { UserSchema } from "../schemas";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useKiosk from "./useKiosk";

export default function useAuth({
    middleware = null,
    url = "",
}: {
    middleware: string | null;
    url: string;
}) {
    const navigate = useNavigate();
    const { dispatch, state } = useKiosk();

    const {
        data: user,
        mutate,
        error,
    } = useSWR("/user", () =>
        AuthService.user()
            .then(({ data }) => {
                const result = UserSchema.safeParse(data);

                if (result.success) {
                    return result.data;
                } else {
                    throw new Error("Not authenticated");
                }
            })
            .catch(() => {
                throw new Error("Not authenticated");
            })
    );

    const register = async (data: UserRegister) => {
        try {
            const { data: response } = await AuthService.register(data);

            const result = z
                .object({
                    token: z.string(),
                    user: UserSchema,
                })
                .safeParse(response);

            if (result.success) {
                localStorage.setItem("AUTH_TOKEN", result.data.token);

                await mutate();
            } else {
                throw new Error("Ocurrio un error");
            }
        } catch (error) {
            const newError = error as Catch<UserRegister>;
            if (newError?.response?.status === 422) {
                Object.values(newError.response.data.errors).forEach((error) =>
                    error.forEach((err) => toast.error(err.toUpperCase()))
                );
            } else {
                toast.error("Ocurrio un error".toUpperCase());
            }
        }
    };

    const login = async (data: UserLogin) => {
        try {
            const { data: response } = await AuthService.login(data);

            const result = z
                .object({
                    token: z.string(),
                    user: UserSchema,
                })
                .safeParse(response);

            if (result.success) {
                localStorage.setItem("AUTH_TOKEN", result.data.token);

                await mutate();
            } else {
                throw new Error("Ocurrio un error");
            }
        } catch (error) {
            const newError = error as Catch<UserLogin>;
            if (newError?.response?.status === 422) {
                Object.values(newError.response.data.errors).forEach((error) =>
                    error.forEach((err) => toast.error(err.toUpperCase()))
                );
            } else {
                toast.error("Ocurrio un error".toUpperCase());
            }
        }
    };

    const logout = async () => {
        try {
            await AuthService.logout();

            localStorage.removeItem("AUTH_TOKEN");
            dispatch({type: 'reset-order'})
            if(state.menu) dispatch({type: 'handle-click-menu'});
            if(state.cart) dispatch({type: 'handle-click-cart'});
            await mutate(undefined);
        } catch {
            toast.error("Ocurrio un error".toUpperCase());
        }
    };

    useEffect(() => {
        if (middleware === "guest" && user) {
            navigate(url);
        }

        if ((middleware === "guest" || middleware === "auth") && user && user.admin) {
            navigate("/admin");
        }

        if (middleware === "admin" && user && !user.admin) {
            navigate("/");
        }

        if ((middleware === "auth" || middleware === 'admin') && error) {
            navigate("/auth/login");
        }
    }, [user, error]);

    return {
        user,
        register,
        login,
        logout,
    };
}

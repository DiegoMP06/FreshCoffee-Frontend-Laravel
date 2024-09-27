import { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { initialState, KioskActions, kioskReducer, KioskState } from "../reducers/KioskReducer";
import KioskService from "../services/KioskService";
import { CategorySchema, ProductSchema } from "../schemas";
import useSWR from "swr";
import { z } from "zod";
import { toast } from "react-toastify";

export type KioskContextProps = {
    state: KioskState;
    dispatch: Dispatch<KioskActions>;
}

export const KioskContext = createContext<KioskContextProps>(null!);

export const KioskProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(kioskReducer, initialState);

    const fetcher = () =>
        KioskService.getProducts()
            .then(({ data: { data } }) => {
                const result = z.array(ProductSchema).safeParse(data)
                return result.success ? result.data : [];
            });

    const { data } = useSWR('/products', fetcher, {
        refreshInterval: 3000,
    });

    const getCategories = async () => {
        try {
            const { data: { data } } = await KioskService.getCategories();
            const result = z.array(CategorySchema).safeParse(data);

            if (result.success) {
                dispatch({ type: 'set-categories', payload: { categories: result.data } });
            } else {
                throw new Error('Ocurrio un error');
            }
        } catch {
            toast.error('Ocurrio un error');
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if (data) dispatch({ type: 'set-products', payload: { products: data } });
    }, [data]);

    useEffect(() => {
        if (state.menu || state.cart || state.modal) document.body.classList.add('overflow-hidden')
        else document.body.classList.remove('overflow-hidden');
    }, [state.menu, state.cart, state.modal]);

    return (
        <KioskContext.Provider value={{ state, dispatch }}>
            {children}
        </KioskContext.Provider>
    )
}
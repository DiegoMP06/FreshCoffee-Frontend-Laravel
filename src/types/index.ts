import { AxiosError } from "axios";
import { Product, User } from "../schemas";

export type OrderItem = Omit<Product, 'created_at' | 'updated_at' | 'category_id' | 'available'> & {
    quantity: number;
};

export type UserLogin = Pick<User, 'email'> & {
    password: string;
}

export type UserRegister = Pick<User, 'name' | 'email'> & {
    password: string;
    password_confirmation: string;
};


export type ErrorDataMessage<T = Record<string, unknown>> = {
    message: string
    errors: Record<keyof T, string[]>
}

export type Catch<T = Record<string, unknown>> = AxiosError<ErrorDataMessage<T>>

export type DraftOrderProduct = {
    quantity: number;
    product_id: number;
};

export type DraftOrder = {
    products: DraftOrderProduct[],
    total: number;
}

export type DraftProduct = Omit<Product, 'created_at' | 'updated_at' | 'available' | 'id' | 'image'> & {
    image?: FileList;
}
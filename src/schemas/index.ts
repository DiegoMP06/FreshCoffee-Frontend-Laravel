import { z } from "zod";

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    icon: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.string(),
    image: z.string(),
    available: z.number(),
    category_id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    admin: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const OrderSchema = z.object({
    id: z.number(),
    total: z.string(),
    complete: z.number(),
    user_id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    user: UserSchema,
    products: z.array(ProductSchema.extend({
        pivot: z.object({
            order_id: z.number(),
            product_id: z.number(),
            quantity: z.number()
        })
    }))
});

export type Order = z.infer<typeof OrderSchema>;
import categories from "../data/categories";
import { OrderItem } from "../types";
import { Category, Product } from "../schemas";

export type KioskActions =
    | { type: "set-current-category"; payload: { id: Category["id"] } }
    | { type: "handle-click-modal"; payload: { product?: Product } }
    | { type: "handle-click-menu" }
    | { type: "handle-click-cart" }
    | { type: "add-to-order"; payload: { item: OrderItem } }
    | { type: "update-order"; payload: { item: OrderItem } }
    | { type: "set-total"; payload: { total: number } }
    | { type: "delete-item-order"; payload: { id: OrderItem["id"] } }
    | { type: "handle-edit-item"; payload: { id: OrderItem["id"] } }
    | { type: "set-products"; payload: { products: Product[] } }
    | { type: "set-categories"; payload: { categories: Category[] } }
    | { type: "reset-order" };

export type KioskState = {
    categories: Category[];
    products: Product[];
    currentCategory: Category;
    modal: boolean;
    menu: boolean;
    cart: boolean;
    total: number;
    currentProduct: Product;
    order: OrderItem[];
};

const initialProduct: Product = {
    id: 0,
    name: "",
    price: "0.00",
    image: "",
    available: 0,
    category_id: 0,
    created_at: "",
    updated_at: "",
};
const initialCategory: Category = {
    id: 0,
    name: "",
    icon: "",
    created_at: "",
    updated_at: "",
};

export const initialState: KioskState = {
    categories: [],
    products: [],
    currentCategory: initialCategory,
    modal: false,
    menu: false,
    cart: false,
    total: 0,
    currentProduct: initialProduct,
    order: [],
};

export const kioskReducer = (
    state: KioskState,
    action: KioskActions
): KioskState => {
    if (action.type === "set-current-category") {
        const currentCategory = state.categories.find(
            (category) => category.id === action.payload.id
        );

        return {
            ...state,
            menu: false,
            currentCategory: currentCategory
                ? structuredClone(currentCategory)
                : state.currentCategory,
        };
    }

    if (action.type === "handle-click-modal") {
        return {
            ...state,
            modal: !state.modal,
            currentProduct: action.payload.product
                ? structuredClone(action.payload.product)
                : initialProduct,
        };
    }

    if(action.type === "handle-click-menu") {
        return {
            ...state,
            menu: !state.menu,
        }
    }

    if(action.type === "handle-click-cart") {
        return {
            ...state,
            cart: !state.cart,
        }
    }

    if (action.type === "add-to-order") {
        return {
            ...state,
            order: [...state.order, action.payload.item],
            modal: false,
            currentProduct: initialProduct,
        };
    }

    if (action.type === "update-order") {
        const orderUpdated = state.order.map((item) =>
            item.id === action.payload.item.id ? action.payload.item : item
        );

        return {
            ...state,
            order: orderUpdated,
            modal: false,
            currentProduct: initialProduct,
        };
    }

    if (action.type === "set-total") {
        return {
            ...state,
            total: action.payload.total,
        };
    }

    if (action.type === "delete-item-order") {
        const orderUpdated = state.order.filter(
            (item) => item.id !== action.payload.id
        );

        return {
            ...state,
            order: orderUpdated,
        };
    }

    if (action.type === "handle-edit-item") {
        const currentProduct = state.products.find(
            (product) => product.id === action.payload.id
        );

        return {
            ...state,
            currentProduct: currentProduct
                ? structuredClone(currentProduct)
                : initialProduct,
            modal: true,
        };
    }

    if (action.type === "set-products") {
        return {
            ...state,
            products: action.payload.products,
        };
    }

    if (action.type === "set-categories") {
        return {
            ...state,
            categories: action.payload.categories,
            currentCategory: categories[0],
        };
    }

    if (action.type === "reset-order") {
        return {
            ...state,
            order: [],
            currentCategory: state.categories[0],
            total: 0,
            currentProduct: initialProduct,
            modal: false,
        };
    }

    return state;
};

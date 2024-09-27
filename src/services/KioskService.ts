import { api } from "../lib/axios"
import { Order, Product } from "../schemas";
import { DraftOrder } from "../types";

export default {
    createProduct(data: FormData) {
        return api.post('/products', data);
    },
    getProducts() {
        return api.get('/products');
    },
    getProduct(id: Product["id"]) {
        return api.get(`/products/${id}`);  
    },
    updateProduct(id: Product["id"], data: FormData) {
        return api.post(`/products/${id}?_method=PUT`, data);
    },
    getCategories() {
        return api.get('/categories');
    },
    createOrder(data: DraftOrder) {
        return api.post('/orders', data);
    },
    updateOrder(id: Order["id"]) {
        return api.patch('/orders/'+id);
    },
    getOrders() {
        return api.get('/orders');
    },
}
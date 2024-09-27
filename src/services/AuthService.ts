import { api } from "../lib/axios";
import { UserLogin, UserRegister } from "../types";

export default {
    user() {
        return api.get("/user");
    },
    login(data: UserLogin) {
        return api.post("/login", data, {
            baseURL: import.meta.env.VITE_BACKEND_URL,
        });
    },
    register(data: UserRegister) {
        return api.post('/register', data, {
            baseURL: import.meta.env.VITE_BACKEND_URL,
        });
    },
    logout() {
        return api.post("/logout", null, {
            baseURL: import.meta.env.VITE_BACKEND_URL,
        });
    }, 
};

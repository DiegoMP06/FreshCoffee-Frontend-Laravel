import { api } from "../lib/axios"

const Then = (data: unknown) => console.log(data)
const Catch = (error: unknown) => console.log(error)

export default {
    csrf(THEN = Then, CATCH = Catch) {
        api.get('/sanctum/csrf-cookie', {
            baseURL: import.meta.env.VITE_BACKEND_URL,
        })
            .then(THEN)
            .catch(CATCH)
    }
}
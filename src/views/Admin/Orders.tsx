import useSWR from "swr"
import KioskService from "../../services/KioskService"
import { z } from "zod"
import { OrderSchema } from "../../schemas"
import Order from "../../components/Order"

export default function Orders() {
    const fetcher = () =>
        KioskService.getOrders()
            .then(({ data: { data } }) => {
                const result = z.array(OrderSchema).safeParse(data);
                return result.success ? result.data : [];
            })

    const { data: orders } = useSWR('/orders', fetcher, {
        refreshInterval: 3000,
    });

    return (
        <>
            <h1 className="font-bold text-3xl text-gray-700 mb-5">
                Ordenes
            </h1>

            <p className="text-gray-700 text-lg my-6">
                Aqui puedes administar todas las ordenes.
            </p>

            <div className="my-6 grid grid-cols-1 gap-4">
                {orders?.map(order => <Order key={order.id} order={order} />)}
            </div>
        </>
    )
}

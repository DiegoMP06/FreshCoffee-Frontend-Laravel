import { Outlet } from "react-router-dom";
import Modal, { type Styles } from 'react-modal';
import Sidebar from "../components/Sidebar";
import Summary from "../components/Summary";
import useKiosk from "../hooks/useKiosk";
import ProductModal from "../components/ProductModal";
import { useEffect, useMemo } from "react";
import useAuth from "../hooks/useAuth";
import MainHeader from "../components/MainHEader";
import MainMobileMenu from "../components/MainMobileMenu";
import KioskService from "../services/KioskService";
import { DraftOrder, DraftOrderProduct } from "../types";
import { toast } from "react-toastify";
import SummaryMenu from "../components/SumaryMenu";

export default function MainLayout() {
    const { state, dispatch } = useKiosk();
    const { logout, user } = useAuth({
        middleware: 'auth',
        url: '/auth/login'
    });

    const styles: Styles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            overflowY: 'auto',
            maxHeight: '90vh',
        },
    }

    Modal.setAppElement('#root');

    useEffect(() => {
        const totalAmount = state.order.reduce((total, item) => total + (item.quantity * Number(item.price)), 0);
        dispatch({ type: 'set-total', payload: { total: totalAmount } });
    }, [state.order]);

    const handleNewOrder = () => {
        const products: DraftOrderProduct[] = state.order.map(({ id, quantity }) => ({ product_id: id, quantity }));

        const data: DraftOrder = {
            products,
            total: state.total,
        }

        KioskService.createOrder(data)
            .then(() => {
                toast.success('Tu Pedido se Completo Exitosamente'.toUpperCase());
                logout();
            })
            .catch(() => toast.error('Ocurrio un Error al Completar el Pedido'.toUpperCase()))
    }

    const isEmptyOrder = useMemo(() => state.order.length === 0, [state.order]);

    return (
        <>
            <div className="md:flex md:overflow-hidden md:h-screen">
                <Sidebar user={user} logout={logout} />

                <MainMobileMenu user={user} logout={logout} />

                <MainHeader />

                <div className="flex-1 bg-gray-100 overflow-y-auto min-h-screen">
                    <main className="px-4 py-6 container mx-auto mt-16 md:mt-0">
                        <Outlet />
                    </main>
                </div>

                <Summary isEmptyOrder={isEmptyOrder} handleNewOrder={handleNewOrder} />

                <SummaryMenu handleNewOrder={handleNewOrder} isEmptyOrder={isEmptyOrder} />
            </div>

            <Modal isOpen={state.modal} style={styles}>
                <ProductModal />
            </Modal>
        </>
    )
}

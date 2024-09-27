import 'react-toastify/dist/ReactToastify.css';

import router from "./router";
import { RouterProvider } from "react-router-dom";
import { KioskProvider } from "./context/KioskProvider";
import { ToastContainer } from 'react-toastify'
export default function App() {
    return (
        <KioskProvider>
            <RouterProvider router={router} />
            
            <ToastContainer />
        </KioskProvider>
    )
}

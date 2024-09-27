import { useContext } from "react"
import { KioskContext } from "../context/KioskProvider"


export default function useKiosk() {
    const context = useContext(KioskContext);

    if(!context) {
        throw new Error("useKiosk must be used within a KioskProvider")
    }
    
    return context;
}
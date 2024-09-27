import useKiosk from "../hooks/useKiosk";

export default function AdminHeader() {
    const { dispatch } = useKiosk();

    return (
        <header className="fixed block md:hidden top-0 left-0 right-0 bg-white">
            <div className="px-4 py-2 justify-between items-center gap-4 flex container mx-auto">
                <picture className="block max-w-44 w-full">
                    <img src="/logo.png" alt="Logotipo de FreshCoffee" className="block" />
                </picture>

                <button 
                    type="button" 
                    className="p-1 text-gray-700 cursor-pointer hover:bg-gray-100 rounded transition-colors " 
                    title="Menu"
                    onClick={() => dispatch({ type: "handle-click-menu" })}
                >
                    <svg className="size-8" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" /></svg>
                </button>
            </div>
        </header>
    )
}

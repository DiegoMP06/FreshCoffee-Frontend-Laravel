export const formatCurrency = (quantity: number) => {
    return Intl.NumberFormat('es-MX', { 
        style: 'currency', 
        currency: 'MXN' 
    }).format(quantity);
}
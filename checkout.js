
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}


document.addEventListener('DOMContentLoaded', function() {
    
    const total = localStorage.getItem('checkout-total');
    document.getElementById('checkout-total').textContent = total;

    
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    document.getElementById('delivery-date').textContent = formatDate(deliveryDate);
});
function displayCartItems() {
    console.log("Displaying cart items...");
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    cartItemsContainer.innerHTML = '';

    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.title}</div>
                <div class="cart-item-price">$${item.price}</div>
            </div>
            <div class="cart-item-controls">
                <span class="cart-item-quantity">${item.quantity}
                
            </div>
        `;

        // <button class="update-item" data-id="${item.id}">Update</button>
        cartItemsContainer.appendChild(itemElement);

        
        total += item.price * item.quantity;
    });

   
    cartTotal.textContent = total.toFixed(2);

   
    // document.querySelectorAll('.update-item').forEach(button => {
    //     button.addEventListener('click', function() {
    //         const productId = this.dataset.id; 
    //         updateItem(productId); 
    //     });
    // });
}


// function updateItem(productId) {
//     const newQuantity = document.getElementById(`quantity-${productId}`).value;

//     if (newQuantity === "" || parseInt(newQuantity) <= 0) {
//         alert("Please enter a valid quantity!");
//         return;
//     }

//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const itemIndex = cart.findIndex(item => item.id === parseInt(productId));

//     if (itemIndex > -1) {
        
//         if (parseInt(newQuantity) === 0) {
//             cart.splice(itemIndex, 1);  
//         } else {
//             cart[itemIndex].quantity = parseInt(newQuantity);  
//         }

        
//         localStorage.setItem('cart', JSON.stringify(cart));

        
//         displayCartItems();
//     }
// }


document.addEventListener('DOMContentLoaded', displayCartItems);


document.getElementById('checkout-btn').addEventListener('click', function() {
    const total = document.getElementById('cart-total').textContent;
    localStorage.setItem('checkout-total', total); 

   
    window.location.href = 'checkout.html';
});

function emptyCart() {
    
    localStorage.removeItem('cart');

    
    displayCartItems();
}


const emptyCartBtn = document.getElementById('empty-cart-btn');
emptyCartBtn.addEventListener('click', emptyCart);
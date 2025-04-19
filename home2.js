let ps5 = [];
let ps4 = [];
let pc = [];
let cons = [];
let data = [];

async function fetchData(cat) {
    try {
        let response = await fetch('https://fakestoreapi.com/products');
        data = await response.json();

        let ps5 = [];
        let ps4 = [];
        let pc = [];
        let cons = [];

        data.forEach(product => {
            switch (product.category) {
                case "electronics":
                    cons.push(product);
                    break;
                case "men's clothing":
                    ps4.push(product);
                    break;
                case "jewelery":
                    ps5.push(product);
                    break;
                case "women's clothing":
                    pc.push(product);
                    break;
                default:
                    break;
            }
        });

        switch (cat) {
            case 1:
                displayProducts(cons);
                break;
            case 2:
                displayProducts(pc);
                break;
            case 3:
                displayProducts(ps4);
                break;
            case 4:
                displayProducts(ps5);
                break;
            default:
                displayProducts(data);
                break;
        }

    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }
}
fetchData();

function displayProducts(products) {
    let productGrid = document.querySelector(".product-grid");
    productGrid.innerHTML = ""; 

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.price} $</p>
            <button class="add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
        `;
        productGrid.appendChild(productElement);
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", addToCart);
    });
}

function psf5() {
    fetchData(4); 
    addClickedClass(event);
}

function psf4() {
    fetchData(3); 
    addClickedClass(event);
}


function pcf() {
    fetchData(2);
    addClickedClass(event);
}

function conf() {
    fetchData(1); 
    addClickedClass(event);
}

const images = [
    "./images/logo.png",
    "./images/ps5.jpg",
    "./images/pcgames.jpg",
    "./images/ps4.jpg",
    "./images/pvgames2.jpg",
    "./images/xbox.jpg",
];

let currentIndex = 0;
const imageElement = document.getElementById("product-image");


function updateImage() {
    imageElement.src = images[currentIndex];
}


function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}


function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}


setInterval(nextImage, 5000);

function addToCart(event) {
    const productId = event.target.getAttribute('data-id');
    const productTitle = event.target.getAttribute('data-title');
    const productPrice = event.target.getAttribute('data-price');
    const productImage = event.target.getAttribute('data-image');
    
    const product = {
        id: productId,
        title: productTitle,
        price: parseFloat(productPrice),
        image: productImage,
        quantity: 1,  
    };

    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    
    if (existingProductIndex > -1) {
        
        cart[existingProductIndex].quantity += 1;
    } else {
        
        cart.push(product);
    }

    
    localStorage.setItem('cart', JSON.stringify(cart));

   
    updateCartCounter();
}


function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;  
    }
}


document.addEventListener('DOMContentLoaded', updateCartCounter);


document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", addToCart);
});

function addClickedClass(event) {
    
    document.querySelectorAll('.menu').forEach(item => {
        item.classList.remove('clicked');
    });

   
    event.target.classList.add('clicked');
}

const scrollToTopBtn = document.getElementById("scrollToTopBtn");


window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};


scrollToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
    });
});
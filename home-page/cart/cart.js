// Initialize the cart and total variables
let cart = [];
let totalAmount = 0;

// Get references to DOM elements
const productSelect = document.getElementById('productSelect');
const addProductButton = document.getElementById('addProductButton');
const cartItems = document.getElementById('cartItems');
const totalAmountElement = document.getElementById('total-amount');
const checkoutButton = document.getElementById('checkoutButton');

// Function to update the cart UI
function updateCart() {
    // Clear the current cart display
    cartItems.innerHTML = '';

    // Loop through the cart array and display each item
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const productName = document.createElement('span');
        productName.textContent = item.name;

        const productPrice = document.createElement('span');
        productPrice.textContent = `Ksh ${item.price}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(index);

        cartItem.appendChild(productName);
        cartItem.appendChild(productPrice);
        cartItem.appendChild(removeButton);

        cartItems.appendChild(cartItem);
    });

    // Update the total amount
    totalAmountElement.textContent = `Ksh ${totalAmount}`;

    // Enable the checkout button if there are items in the cart
    checkoutButton.disabled = cart.length === 0;
}

// Function to add a product to the cart
function addToCart() {
    const selectedOption = productSelect.value;

    if (selectedOption) {
        // Split the value to get product name and price
        const [name, price] = selectedOption.split(',');
        
        // Convert price to number
        const productPrice = parseInt(price);

        // Add product to cart array
        cart.push({ name, price: productPrice });
        
        // Update the total amount
        totalAmount += productPrice;

        // Update the cart UI
        updateCart();
    }
}

// Function to remove an item from the cart
function removeFromCart(index) {
    // Subtract the price from total
    totalAmount -= cart[index].price;

    // Remove the item from the cart array
    cart.splice(index, 1);

    // Update the cart UI
    updateCart();
}

// Event listener for the "Add to Cart" button
addProductButton.addEventListener('click', addToCart);

// Event listener for the "Proceed to Checkout" button
checkoutButton.addEventListener('click', function() {
    window.location.href = "/home-page/checkout-page/checkout.html";  // Redirect to checkout page in the correct folder
});







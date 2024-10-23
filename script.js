
let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open');
}


let cart = [];
let totalPrice = 0;
let products = [];  // Array to track product names
let prices = [];    // Array to track product prices
let quantities = []; // Array to track quantities

// Handle "Add to Cart" click
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const productRow = this.closest('.row');
        const productName = productRow.getAttribute('data-product-name');
        const productPrice = parseInt(productRow.getAttribute('data-product-price'));

        cart.push({ name: productName, price: productPrice });
        totalPrice += productPrice;

        // Add to global arrays
        addProduct(productName, productPrice);

        alert(productName + ' added to cart!');
    });
});

// Function to add products to global arrays
function addProduct(name, price) {
    // Check if the product is already in the cart
    const index = products.indexOf(name);
    if (index === -1) {
        // If it's a new product, add it to the arrays
        products.push(name);
        prices.push(price);
        quantities.push(1);
    } else {
        // If the product already exists, increase its quantity
        quantities[index]++;
    }
}

// Handle "Cart" icon click
document.getElementById('cart-icon').addEventListener('click', function(e) {
    e.preventDefault();
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = ''; // Clear previous items
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name + ' - $' + item.price;
        cartItemsList.appendChild(li);
    });

    document.getElementById('total-price').textContent = 'Total: $' + totalPrice;
    document.getElementById('cart-modal').style.display = 'block'; // Show the cart
});

// Handle "Close" button in the cart
document.getElementById('close-cart').addEventListener('click', function() {
    document.getElementById('cart-modal').style.display = 'none';
});

// Handle "Cancel" button in the cart
document.getElementById('cancel-cart').addEventListener('click', function() {
    // Clear the cart and reset everything
    cart = [];
    totalPrice = 0;
    products = [];
    prices = [];
    quantities = [];

    document.getElementById('cart-items').innerHTML = '';
    document.getElementById('total-price').textContent = 'Total: $0';
    document.getElementById('cart-modal').style.display = 'none';
});

// Handle "Check Out" button in the cart
document.getElementById('checkout-cart').addEventListener('click', function() {
    // Generate Invoice
    generateInvoice();
});

function generateInvoice() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add items to the cart before checking out.");
        return;
    }

    // Get current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); // Format the date and time

    // Open a new window for the invoice
    const invoiceWindow = window.open('', '_blank');

    // Calculate subtotal, discount, and tax
    let subtotal = 0;
    for (let i = 0; i < prices.length; i++) {
        subtotal += prices[i] * quantities[i];
    }

    let discount = 0;
    if (subtotal > 10000) {
        discount = subtotal * 0.1; // 10% discount for orders above $10000
    }

    let tax = (subtotal - discount) * 0.05; // 5% tax on discounted price
    let finalTotal = subtotal - discount + tax;

    // Write the invoice content to the new window with enhanced styles
    invoiceWindow.document.write(`
        <html>
        <head>
            <title>Invoice</title>
            <style>
                body {
                    font-family: 'Helvetica Neue', sans-serif;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 0;
                }
                .invoice-container {
                    width: 80%;
                    margin: 50px auto;
                    background-color: #fff;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
                    border-radius: 10px;
                    padding: 30px;
                }
                h1 {
                    text-align: center;
                    color: #333;
                    font-size: 36px;
                    letter-spacing: 1px;
                }
                .logo {
                    text-align: center;
                    margin-bottom: 10px;
                }
                .logo img {
                    width: 150px;
                    height: auto;
                }
                .invoice-date {
                    text-align: center;
                    font-size: 14px;
                    margin-bottom: 20px;
                    color: #777;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 30px;
                }
                table, th, td {
                    border: 1px solid #ddd;
                }
                th, td {
                    padding: 12px;
                    text-align: center;
                    font-size: 16px;
                }
                th {
                    background-color: #4CAF50;
                    color: white;
                    text-transform: uppercase;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
                h3 {
                    text-align: right;
                    margin-right: 20px;
                    font-weight: normal;
                }
                .totals {
                    text-align: right;
                    font-weight: bold;
                    padding: 10px 0;
                    font-size: 18px;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    color: #777;
                    font-size: 14px;
                }
                .button-container {
                    text-align: center;
                    margin-top: 20px;
                }
                .cta-button, .cancel-button, .exit-button {
                    padding: 12px 25px;
                    font-size: 16px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin: 5px;
                }
                .cta-button {
                    background-color: #4CAF50;
                    color: white;
                }
                .cta-button:hover {
                    background-color: #45a049;
                }
                .cancel-button {
                    background-color: #f44336;
                    color: white;
                }
                .cancel-button:hover {
                    background-color: #e53935;
                }
                .exit-button {
                    background-color: #555;
                    color: white;
                }
                .exit-button:hover {
                    background-color: #333;
                }
            </style>
        </head>
        <body>
            <div class="invoice-container">
                <div style="text-align: center; font-weight: bold; font-size: 15px;">STW Clothing Brand
                </div>
                <div class="invoice-date">
                    <p>Invoice generated on: ${formattedDate}</p>
                </div>
                <h1>STW Clothing Brand - Invoice</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
    `);

    // Add cart items to the invoice
    for (let i = 0; i < products.length; i++) {
        invoiceWindow.document.write(`
            <tr>
                <td>${products[i]}</td>
                <td>${quantities[i]}</td>
                <td>$${prices[i].toFixed(2)}</td>
                <td>$${(prices[i] * quantities[i]).toFixed(2)}</td>
            </tr>
        `);
    }

    // Add totals to the invoice
    invoiceWindow.document.write(`
                    </tbody>
                </table>
                <div class="totals">
                    <h3>Subtotal: $${subtotal.toFixed(2)}</h3>
                    <h3>Discount: $${discount.toFixed(2)}</h3>
                    <h3>Tax (5%): $${tax.toFixed(2)}</h3>
                    <h3>Total: $${finalTotal.toFixed(2)}</h3>
                </div>
                <div class="footer">
                    <p>Thank you for shopping with STW Clothing Brand!</p>
                    <p>We hope to see you again soon!</p>
                </div>
                <div class="button-container">
                    <button class="cta-button" onclick="window.print()">Print Invoice</button>
                    <button class="cancel-button" onclick="window.location.href='Product.html'">Cancel</button>
                    <button class="exit-button" onclick="window.location.href='index.html'">Exit</button>
                </div>
            </div>
        </body>
        </html>
    `);

    // Close the document writing stream
    invoiceWindow.document.close();

    // Clear the cart after checkout
    cart = [];
    totalPrice = 0;
    products = [];
    prices = [];
    quantities = [];

    // Reset the cart modal
    document.getElementById('cart-items').innerHTML = '';
    document.getElementById('total-price').textContent = 'Total: $0';
    document.getElementById('cart-modal').style.display = 'none';
}








document.getElementById("search-icon").addEventListener("click", function(e) {
    e.preventDefault();
    let searchInput = document.getElementById("search-input");
    searchInput.style.display = searchInput.style.display === "block" ? "none" : "block";
});

document.getElementById("search-input").addEventListener("input", function() {
    let searchTerm = this.value.toLowerCase();
    let products = document.querySelectorAll(".row");

    products.forEach(function(product) {
        let productName = product.getAttribute("data-product-name").toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.n-content .row');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const showLessBtn = document.getElementById('show-less-btn');

    let productsPerPage = 9;
    let currentVisibleProducts = productsPerPage;

    // Hide all products beyond the initial 3
    function updateProductVisibility() {
        products.forEach((product, index) => {
            if (index < currentVisibleProducts) {
                product.style.display = 'grid';
            } else {
                product.style.display = 'none';
            }
        });

        // Toggle buttons based on visibility
        if (currentVisibleProducts >= products.length) {
            loadMoreBtn.style.display = 'none';
            showLessBtn.style.display = 'inline-block';
        } else {
            loadMoreBtn.style.display = 'inline-block';
            showLessBtn.style.display = 'none';
        }
    }

    // Load more products
    loadMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        currentVisibleProducts += productsPerPage;
        updateProductVisibility();
    });

    // Show less products (revert to initial state)
    showLessBtn.addEventListener('click', function(e) {
        e.preventDefault();
        currentVisibleProducts = productsPerPage;
        updateProductVisibility();
    });

    // Initialize the view
    updateProductVisibility();
});

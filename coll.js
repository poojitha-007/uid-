
function searchWatches() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let title = card.querySelector("h2").innerText.toLowerCase();
        let category = card.querySelector(".category").innerText.toLowerCase();
        
        // Get the gender attribute, or use an empty string if it's missing
        let gender = (card.getAttribute('data-gender') || "").toLowerCase();

        // FIX: Add 'gender.includes(input)' to the condition
        if (title.includes(input) || category.includes(input) || gender.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update the number shown on the cart icon
function updateCartBadge() {
    const badge = document.getElementById("cart-count");
    if (badge) {
        let totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        badge.innerText = totalItems;
    }
}

function addToCart(name, price, img) {
    // Ensure price is treated as a number (removes commas if any)
    let cleanPrice = parseFloat(String(price).replace(/,/g, ''));

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            name: name,
            price: cleanPrice,
            img: img || 'default-watch.jpg', 
            qty: 1
        });
    }

    // Save to local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the UI badge immediately
    updateCartBadge();

    // Optional: Alert the user or redirect
    alert(name + " added to cart!");
    // window.location.href = "cart.html"; 
}

// Run this when the page loads to show current cart count
document.addEventListener("DOMContentLoaded", updateCartBadge);
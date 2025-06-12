// Datos de productos
const products = [
    {
        id: 1,
        name: "Camiseta Running Pro",
        category: "camisetas",
        price: 29.99,
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 2,
        name: "Pantalón Training Elite",
        category: "pantalones",
        price: 49.99,
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 3,
        name: "Zapatillas Performance",
        category: "calzado",
        price: 89.99,
        sizes: ["40", "41", "42", "43", "44", "45"]
    },
    {
        id: 4,
        name: "Sudadera Comfort",
        category: "camisetas",
        price: 39.99,
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 5,
        name: "Short Deportivo",
        category: "pantalones",
        price: 24.99,
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 6,
        name: "Gorra Deportiva",
        category: "accesorios",
        price: 19.99,
        sizes: ["Única"]
    },
    {
        id: 7,
        name: "Camiseta Técnica",
        category: "camisetas",
        price: 34.99,
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 8,
        name: "Pantalón Jogger",
        category: "pantalones",
        price: 44.99,
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 9,
        name: "Zapatillas Casual",
        category: "calzado",
        price: 69.99,
        sizes: ["40", "41", "42", "43", "44", "45"]
    }
];

let cart = [];
let currentFilter = 'all';

// Filtrar productos
function filterProducts(category) {
    currentFilter = category;
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Seleccionar talla
function selectSize(button, size) {
    const sizeButtons = button.parentElement.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

// Añadir al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const productCard = event.target.closest('.product-card');
    const selectedSizeBtn = productCard.querySelector('.size-btn.selected');
    
    if (!selectedSizeBtn) {
        alert('Por favor, selecciona una talla');
        return;
    }

    const size = selectedSizeBtn.textContent;
    const existingItem = cart.find(item => item.id === productId && item.size === size);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            size: size,
            quantity: 1
        });
    }

    updateCartCount();
    showAddedNotification();
}

// Actualizar contador del carrito
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Mostrar notificación de producto añadido
function showAddedNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = '✅ Producto añadido al carrito';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Toggle carrito
function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
        renderCart();
    }
}

// Renderizar carrito
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Tu carrito está vacío</div>';
        cartTotal.textContent = 'Total: €0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Talla: ${item.size} | €${item.price}</p>
            </div>
            <div class="quantity-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, '${item.size}', -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, '${item.size}', 1)">+</button>
                <button class="qty-btn" onclick="removeFromCart(${item.id}, '${item.size}')">🗑️</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: €${total.toFixed(2)}`;
}

// Actualizar cantidad
function updateQuantity(productId, size, change) {
    const item = cart.find(item => item.id === productId && item.size === size);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId, size);
        } else {
            renderCart();
            updateCartCount();
        }
    }
}

// Eliminar del carrito
function eliminar(remove) {
    
}
    


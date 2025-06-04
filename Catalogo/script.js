// Variables del carrito
let cart = [];

// Función para formatear el precio
function formatPrice(price) {
    return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Función para añadir al carrito
function addToCart(event) {
    const productCard = event.target.closest('.product-card');
    const productId = parseInt(productCard.getAttribute('data-id'));
    const productRef = productCard.getAttribute('data-ref');
    const productPrice = parseInt(productCard.getAttribute('data-price'));
    const productName = productCard.querySelector('.product-name').textContent;
    const productImage = productCard.querySelector('img').src;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            ref: productRef,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }
    
    updateCartCount();
    showCartNotification(productName);
}

// Función para mostrar notificación al añadir al carrito
function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <p>¡${productName} añadido al carrito!</p>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 2000);
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Función para renderizar el carrito
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        cartTotalPrice.textContent = '$0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        itemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-ref">Ref: ${item.ref}</div>
                <div class="cart-item-price">${formatPrice(item.price)} c/u</div>
            </div>
            <div class="cart-item-quantity">
                <button class="decrease-quantity" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase-quantity" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-total">${formatPrice(item.price * item.quantity)}</div>
            <button class="remove-item" data-id="${item.id}">Eliminar</button>
        `;
        
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });
    
    cartTotalPrice.textContent = formatPrice(total);
    
    // Añadir event listeners a los botones del carrito
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
    
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
}

// Función para eliminar del carrito
function removeFromCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
}

// Función para aumentar cantidad
function increaseQuantity(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCartCount();
        renderCart();
    }
}

// Función para disminuir cantidad
function decreaseQuantity(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(i => i.id !== productId);
        }
        updateCartCount();
        renderCart();
    }
}

// Función para abrir/cerrar el modal del carrito
function toggleCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
        renderCart();
    }
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    // Event listeners para los botones de añadir al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    // Event listeners para el carrito
    document.getElementById('cartIcon').addEventListener('click', toggleCartModal);
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('cartModal').style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('cartModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
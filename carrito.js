// Contenido sugerido para actualizar su archivo carrito.js

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para formatear el precio
const formatPrice = (price) => {
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

// Función principal para renderizar el carrito y actualizar el total y el contador
const renderCart = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total'); // Nuevo elemento del total
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        // Calcular el subtotal de cada ítem y sumarlo al total general
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        // Estructura del ítem con imagen (aplicando clases de Tailwind)
        const itemElement = document.createElement('div');
        itemElement.className = 'flex items-start justify-between p-2 bg-gray-50 rounded-lg shadow-sm';
        itemElement.innerHTML = `
            <div class="flex items-center space-x-3 w-3/5">
                ${item.image ? `<img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-contain rounded border">` : ''}
                <div>
                    <p class="text-sm font-semibold">${item.name}</p>
                    <p class="text-xs text-gray-500">${formatPrice(item.price)} x ${item.quantity}</p>
                </div>
            </div>
            <div class="flex flex-col items-end w-2/5">
                <p class="text-sm font-bold text-green-700">${formatPrice(itemTotal)}</p>
                <button data-name="${item.name}" class="remove-from-cart text-red-500 hover:text-red-700 text-xs mt-1">
                    Eliminar
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Actualizar el contador del carrito
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // NUEVO: Actualizar el total de la compra
    cartTotalElement.textContent = formatPrice(total);

    // Mostrar mensaje si el carrito está vacío
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-gray-500">El carrito está vacío.</p>';
        cartTotalElement.textContent = formatPrice(0); // Asegurarse que el total es $0
    }

    localStorage.setItem('cart', JSON.stringify(cart));
};

// Función para agregar o actualizar un ítem en el carrito
const addItemToCart = (name, price, image) => {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1, image });
    }

    renderCart();
};


// Event Listeners (Asegúrese de que existan)

document.addEventListener('DOMContentLoaded', () => {
    // 1. Renderiza el carrito al cargar la página
    renderCart(); 

    // 2. Controladores de eventos para los botones del producto
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const name = e.target.getAttribute('data-name');
            const price = parseInt(e.target.getAttribute('data-price'));
            const image = e.target.getAttribute('data-image'); // Captura la URL de la imagen
            
            addItemToCart(name, price, image);
        });
    });

    // 3. Controladores para abrir/cerrar carrito
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const cartModal = document.getElementById('cart-modal');

    cartBtn.addEventListener('click', () => {
        cartModal.classList.remove('hidden');
    });

    closeCartBtn.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    // 4. Controlador para vaciar el carrito
    document.getElementById('clear-cart').addEventListener('click', () => {
        cart = [];
        renderCart();
    });

    // 5. Controlador para eliminar ítems (Debe estar dentro del contenedor principal de los ítems o delegado)
    document.getElementById('cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-from-cart')) {
            const nameToRemove = e.target.getAttribute('data-name');
            removeItemFromCart(nameToRemove);
        }
    });
});

// Función para remover ítems del carrito
const removeItemFromCart = (name) => {
    cart = cart.filter(item => item.name !== name);
    renderCart();
};
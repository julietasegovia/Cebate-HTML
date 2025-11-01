// carrito.js
document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cart-btn");
  const cartModal = document.getElementById("cart-modal");
  const closeCart = document.getElementById("close-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const clearCartBtn = document.getElementById("clear-cart");

  // Obtener carrito del localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Renderizar carrito
  function renderCart() {
    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p class="text-gray-600 text-center">El carrito está vacío 🛒</p>`;
    } else {
      cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className =
          "flex justify-between items-center border-b border-gray-300 py-2";
        div.innerHTML = `
          <div>
            <p class="font-semibold">${item.name}</p>
            <p class="text-sm text-gray-600">$${item.price}</p>
          </div>
          <button class="text-red-500 hover:text-red-700" data-index="${index}">Eliminar</button>
        `;
        cartItemsContainer.appendChild(div);
      });
    }
    cartCount.textContent = cart.length;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Eliminar un ítem
  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      renderCart();
    }
  });

  // Limpiar carrito
  clearCartBtn.addEventListener("click", () => {
    if (confirm("¿Vaciar carrito?")) {
      cart = [];
      renderCart();
    }
  });

  // Mostrar/Ocultar carrito
  cartBtn.addEventListener("click", () => cartModal.classList.toggle("hidden"));
  closeCart.addEventListener("click", () => cartModal.classList.add("hidden"));

  // Agregar productos desde botones
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = btn.dataset.price;
      cart.push({ name, price });
      renderCart();
      alert(`${name} agregado al carrito 🛒`);
    });
  });

  renderCart();
});

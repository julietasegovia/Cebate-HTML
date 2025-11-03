document.getElementById("formProducto").addEventListener("submit", async (e) => {
  e.preventDefault();

  const producto = {
    nombre: document.getElementById("nombre").value.trim(),
    precio: parseFloat(document.getElementById("precio").value),
    imagen: document.getElementById("imagen").value.trim() || "img/default.png"
  };

  // Guardar en localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Guardar en la base de datos
  try {
    await fetch("/api/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto)
    });
    document.getElementById("mensaje").classList.remove("hidden");
  } catch (err) {
    console.error("Error al guardar en la base de datos:", err);
  }

  e.target.reset();
});

const container = document.getElementById('productos-container');

fetch('https://dummyjson.com/products')
  .then(res => res.json())
  // .then(console.log);
  .then(data => {
    data.products.forEach(producto => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${producto.thumbnail}" alt="${producto.title}" /> 
        <h3>${producto.title}</h3>                                  
        <p>${producto.description.slice(0, 60)}...</p>              
        <p class="precio">$ ${producto.price}</p>                  
        <button data-id="${producto.id}">Agregar al carrito</button>
      `;
      container.appendChild(card);
    });

    // Botones "Agregar al carrito"
    document.querySelectorAll('button[data-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        agregarAlCarrito(id);
      });
    });
  }
);



function agregarAlCarrito(id) {
  fetch(`https://dummyjson.com/products/${id}`) /* obtengo el producto en base al id recibido */
    .then(res => res.json())
    .then(producto => {
      if (confirm(`¿Quiere agregar ${producto.title} al carrito?`)) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`${producto.title} agregado al carrito.`);
        actualizarContadorCarrito(); // ✅ Actualiza contador en tiempo real
      }
    });
}



// Contador del carrito en la navbar
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const contador = document.getElementById('carrito-contador');
  if (contador) {
    contador.textContent = carrito.length === 0 ? '(0 productos)' : `(${carrito.length})`;
  }
}

actualizarContadorCarrito();

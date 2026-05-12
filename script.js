const WHATSAPP_NUMBER = "393471232958";
let cart = JSON.parse(localStorage.getItem("fast3d_cart") || "[]");

function euro(value) {
  return `${Number(value).toFixed(2).replace(".", ",")}€`;
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  const products = getProducts();

  grid.innerHTML = products.map(product => `
    <article class="product-card">
      <div class="product-image">
        ${product.image ? `<img src="${product.image}" alt="${product.name}">` : `<span>Immagine prodotto</span>`}
      </div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <strong>${euro(product.price)}</strong>
      <div class="card-actions">
        <button class="btn primary" onclick="addToCart('${product.id}')">Aggiungi</button>
        <a class="btn secondary" target="_blank" href="${product.etsy || 'https://fastmapic3dprint.etsy.com'}">Etsy</a>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  const product = getProducts().find(p => p.id === id);
  if (!product) return;
  cart.push(product);
  localStorage.setItem("fast3d_cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const box = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  if (!box || !totalEl) return;

  if (cart.length === 0) {
    box.innerHTML = "<p>Il carrello è vuoto.</p>";
    totalEl.textContent = "0€";
    return;
  }

  box.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <span>${item.name}</span>
      <strong>${euro(item.price)}</strong>
      <button onclick="removeFromCart(${index})">Rimuovi</button>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
  totalEl.textContent = euro(total);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("fast3d_cart", JSON.stringify(cart));
  renderCart();
}

document.getElementById("sendOrder")?.addEventListener("click", () => {
  if (cart.length === 0) return alert("Il carrello è vuoto.");
  const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const lines = cart.map(item => `- ${item.name} (${euro(item.price)})`).join("%0A");
  const text = `Ciao%2C%20vorrei%20ordinare%3A%0A${lines}%0A%0ATotale%20indicativo%3A%20${euro(total)}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
});

document.getElementById("clearCart")?.addEventListener("click", () => {
  cart = [];
  localStorage.setItem("fast3d_cart", JSON.stringify(cart));
  renderCart();
});

document.querySelectorAll("[data-color]").forEach(btn => {
  btn.style.background = btn.dataset.color;
  btn.addEventListener("click", () => {
    document.documentElement.style.setProperty("--primary", btn.dataset.color);
    localStorage.setItem("fast3d_color", btn.dataset.color);
  });
});

const savedColor = localStorage.getItem("fast3d_color");
if (savedColor) document.documentElement.style.setProperty("--primary", savedColor);

renderProducts();
renderCart();

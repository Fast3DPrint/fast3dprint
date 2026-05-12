const form = document.getElementById("productForm");
const list = document.getElementById("adminProducts");

function euro(value) {
  return `${Number(value).toFixed(2).replace(".", ",")}€`;
}

function renderAdminProducts() {
  const products = getProducts();
  list.innerHTML = products.map(product => `
    <div class="admin-product">
      <div>
        <strong>${product.name}</strong>
        <p>${product.description}</p>
        <span>${euro(product.price)}</span>
      </div>
      <div>
        <button class="btn secondary" onclick="editProduct('${product.id}')">Modifica</button>
        <button class="btn ghost" onclick="deleteProduct('${product.id}')">Elimina</button>
      </div>
    </div>
  `).join("");
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const products = getProducts();
  const id = document.getElementById("productId").value || `p${Date.now()}`;
  const data = {
    id,
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: Number(document.getElementById("price").value),
    image: document.getElementById("image").value,
    etsy: document.getElementById("etsy").value || "https://fastmapic3dprint.etsy.com"
  };

  const index = products.findIndex(p => p.id === id);
  if (index >= 0) products[index] = data;
  else products.push(data);

  saveProducts(products);
  form.reset();
  document.getElementById("productId").value = "";
  renderAdminProducts();
  alert("Prodotto salvato.");
});

function editProduct(id) {
  const product = getProducts().find(p => p.id === id);
  if (!product) return;
  document.getElementById("productId").value = product.id;
  document.getElementById("name").value = product.name;
  document.getElementById("description").value = product.description;
  document.getElementById("price").value = product.price;
  document.getElementById("image").value = product.image || "";
  document.getElementById("etsy").value = product.etsy || "";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteProduct(id) {
  if (!confirm("Vuoi eliminare questo prodotto?")) return;
  const products = getProducts().filter(p => p.id !== id);
  saveProducts(products);
  renderAdminProducts();
}

document.getElementById("resetForm").addEventListener("click", () => {
  form.reset();
  document.getElementById("productId").value = "";
});

document.getElementById("resetProducts").addEventListener("click", () => {
  if (!confirm("Ripristinare i prodotti iniziali?")) return;
  localStorage.removeItem("fast3d_products");
  renderAdminProducts();
});

document.getElementById("exportProducts").addEventListener("click", () => {
  const data = JSON.stringify(getProducts(), null, 2);
  const blob = new Blob([data], {type: "application/json"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "prodotti-fast3dprint.json";
  link.click();
});

renderAdminProducts();

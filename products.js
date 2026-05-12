const DEFAULT_PRODUCTS = [
  {
    id: "p1",
    name: "Portachiavi NFC personalizzato",
    description: "Portachiavi smart stampato in 3D con chip NFC per condividere social, contatti o link.",
    price: 12,
    image: "",
    etsy: "https://fastmapic3dprint.etsy.com"
  },
  {
    id: "p2",
    name: "Lampada Luna 3D",
    description: "Lampada decorativa con luce soffusa, ideale come regalo per compleanni e occasioni speciali.",
    price: 25,
    image: "",
    etsy: "https://fastmapic3dprint.etsy.com"
  },
  {
    id: "p3",
    name: "Scritta personalizzata",
    description: "Nome, dedica o frase stampata in 3D. Perfetta per camerette, negozi ed eventi.",
    price: 15,
    image: "",
    etsy: "https://fastmapic3dprint.etsy.com"
  }
];

function getProducts() {
  const saved = localStorage.getItem("fast3d_products");
  return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
}

function saveProducts(products) {
  localStorage.setItem("fast3d_products", JSON.stringify(products));
}

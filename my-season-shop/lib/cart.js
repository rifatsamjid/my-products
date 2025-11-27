// lib/cart.js
export const addToCart = (product) => {
  if (typeof window === "undefined") return; // SSR এ চলবে না

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existing = cart.find(item => item._id === product._id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} added to cart!`);
};

export const getCart = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const removeFromCart = (id) => {
  if (typeof window === "undefined") return;
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart = cart.filter(item => item._id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const updateQuantity = (id, change) => {
  if (typeof window === "undefined") return;
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart = cart.map(item => {
    if (item._id === id) {
      item.quantity = Math.max(1, item.quantity + change);
    }
    return item;
  }).filter(item => item.quantity > 0);
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const clearCart = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
  }
};
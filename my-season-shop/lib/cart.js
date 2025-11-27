
import toast from "react-hot-toast";

export const addToCart = (product) => {
  if (typeof window === "undefined") return;

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existing = cart.find(item => item._id === product._id);
  if (existing) {
    existing.quantity += 1;
    toast.success(`${product.title} quantity updated!`);
  } else {
    cart.push({ ...product, quantity: 1 });
    toast.success(`${product.title} added to cart!`, {
      icon: "Shopping Cart",
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCart = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const removeFromCart = (id) => {
  if (typeof window === "undefined") return;
  let cart = getCart();
  const removedItem = cart.find(item => item._id === id);
  cart = cart.filter(item => item._id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  if (removedItem) {
    toast.error(`${removedItem.title} removed from cart`);
  }
};

export const updateQuantity = (id, change) => {
  if (typeof window === "undefined") return;
  let cart = getCart();
  cart = cart.map(item => {
    if (item._id === id) {
      item.quantity = Math.max(1, item.quantity + change);
    }
    return item;
  }).filter(item => item.quantity > 0);
  localStorage.setItem("cart", JSON.stringify(cart));
};
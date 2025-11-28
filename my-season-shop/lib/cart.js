
import toast from "react-hot-toast";

// Trigger cart update across tabs/components
const triggerCartUpdate = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"));
  }
};

// Add or increase quantity in cart
export const addToCart = (product) => {
  if (typeof window === "undefined") return;

  // Product validation
  if (!product?._id || !product?.name) {
    toast.error("Invalid product!");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existingIndex = cart.findIndex((item) => item._id === product._id);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
    toast.success(`${product.name} quantity increased!`, {
      icon: "Up Arrow",
    });
  } else {
    cart.push({ ...product, quantity: 1 });

  }

  localStorage.setItem("cart", JSON.stringify(cart));
  triggerCartUpdate();
};

// Get current cart
export const getCart = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch (error) {
    console.error("Failed to parse cart:", error);
    return [];
  }
};

// Remove item completely
export const removeFromCart = (id) => {
  if (typeof window === "undefined") return;

  const cart = getCart();
  const removedItem = cart.find((item) => item._id === id);

  if (!removedItem) return;

  const newCart = cart.filter((item) => item._id !== id);
  localStorage.setItem("cart", JSON.stringify(newCart));
  triggerCartUpdate();

  // toast.error(`${removedItem.name} removed from cart`, {
  //   icon: "Trash Can",
  // });
};

// Update quantity
export const updateQuantity = (id, change) => {
  if (typeof window === "undefined") return;

  let cart = getCart();

  const item = cart.find((i) => i._id === id);
  if (!item) return;

  const newQty = item.quantity + change;

  let updatedCart;
  if (newQty <= 0) {
    updatedCart = cart.filter((i) => i._id !== id);
    toast.error(`${item.name} removed from cart`, { icon: "Trash Can" });
  } else {
    updatedCart = cart.map((i) =>
      i._id === id ? { ...i, quantity: newQty } : i
    );
    toast.success(`${item.name} quantity updated`);
  }

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  triggerCartUpdate();
};

// Clear entire cart
export const clearCart = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("cart");
  triggerCartUpdate();
  toast.success("Cart cleared!");
};

// Get total items count
export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.quantity || 0), 0);
};

// Get total price
export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
};
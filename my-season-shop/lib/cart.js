import toast from "react-hot-toast";

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
    // Already in cart 
    cart[existingIndex].quantity += 1;
    toast.success(`${product.name} quantity increased!`, {
      icon: "Up Arrow",
    });
  } else {
    // New product 
    cart.push({ ...product, quantity: 1 });
    toast.success(`${product.name} added to cart!`, {
      icon: "Shopping Cart",
      style: { background: "#10b981", color: "white" },
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
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

  toast.error(`${removedItem.name} removed from cart`, {
    icon: "Trash Can",
  });
};

// Update quantity 
export const updateQuantity = (id, change) => {
  if (typeof window === "undefined") return;

  let cart = getCart();

  const updatedCart = cart
    .map((item) => {
      if (item._id === id) {
        const newQty = item.quantity + change;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    })
    .filter(Boolean); 

  localStorage.setItem("cart", JSON.stringify(updatedCart));

  const item = cart.find((i) => i._id === id);
  if (item) {
    if (change > 0) {
      toast.success(`${item.name} quantity increased`);
    } else if (item.quantity + change === 0) {
      toast.error(`${item.name} removed from cart`);
    }
  }
};

// Clear entire cart
export const clearCart = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("cart");
  toast.success("Cart cleared!");
};

// Get total items count
export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Get total price
export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};
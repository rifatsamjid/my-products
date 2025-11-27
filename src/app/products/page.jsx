import Products from "@/components/Products/Products";
import React from "react";

const productsPromise = fetch(
  "https://my-season-server.onrender.com/products"
).then((res) => res.json());

export default function productsPage() {
  return (
    <div>
      <Products productsPromise={productsPromise}></Products>
    </div>
  );
}

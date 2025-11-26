import React, { use } from "react";
import ProductsCard from "./ProductsCard";

export default function Products({ productsPromise }) {
  const data = use(productsPromise);

  return (
    <div className="grid grid-cols-3 gap-5 max-w-[1400px] mx-auto">
      {data.map((product) => (
        <ProductsCard key={product._id} product={product}></ProductsCard>
      ))}
    </div>
  );
}

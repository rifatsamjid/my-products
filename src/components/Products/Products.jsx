import React, { use } from "react";
import ProductsCard from "./ProductsCard";

export default function Products({ productsPromise }) {
  const data = use(productsPromise);

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mt-20">Shop Now</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1400px] mt-9 mx-auto">
      {data.map((product) => (
        <ProductsCard key={product._id} product={product}></ProductsCard>
      ))}
    </div>
    </div>
  );
}

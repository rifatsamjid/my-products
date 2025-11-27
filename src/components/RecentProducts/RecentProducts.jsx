import React, { use } from "react";
import RecentProductsCard from "./RecentProductsCard";

export default function RecentProducts({ recentProductsPromise }) {
  const data = use(recentProductsPromise);

  return (
    <div>
        <h1 className="text-center font-bold text-3xl mt-20 mb-8">Recent Products</h1>
      <div className="grid grid-cols-3 max-w-[1400px] mx-auto gap-5">
        {data.map((products) => (
          <RecentProductsCard
            key={products._id}
            products={products}
          ></RecentProductsCard>
        ))}
      </div>
    </div>
  );
}

import Banner from "@/components/Banner/Banner";
import RecentProducts from "@/components/RecentProducts/RecentProducts";
import Categories from "@/components/Section/Categories";
import CTA from "@/components/Section/CTA";
import Features from "@/components/Section/Features";
import Testimonials from "@/components/Section/Testimonials";

const recentProductsPromise = fetch(
  "https://my-season-server.onrender.com/products/recent-products"
)
  .then((res) => {
    if (!res.ok) {
      console.error("API Error:", res.status);
      return [];
    }
    return res.json();
  })
  .catch((err) => {
    console.error("Fetch failed:", err);
    return [];
  });

export default function Home() {
  return (
    <div className="">
      <main>
        <Banner />
        <RecentProducts recentProductsPromise={recentProductsPromise} />
        <Features/>
        <Categories/>
        <Testimonials></Testimonials>
        <CTA/>
      </main>
    </div>
  );
}

// app/products/[id]/page.jsx
import Image from "next/image";
import { notFound } from "next/navigation";

// তোমার API থেকে ডাটা ফেচ করার ফাংশন
async function getProduct(id) {
  try {
    const res = await fetch(`https://my-season-server.onrender.com/products/${id}`, {
      cache: "no-store", // সবসময় ফ্রেশ ডাটা
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  // যদি প্রোডাক্ট না পাওয়া যায় → 404 দেখাবে
  if (!product) {
    notFound();
  }

  const { title, full_description, price, image_url, short_description, date } = product;

  // তারিখ ফরম্যাট
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] to-purple-900/20 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={image_url || "/api-placeholder.jpg"}
              alt={title}
              width={800}
              height={800}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {title}
              </h1>
              <p className="text-gray-300 text-lg">{short_description}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30">
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
                ${price}
                <span className="text-2xl text-gray-300 ml-2">/kg</span>
              </div>
              <p className="text-gray-400 text-sm">Added on: {formatDate(date)}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
              <p className="text-gray-200 leading-relaxed text-lg">
                {full_description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button className="px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105">
                Add to Cart
              </button>
              <button className="px-10 py-5 bg-white/10 backdrop-blur-md border border-purple-500/50 text-white font-bold text-xl rounded-full hover:bg-white/20 transition">
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
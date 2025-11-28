"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { auth } from "../../../firebase.config";
import ManageProducts from "./ManageProducts";

export default function ManageProductsClient() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        toast.error("Login required!");
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  return <ManageProducts />;
}
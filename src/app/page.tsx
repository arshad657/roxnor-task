/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  //Redirecting to products route
  useEffect(() => {
    router.push("/products");
  }, []);

  return <div className="min-h-screen bg-gray-50"></div>;
}

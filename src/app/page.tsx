"use client";

import { Spin } from "antd";
import { useGetProductsQuery } from "@/lib/services/api";

export default function HomePage() {
  const { data, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <Spin />;
  if (isError) return <div>Failed to load data.</div>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <pre className="rounded-lg text-black bg-gray-100 p-4 overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}

"use client";

import { Spin, Table } from "antd";
import { Product } from "@/types/types";
import { productsColumn } from "./column";
import { useGetProductsQuery } from "@/lib/services/api";

export default function ProductsPageClient() {
  const { data, isLoading, isError } = useGetProductsQuery();

  //Loader spin
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );

  //Error state
  if (isError)
    return <div className="text-center text-red-600">Failed to load data.</div>;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold text-black">Products</h1>

      <Table<Product>
        rowKey="id"
        columns={productsColumn}
        dataSource={data?.products ?? []}
        scroll={{ x: 1200 }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

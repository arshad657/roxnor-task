"use client";

import { useEffect, useMemo, useState } from "react";
import { Input, Select, Spin, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Product } from "@/types/types";
import { productsColumn } from "./column";
import {
  useGetProductCategoryListQuery,
  useGetProductsQuery,
  useLazyGetProductsByCategoryQuery,
} from "@/lib/services/api";

export default function ProductsPageClient() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  // 🔹 Fetch all products (with optional search query)
  const { data, isLoading, isError } = useGetProductsQuery({
    q: searchInput ?? undefined, // only send query if exists
  });

  // 🔹 Fetch category list for dropdown
  const { data: productCategoryList, isLoading: isCategoryLoading } =
    useGetProductCategoryListQuery();

  // 🔹 Lazy query for fetching products by category
  const [
    fetchProductByCategory,
    {
      data: productByCategoryData,
      isLoading: isCategoryProductsLoading,
      isError: isCategoryProductsError,
    },
  ] = useLazyGetProductsByCategoryQuery();

  // 🔹 Trigger category-based fetch when category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchProductByCategory({ categoryName: selectedCategory });
    }
  }, [selectedCategory, fetchProductByCategory]);

  // 🔹 Decide which dataset to show:
  // - If category selected → show category data
  // - Otherwise → show all/search results
  const displayProducts = useMemo(() => {
    if (selectedCategory) {
      return productByCategoryData?.products ?? [];
    }
    return data?.products ?? [];
  }, [selectedCategory, productByCategoryData, data]);

  // 🔹 Transform category list into Ant Design Select options
  const categoryOptions =
    productCategoryList?.map((category: string) => ({
      label: category,
      value: category,
    })) ?? [];

  // 🔹 Loading state (either main or category fetch)
  if (isLoading || isCategoryProductsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  // 🔹 Error state
  if (isError || isCategoryProductsError) {
    return <div className="text-center text-red-600">Failed to load data.</div>;
  }

  return (
    <div className="p-6">
      {/* 🔹 Header + Filters */}
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-black">Products</h1>

        <div className="flex flex-col gap-3 md:flex-row">
          {/* 🔹 Search Input */}
          <Input
            allowClear
            placeholder="Search products..."
            prefix={<SearchOutlined />}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full md:w-72"
          />

          {/* 🔹 Category Dropdown */}
          <Select
            allowClear
            placeholder="Select category"
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
            options={categoryOptions}
            loading={isCategoryLoading}
            className="w-full md:w-60"
          />
        </div>
      </div>

      {/* 🔹 Products Table */}
      <Table<Product>
        rowKey="id"
        columns={productsColumn}
        dataSource={displayProducts}
        scroll={{ x: 1200 }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

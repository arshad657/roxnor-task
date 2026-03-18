"use client";

import { useEffect, useMemo, useState } from "react";
import { Input, Select, Spin, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Product } from "@/types/types";
import {
  useGetProductCategoryListQuery,
  useGetProductsQuery,
  useLazyGetProductsByCategoryQuery,
} from "@/lib/services/api";
import { getProductsColumns } from "./column";
import { useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";

export default function ProductsPageClient() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  //Fetch all products (with optional search query)
  const { data, isLoading, isError } = useGetProductsQuery({
    q: searchInput ?? undefined, // only send query if exists
  });

  //Fetch category list for dropdown
  const { data: productCategoryList, isLoading: isCategoryLoading } =
    useGetProductCategoryListQuery();

  //Lazy query for fetching products by category
  const [
    fetchProductByCategory,
    {
      data: productByCategoryData,
      isLoading: isCategoryProductsLoading,
      isError: isCategoryProductsError,
    },
  ] = useLazyGetProductsByCategoryQuery();

  //Handlers
  const handleView = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  const handleEdit = (product: Product) => {
    console.log("Edit:", product);
    router.push(`/products/edit/${product.id}`);
  };

  //Trigger category-based fetch when category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchProductByCategory({ categoryName: selectedCategory });
    }
  }, [selectedCategory, fetchProductByCategory]);

  //Decide which dataset to show:
  // - If category selected → show category data
  // - Otherwise → show all/search results
  const displayProducts = useMemo(() => {
    if (selectedCategory) {
      return productByCategoryData?.products ?? [];
    }
    return data?.products ?? [];
  }, [selectedCategory, productByCategoryData, data]);

  //Transform category list into Ant Design Select options
  const categoryOptions =
    productCategoryList?.map((category: string) => ({
      label: category,
      value: category,
    })) ?? [];

  //Loading state (either main or category fetch)
  if (isLoading || isCategoryProductsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  //Error state
  if (isError || isCategoryProductsError) {
    return <div className="text-center text-red-600">Failed to load data.</div>;
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Title level={2} className="mb-0! mt-2!">
          Products
        </Title>

        <div className="flex flex-col gap-3 md:flex-row">
          {/*Search Input */}
          <Input
            allowClear
            placeholder="Search products..."
            prefix={<SearchOutlined />}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full md:w-72"
          />

          {/*Category Dropdown */}
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

      {/*Products Table */}
      <Table<Product>
        rowKey="id"
        columns={getProductsColumns({
          onView: handleView,
          onEdit: handleEdit,
        })}
        dataSource={displayProducts}
        scroll={{ x: 1200 }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

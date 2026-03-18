import { GetProductsQuery, Product } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, GetProductsQuery>({
      query: (params) => ({
        url: "/products/search",
        params,
      }),
    }),
    getProductCategoryList: builder.query<string[], void>({
      query: () => ({
        url: "/products/category-list",
      }),
    }),
    getProductsByCategory: builder.query<ProductsResponse, {categoryName: string}>({
      query: ({ categoryName }) => ({
        url: `/products/category/${categoryName}`,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductCategoryListQuery,
  useLazyGetProductsByCategoryQuery,
} = api;

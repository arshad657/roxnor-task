import { GetProductsQuery, Product, ProductEditFormValues } from "@/types/types";
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
      providesTags: ["products"]
    }),
    getProductDetails: builder.query<Product, { id: string }>({
      query: ({ id }) => ({
        url: `/products/${id}`,
      }),
      providesTags: ["products"]
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
    editProduct: builder.mutation<Product, {id: number, data: ProductEditFormValues}>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["products"]
    }),
  }),
  tagTypes: ["products"]
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetProductCategoryListQuery,
  useLazyGetProductsByCategoryQuery,
  useEditProductMutation
} = api;

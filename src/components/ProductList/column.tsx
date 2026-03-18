import { Product } from "@/types/types";
import { Rate, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Image from "next/image";

export const productsColumn: ColumnsType<Product> = [
  {
    title: "Image",
    dataIndex: "thumbnail",
    key: "thumbnail",
    render: (thumbnail: string, record) => (
      <Image
        src={thumbnail}
        alt={record.title}
        width={50}
        height={50}
        style={{ objectFit: "cover", borderRadius: 8 }}
      />
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (category: string) => <Tag color="blue">{category}</Tag>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price: number) => `$${price.toFixed(2)}`,
  },
  {
    title: "Discount %",
    dataIndex: "discountPercentage",
    key: "discountPercentage",
    render: (discount: number) => `${discount}%`,
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
    render: (rating: number) => (
      <div className="flex items-center gap-2">
        <Rate disabled allowHalf defaultValue={rating} />
        <span>{rating}</span>
      </div>
    ),
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Status",
    dataIndex: "availabilityStatus",
    key: "availabilityStatus",
    render: (status: string) => (
      <Tag color={status === "In Stock" ? "green" : "red"}>{status}</Tag>
    ),
  },
];

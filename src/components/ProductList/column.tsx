import { Product } from "@/types/types";
import { Button, Image, Rate, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

type Props = {
  onView: (record: Product) => void;
  onEdit: (record: Product) => void;
};

export const getProductsColumns = ({
  onView,
  onEdit,
}: Props): ColumnsType<Product> => [
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
        preview={false}
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

  // ✅ Actions column
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <div className="flex gap-2">
        <Button size="small" onClick={() => onView(record)}>
          View
        </Button>
        <Button size="small" type="primary" onClick={() => onEdit(record)}>
          Edit
        </Button>
      </div>
    ),
  },
];

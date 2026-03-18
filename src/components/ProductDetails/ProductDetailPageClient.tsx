"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Image,
  Rate,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { useGetProductDetailsQuery } from "@/lib/services/api";
import ProductEditDrawer from "../ProductEditDrawer";
import ProductDetailSkeleton from "./ProductDetailsSkeleton";

const { Title, Text, Paragraph } = Typography;

//Helper: format date
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

//Helper: stock color
const getStockTagColor = (status: string) => {
  if (status.toLowerCase().includes("in stock")) return "green";
  if (status.toLowerCase().includes("low")) return "orange";
  return "red";
};

//Reusable info block
function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-gray-200 bg-white p-4">
      <Text className="text-xs uppercase text-gray-500">{label}</Text>
      <div className="text-sm font-semibold text-gray-900">{value}</div>
    </div>
  );
}

function ProductDetailPageClient() {
  const router = useRouter();
  const params = useParams();

  //Drawer visibility state
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  //Extract id from route
  const id = params?.id as string;

  //Fetch product using RTK Query
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductDetailsQuery({ id });

  //Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <ProductDetailSkeleton />
      </div>
    );
  }

  //Error state
  if (isError || !product) {
    return (
      <div className="text-center text-red-600">Failed to load product</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <Title level={2} className="mb-0! mt-2!">
            Product Details
          </Title>
          <Breadcrumb
            items={[{ title: "Products" }, { title: product.title }]}
          />
        </div>

        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
            Back
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setIsEditDrawerOpen(true)}
          >
            Edit
          </Button>
        </Space>
      </div>

      <Row gutter={[24, 24]}>
        {/*Images */}
        <Col xs={24} lg={14}>
          <Card>
            <Image src={product.thumbnail} alt={product.title} />
            <div className="grid grid-cols-3 gap-3 mt-4">
              {product.images?.map((img, i) => (
                <Image key={i} src={img} alt="product-thumbnail" />
              ))}
            </div>
          </Card>
        </Col>

        {/*Summary */}
        <Col xs={24} lg={10}>
          <Card>
            <Space wrap className="mb-2">
              <Tag color="blue">{product.category}</Tag>
              <Tag color={getStockTagColor(product.availabilityStatus)}>
                {product.availabilityStatus}
              </Tag>
              <Tag icon={<TagOutlined />}>{product.brand}</Tag>
            </Space>

            <Title level={3}>{product.title}</Title>

            <div className="flex items-center gap-2">
              <Rate disabled value={product.rating} />
              <Text>{product.rating}</Text>
            </div>

            <Title level={2} className="text-blue-600!">
              ${product.price}
            </Title>

            <Paragraph>{product.description}</Paragraph>

            <Divider />

            <div className="grid grid-cols-2 gap-3">
              <InfoItem label="SKU" value={product.sku} />
              <InfoItem label="Stock" value={product.stock} />
              <InfoItem label="Weight" value={`${product.weight} kg`} />
              <InfoItem
                label="Min Order"
                value={product.minimumOrderQuantity}
              />
            </div>

            <Divider />
          </Card>
        </Col>

        {/*Reviews */}
        <Col span={24}>
          <Card title="Reviews">
            {product.reviews?.map((review, i) => (
              <div key={i} className="border-b py-3">
                <Space>
                  <Avatar>{review.reviewerName[0]}</Avatar>
                  <div>
                    <Text strong>{review.reviewerName}</Text>
                    <br />
                    <Rate disabled value={review.rating} />
                    <Paragraph>{review.comment}</Paragraph>
                    <Text type="secondary">{formatDate(review.date)}</Text>
                  </div>
                </Space>
              </div>
            ))}
          </Card>
        </Col>
      </Row>

      {/* Edit Product Drawer */}
      <ProductEditDrawer
        open={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        product={product}
      />
    </div>
  );
}

export default ProductDetailPageClient;

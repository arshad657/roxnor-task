"use client";

import { useEffect } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  message,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import type { Product } from "@/types/types";
import { useEditProductMutation } from "@/lib/services/api";

const { TextArea } = Input;

type ProductEditDrawerProps = {
  open: boolean;
  onClose: () => void;
  product: Product | undefined;
};

function ProductEditDrawer({ open, onClose, product }: ProductEditDrawerProps) {
  const [form] = Form.useForm<Product>();

  const [editProduct, { isLoading }] = useEditProductMutation();

  //Prefill form fields when drawer opens or product changes
  useEffect(() => {
    if (!product) return;

    form.setFieldsValue({
      title: product.title,
      description: product.description,
      category: product.category,
      brand: product.brand,
      price: product.price,
      discountPercentage: product.discountPercentage,
      stock: product.stock,
      sku: product.sku,
      weight: product.weight,
      availabilityStatus: product.availabilityStatus,
      warrantyInformation: product.warrantyInformation,
      shippingInformation: product.shippingInformation,
      returnPolicy: product.returnPolicy,
      minimumOrderQuantity: product.minimumOrderQuantity,
      tags: product.tags,
    });
  }, [product, form]);

  //Submit handler
  const handleSubmit = async (values: Product) => {
    try {
      const payload = {
        ...values,
        title: values.title.trim(),
        description: values.description.trim(),
        category: values.category.trim(),
        brand: values.brand.trim(),
        sku: values.sku.trim().toUpperCase(),
        warrantyInformation: values.warrantyInformation.trim(),
        shippingInformation: values.shippingInformation.trim(),
        returnPolicy: values.returnPolicy.trim(),
        tags: values.tags.map((tag) => tag.trim()).filter(Boolean),
      };

      console.log("Updated payload:", payload);

      if (product) {
        await editProduct({
          id: product?.id,
          data: payload,
        }).unwrap();

        message.success("Product updated successfully");
        onClose();
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to update product");
    }
  };

  if (!open) return null;

  return (
    <Drawer
      title="Edit Product"
      placement="right"
      size={"large"}
      open={open}
      onClose={onClose}
      destroyOnClose={false}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={isLoading}
            onClick={() => form.submit()}
          >
            Save Changes
          </Button>
        </Space>
      }
    >
      <Form<Product>
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Product title is required" },
                { min: 3, message: "Title must be at least 3 characters" },
                { max: 120, message: "Title cannot exceed 120 characters" },
                {
                  validator: async (_, value) => {
                    if (!value) return;
                    if (value.trim().length < 3) {
                      throw new Error("Title cannot be only spaces");
                    }
                  },
                },
              ]}
            >
              <Input placeholder="Enter product title" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Brand"
              name="brand"
              rules={[
                { required: true, message: "Brand is required" },
                { min: 2, message: "Brand must be at least 2 characters" },
                { max: 50, message: "Brand cannot exceed 50 characters" },
              ]}
            >
              <Input placeholder="Enter brand name" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Description is required" },
                {
                  min: 20,
                  message: "Description must be at least 20 characters",
                },
                {
                  max: 1000,
                  message: "Description cannot exceed 1000 characters",
                },
                {
                  validator: async (_, value) => {
                    if (!value) return;
                    if (value.trim().length < 20) {
                      throw new Error(
                        "Description must contain meaningful text",
                      );
                    }
                  },
                },
              ]}
            >
              <TextArea rows={5} placeholder="Enter product description" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Category"
              name="category"
              rules={[
                { required: true, message: "Category is required" },
                {
                  pattern: /^[a-zA-Z0-9\s\-&]+$/,
                  message: "Category contains invalid characters",
                },
              ]}
            >
              <Input placeholder="Enter category" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Availability Status"
              name="availabilityStatus"
              rules={[
                {
                  required: true,
                  message: "Availability status is required",
                },
              ]}
            >
              <Select
                placeholder="Select availability status"
                options={[
                  { label: "In Stock", value: "In Stock" },
                  { label: "Low Stock", value: "Low Stock" },
                  { label: "Out of Stock", value: "Out of Stock" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: "Price is required" },
                {
                  type: "number",
                  min: 0.01,
                  message: "Price must be greater than 0",
                },
                {
                  validator: async (_, value) => {
                    if (value === undefined || value === null) return;
                    if (value > 100000) {
                      throw new Error("Price seems unrealistically high");
                    }
                  },
                },
              ]}
            >
              <InputNumber
                className="w-full!"
                min={0}
                step={0.01}
                placeholder="Enter price"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Discount Percentage"
              name="discountPercentage"
              rules={[
                { required: true, message: "Discount is required" },
                {
                  type: "number",
                  min: 0,
                  max: 90,
                  message: "Discount must be between 0 and 90",
                },
              ]}
            >
              <InputNumber
                className="w-full!"
                min={0}
                max={90}
                step={0.01}
                placeholder="Enter discount"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Stock"
              name="stock"
              rules={[
                { required: true, message: "Stock is required" },
                {
                  type: "number",
                  min: 0,
                  message: "Stock cannot be negative",
                },
                {
                  validator: async (_, value) => {
                    if (value === undefined || value === null) return;
                    if (!Number.isInteger(value)) {
                      throw new Error("Stock must be a whole number");
                    }
                  },
                },
              ]}
            >
              <InputNumber
                className="w-full!"
                min={0}
                step={1}
                placeholder="Enter stock quantity"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="SKU"
              name="sku"
              rules={[
                { required: true, message: "SKU is required" },
                {
                  pattern: /^[A-Za-z0-9-]+$/,
                  message: "SKU can only contain letters, numbers, and hyphens",
                },
                { min: 4, message: "SKU must be at least 4 characters" },
                { max: 30, message: "SKU cannot exceed 30 characters" },
              ]}
            >
              <Input placeholder="Enter SKU" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Weight (kg)"
              name="weight"
              rules={[
                { required: true, message: "Weight is required" },
                {
                  type: "number",
                  min: 0,
                  message: "Weight cannot be negative",
                },
                {
                  validator: async (_, value) => {
                    if (value === undefined || value === null) return;
                    if (value > 1000) {
                      throw new Error("Weight seems unrealistically high");
                    }
                  },
                },
              ]}
            >
              <InputNumber
                className="w-full!"
                min={0}
                step={0.1}
                placeholder="Enter weight"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Minimum Order Quantity"
              name="minimumOrderQuantity"
              rules={[
                {
                  required: true,
                  message: "Minimum order quantity is required",
                },
                {
                  type: "number",
                  min: 1,
                  message: "Minimum order quantity must be at least 1",
                },
                {
                  validator: async (_, value) => {
                    if (value === undefined || value === null) return;
                    if (!Number.isInteger(value)) {
                      throw new Error(
                        "Minimum order quantity must be a whole number",
                      );
                    }
                  },
                },
              ]}
            >
              <InputNumber
                className="w-full!"
                min={1}
                step={1}
                placeholder="Enter minimum order quantity"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Tags"
              name="tags"
              rules={[
                {
                  validator: async (_, value: string[]) => {
                    if (!value || value.length === 0) {
                      throw new Error("At least one tag is required");
                    }
                    const hasInvalidTag = value.some(
                      (tag) => !tag || tag.trim().length < 2,
                    );
                    if (hasInvalidTag) {
                      throw new Error("Each tag must be at least 2 characters");
                    }
                    if (value.length > 10) {
                      throw new Error("You can add up to 10 tags only");
                    }
                  },
                },
              ]}
            >
              <Select
                mode="tags"
                tokenSeparators={[","]}
                placeholder="Add tags"
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label="Warranty Information"
              name="warrantyInformation"
              rules={[
                {
                  required: true,
                  message: "Warranty information is required",
                },
                {
                  min: 5,
                  message: "Warranty information must be at least 5 characters",
                },
              ]}
            >
              <Input placeholder="Enter warranty information" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label="Shipping Information"
              name="shippingInformation"
              rules={[
                {
                  required: true,
                  message: "Shipping information is required",
                },
                {
                  min: 5,
                  message: "Shipping information must be at least 5 characters",
                },
              ]}
            >
              <Input placeholder="Enter shipping information" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label="Return Policy"
              name="returnPolicy"
              rules={[
                { required: true, message: "Return policy is required" },
                {
                  min: 5,
                  message: "Return policy must be at least 5 characters",
                },
              ]}
            >
              <Input placeholder="Enter return policy" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

export default ProductEditDrawer;

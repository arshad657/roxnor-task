export type ProductEditFormValues = {
  title: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  discountPercentage: number;
  stock: number;
  sku: string;
  weight: number;
  availabilityStatus: string;
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  tags: string[];
};

export type ProductDimensions = {
  width: number;
  height: number;
  depth: number;
};

export type GetProductsQuery = {
  q: string;
};

export type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type ProductMeta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  images: string[];
  thumbnail: string;
};

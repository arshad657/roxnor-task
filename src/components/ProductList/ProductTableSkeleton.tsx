"use client";

import { Card, Skeleton } from "antd";

function ProductsTableSkeleton() {
  return (
    <Card>
      {/* Header skeleton */}
      <div className="mb-4 flex items-center justify-between">
        <Skeleton.Input active style={{ width: 200, height: 32 }} />
        <Skeleton.Input active style={{ width: 250, height: 32 }} />
      </div>

      {/* Table rows skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-gray-100 pb-3"
          >
            <Skeleton.Image active style={{ width: 50, height: 50 }} />
            <Skeleton.Input active style={{ width: 150 }} />
            <Skeleton.Input active style={{ width: 120 }} />
            <Skeleton.Input active style={{ width: 80 }} />
            <Skeleton.Input active style={{ width: 100 }} />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ProductsTableSkeleton;
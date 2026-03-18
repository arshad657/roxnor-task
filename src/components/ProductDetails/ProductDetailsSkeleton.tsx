"use client";

import { Card, Col, Row, Skeleton } from "antd";

function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <Row gutter={[24, 24]}>
        {/* Image section */}
        <Col xs={24} lg={14}>
          <Card>
            <Skeleton.Image active style={{ width: "100%", height: 400 }} />

            <div className="mt-4 grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton.Image key={i} active />
              ))}
            </div>
          </Card>
        </Col>

        {/* Summary section */}
        <Col xs={24} lg={10}>
          <Card>
            <Skeleton active paragraph={{ rows: 3 }} />

            <div className="mt-4 space-y-3">
              <Skeleton.Input active style={{ width: "60%" }} />
              <Skeleton.Input active style={{ width: "40%" }} />
              <Skeleton.Input active style={{ width: "80%" }} />
            </div>
          </Card>
        </Col>

        {/* Reviews */}
        <Col span={24}>
          <Card>
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetailSkeleton;
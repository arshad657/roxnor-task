"use client";

import { App as AntdApp, ConfigProvider } from "antd";
import ReduxProvider from "@/lib/redux/provider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1677ff",
            borderRadius: 8,
          },
        }}
      >
        <AntdApp>{children}</AntdApp>
      </ConfigProvider>
    </ReduxProvider>
  );
}
"use client";

import ReduxProvider from "@/lib/redux/provider";
import { ConfigProvider } from "antd";

export default function Providers({ children }: { children: React.ReactNode }) {
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
        {children}
      </ConfigProvider>
    </ReduxProvider>
  );
}
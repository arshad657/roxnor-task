import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roxnor Task - Arshad Almas",
  description:
    "Next.js app with RTK, RTK Query, Antd, Tailwind, Styled Components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Providers>
            <div className="bg-gray-50">
              <div className="mx-auto max-w-7xl p-4 md:p-6">{children}</div>
            </div>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

import { Provider } from "@/provider";
import { Header } from "@/components/ui/header";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FundFusion || Decentralized Crowdfunding Application",
  description: "Decentralized Crowdfunding Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}

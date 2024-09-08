import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

import { Provider } from "@/provider";
import { Header, Footer } from "@/components/ui";

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
          <div className="min-h-[70vh]">{children}</div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

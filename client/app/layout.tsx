import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

import { Provider } from "@/provider";
import { Header, Footer, Toaster } from "@/components/ui";

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
          <Toaster position="top-center" richColors />
          <Header />
          <div className="mx-auto min-h-[70vh] px-4 xl:container sm:px-10">
            {children}
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

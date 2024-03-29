import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import ResizeChecker from "@/utility/ResizeChecker";
import Footer from "@/components/footer/Footer";
import SessionProvider from "@/components/session-provider";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";
import QueryWrapper from "@/components/QueryWrapper";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Starterpedia",
  description: "Generated by max",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={nunito.className}>
        <SessionProvider session={session}>
          <QueryWrapper>
            <Toaster position="top-center" reverseOrder={false} />
            <ResizeChecker />
            <Navbar session={session} />
            {children}
            <Footer />
          </QueryWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}

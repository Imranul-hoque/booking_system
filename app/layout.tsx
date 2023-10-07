import { getUserSession } from "@/actions/current-user";
import Navbar from "@/components/navbar/navbar";
import ModalProvider from "@/provider/modal-provider";
import SessionWrapper from "@/provider/session-provider";
import ToastProvider from "@/provider/toast-provider";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb clone",
  description: "Airbnb clone created by imran",
  
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  
  const currentUser = await getUserSession();


  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body className={font.className}>
        <SessionWrapper>
          <main className="h-[100vh]">
            <Navbar currentUser={currentUser} />
            <ModalProvider />
            <ToastProvider />
            <div className="pt-[90px]">
            {children}
            </div>
          </main>
        </SessionWrapper>
      </body>
    </html>
  );
}

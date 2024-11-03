import type { Metadata } from "next";
import "./globals.css";

import NavBar from "@/components/NavBar"
import { ChakraProvider } from "@chakra-ui/react";

import { Lato } from "next/font/google"

import { ThirdwebProvider } from "thirdweb/react";

export const metadata: Metadata = {
  title: "ChainCars",
  description: "ChainCars",
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`px-5 bg-[#f2f7f5] ${lato.className}`}>
        <ChakraProvider>
          <ThirdwebProvider>
            <NavBar/>
            {children}
          </ThirdwebProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}

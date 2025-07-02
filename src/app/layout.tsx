import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Batalha de Monstros - Revi Challenge",
  description: "Jogo de batalha de monstros desenvolvido para o desafio técnico da Revi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM Alvo BR",
  description: "CRM interno da Alvo BR para operação comercial"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

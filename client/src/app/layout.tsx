import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Budget App",
  description: "Budget App created by Victor Junqueira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}

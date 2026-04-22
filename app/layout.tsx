import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-zinc-950"}>
        {children}
      </body>
    </html>
  );
}

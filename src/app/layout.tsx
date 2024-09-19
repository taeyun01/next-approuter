import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { Footer } from "@/components/fetch-books/fetchBooks";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 책! 책! 책</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

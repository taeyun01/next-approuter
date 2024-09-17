import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";

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
          <footer>한마디: 책을 읽읍시다.</footer>
        </div>
      </body>
    </html>
  );
}

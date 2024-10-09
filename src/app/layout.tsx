import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { Footer } from "@/components/fetch-books/fetchBooks";

export default function RootLayout({
  children,
  modal, //* "/" 인덱스 페이지로 접속 하면 인덱스 페이지를 위한 페이지는 없으니 404가 뜰텐데 default페이지가 있으므로 default페이지를 띄어준다. 하지만 지금 현재 null을 반환하고 있어 아무것도 렌더링 하고 있지 않기때문에 그냥 children을 렌더링 시킨다.
}: //* 사용자가 특정 페이지로 접속하면 인터셉팅으로 가로채서 page(children)는 그대로 있고 모달만 띄워준다
Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href="/">📖 책! 책! 책!</Link>
            <Link href="/addBook">📚 내 도서 등록</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}

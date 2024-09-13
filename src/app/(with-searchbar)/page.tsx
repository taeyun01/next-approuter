import style from "./page.module.css";

export default function Home() {
  console.log("인덱스 페이지");
  return <div className={style.page}>인덱스 페이지</div>;
}

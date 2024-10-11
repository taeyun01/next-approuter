import { delay } from "@/util/delay";

export default async function ArticlesPage() {
  await delay(5000);
  // throw new Error("Error Articles...");

  return (
    <div style={{ border: "1px solid black", marginBottom: "5px" }}>
      <h2>Articles</h2>
      <p>기사 목록 페이지</p>
    </div>
  );
}

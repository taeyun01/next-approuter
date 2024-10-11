import { delay } from "@/util/delay";

export default async function UsersPage() {
  await delay(3000);
  return (
    <div style={{ border: "1px solid black", marginBottom: "5px" }}>
      <h2>Users</h2>
      <p>유저 목록 페이지</p>
    </div>
  );
}

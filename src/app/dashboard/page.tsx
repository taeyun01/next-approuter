import { delay } from "@/util/delay";

const Page = async () => {
  await delay(2000);
  return (
    <div style={{ border: "1px solid black", marginBottom: "5px" }}>
      <h2>Dashboard</h2>
      <p>대시보드 보는 곳</p>
    </div>
  );
};

export default Page;

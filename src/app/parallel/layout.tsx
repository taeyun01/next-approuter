import Link from "next/link";

const Layout = ({
  children,
  sidebar,
  feed,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  feed: React.ReactNode;
}) => {
  return (
    <div>
      <div>
        <Link href="/parallel">parallel페이지로 이동</Link>
        <br />
        {/* setting페이지로 이동하면 다른 컴포넌트는 그대로 있고 딱 feed슬롯만 렌더링 된다. */}
        <Link href="/parallel/setting">feed/setting페이지로 이동</Link>
        <br />
        <br />
      </div>
      {sidebar}
      {feed}
      {children}
    </div>
  );
};

export default Layout;

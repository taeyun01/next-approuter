import Link from "next/link";
import { ReactNode } from "react";

const DashboardLayout = ({
  children,
  users,
  articles,
  login,
}: {
  children: ReactNode;
  users: ReactNode;
  articles: ReactNode;
  login: ReactNode;
}) => {
  const renderArticles = true;
  const isLoggedIn = true;

  if (!isLoggedIn) return login;

  return (
    <>
      <nav>
        <Link href="/dashboard">Dashboard</Link> <br />
        <Link href="/dashboard/settings">Dashboard Settings</Link> <br />
      </nav>
      {children}
      {users}
      {renderArticles && articles}
      {/* <Suspense fallback={<h2>Loading Users...</h2>}>
        <Users />
      </Suspense>
      <Suspense fallback={<h2>Loading Articles...</h2>}>
        <Articles />
      </Suspense> */}
    </>
  );
};

// async function Users() {
//   await delay(3000);
//   return <h2>Users</h2>;
// }

// async function Articles() {
//   await delay(5000);
//   return <h2>Articles</h2>;
// }

export default DashboardLayout;

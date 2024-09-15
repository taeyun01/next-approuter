import Searchbar from "./_components/searchbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Searchbar />
      {/* 페이지 컴포넌트를 여기다 렌더링 시키겠다 */}
      <div>{children}</div>
    </div>
  );
};

export default Layout;

const ArticlesDefault = async () => {
  return (
    <div style={{ border: "1px solid black", margin: "5px 0" }}>
      <h2>ArticlesDefault</h2>
      <p>Articles 디폴트 페이지</p>
      <p>
        Articles만 settings경로가 없어서 처음 접속시에는 Articles루트 페이지를
        보여준다.
      </p>
      <p>하지만 새로고침을 하면 404에러가 난다.</p>
      <p>디폴트 페이지를 만들어주면 디폴트 페이지가 렌더링 된다.</p>
      <p>
        <strong>그럼이제 새로고침해도 에러가 안난다.</strong>
      </p>
    </div>
  );
};

export default ArticlesDefault;

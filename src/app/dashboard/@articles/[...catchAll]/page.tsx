const CatchAllPage = () => {
  return (
    <div>
      <h2>CatchAllPage</h2>
      <div
        style={{ border: "1px solid blue", margin: "5px 0", padding: "10px" }}
      >
        <h4>정리</h4>
        <p>
          1. dashboard/settings 페이지로 접속하면 Articles페이지 제외하고
          users페이지랑 dashboard페이지의 settings페이지가 렌더링 된다.
        </p>
        <p>
          2. Articles페이지에는 settings경로(폴더)가 없어서 처음 접속시에는 기본
          Articles페이지를 보여준다.
        </p>
        <p>3. 하지만 새로고침을 하면 404에러가 난다.</p>
        <p>
          4. 이때 Articles폴더에 default페이지를 추가하면 처음엔
          Articles페이지를 보여주고 새로고침시 default페이지를 보여줘서
          404에러가 안난다.
        </p>
        <p>
          5. 하지만 처음 접속시할때나 새로고침 할 때나 계속 같은 페이지를
          보여주고 싶다면 Articles폴더에 [...catchAll] Catch All Segment폴더에
          page를 추가하여 중첩된 모든 경로(url)파라미터를 대응하도록 설정한다.
        </p>
        <h3>마지막으로 Catch All 경로는 항상 default페이지보다 우선시 한다.</h3>
        Catch All 사용한 이유는 1번 ~ 5번 이유 때문에 사용한다. (페이지 접속시
        항상 기본 페이지를 렌더링 하고 싶어서)
      </div>
    </div>
  );
};

export default CatchAllPage;

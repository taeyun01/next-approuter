/** @type {import('next').NextConfig} */
const nextConfig = {
  // logging옵션의 fetches의 fullUrl값을 true로 설정하면 next에서 발생하는 모든 데이터 페칭이 로그로 콘솔에 출력된다.
  // 예) GET http://localhost:12346/book 200 in 105ms (cache skip), 이유 : Cache skipped reason: (cache: no-store)
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ["shopping-phinf.pstatic.net"],
  },
};

export default nextConfig;

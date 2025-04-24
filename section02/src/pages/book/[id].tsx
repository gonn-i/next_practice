import { useRouter } from 'next/router';

// [id].tsx : 동적 라우팅 – /book/123 → id = "123"
// [...id].tsx : catch-all 라우팅 – /book/a/b/c → id = ["a", "b", "c"]
// [[...id]].tsx : 옵셔널 catch-all 라우팅 – /book 또는 /book/a → id = undefined 또는 ["a"]
export default function Home() {
  const route = useRouter();
  const { id } = route.query;
  return (
    <>
      <h1> book {id} </h1>
    </>
  );
}

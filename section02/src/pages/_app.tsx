// 최상단의 루트 컴포넌트 / 모든 페이지의 부모 (React의 App.tsx )
import GlobalLayout from '@/pages/components/global-layout';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
import SearchableLayout from './components/searchable-layout';
// next/link는 CSR 기반 라우팅을 지원 (a 태그의 경우, 풀 리로딩되어 화면 깜빡거림: 서버로 요청해서 전체 페이지를 다시 받아옴 )
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

// prop 에서 Component 는 현재 페이지 컴포넌트 / PageProps는 왼쪽 페이지에 들어갈 컴포넌트를 객체로 보관
// 공통 layout 이나 hoc 로 묶어줄때 여기에서 해주면 됨
export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  // const router = useRouter();
  // const onClickButton = () => {
  //   router.push('/test');
  //   // router.replace('/path') 히스토리 스택을 교체함 (기존 URL을 덮어씀) 뒤로가기 버튼 클릭에도 이전 페이지로 못감! (특히, 로그인 이후 페이지 이동 등에 사용)
  //   // router.back() 브라우저의 뒤로 가기 기능과 동일 (히스토리 스택을 이용)
  // };
  // useEffect(() => {
  //   // 최초 접속 시에는 필요한 페이지만 JS 번들을 받기 때문에,
  //   // 이후 페이지 이동 시 해당 경로의 JS 번들을 다시 로드해야 함
  //   // 하지만 prefetch를 사용하면 미리 사전 패칭이 가능해져서 전환 속도가 빨라짐
  //   // next/link는 viewport에 보이는 링크에 대해 자동 prefetch
  //   // router.push와 같은 프로그래매틱 네비게이션을 사용할 경우
  //   // router.prefetch('/test')를 통해 수동 prefetch 지정 가능 (프로그래머틱하게 네비게이트)
  //   router.prefetch('/test');
  // }, []);

  // 인자로 받아온 page component 에서, 받은 getLayout 메서드를 꺼내거나, 없다면 그냥 페이지 랜더링
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return (
    <>
      <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
    </>
  );
}

// 아래와 같은 경우, 모든 페이지에 대해서 공통 Layout을 적용하는 경우가 해당됨
// return (
//   <GlobalLayout>
//     <SearchableLayout>{<Component {...pageProps} />}</SearchableLayout>
//   </GlobalLayout>
// );

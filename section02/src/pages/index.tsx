// 스타일의 충돌 방지를 위해서 css를 모듈화해서 사용해야함 (고유한 클래스 name으로 반환)
import { ReactNode } from 'react';
import style from './index.module.css';
import SearchableLayout from '@/pages/components/searchable-layout';

export default function Home() {
  return (
    <>
      <h1 className={style.h1}> 인덱스</h1>
      <h2 className={style.h2}> 인덱스</h2>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

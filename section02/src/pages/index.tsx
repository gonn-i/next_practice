// 스타일의 충돌 방지를 위해서 css를 모듈화해서 사용해야함 (고유한 클래스 name으로 반환)
import { ReactNode, useEffect } from 'react';
import style from './index.module.css';
import SearchableLayout from '@/pages/components/searchable-layout';
import books from '@/mock/books.json';
import BookItem from './components/book-item';
import { InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random';

// 사전 랜더링
// 매 요청마다 서버에서 실행되는 함수로, 클라이언트에서는 이 함수가 실행되지 않음 (내부에서 콘솔찍어도 보이지 않음)
export const getServerSideProps = async () => {
  // 컴포넌트보다 먼저 실행되어, 컴포넌트에 필요한 데이터를 불러오는 함수

  
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks()
  ]);

  // getServerSideProps 리턴값은 무조건 props로 감싸진 객체 하나
  return {
    props: {
      allBooks,
      recoBooks
    },
  };
};

// getServerSideProps 반환 타입을 자동으로 추론해주는 infer 타입  => InferGetServerSidePropsType
export default function Home({ allBooks,recoBooks }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  // 사실상 서버에서 한번 (JS 번들링 -> HTML 생성) / 클라이언트에서 한번 (하이드레이션 과정) 총 2번 랜더링됨
  // 내부 로직에서 window 객체를 마구 사용하면 서버는 읽을 수 없기 때문에 오류 발생
  // 따라서, 실행 시점을 고려하여, 자바스크립트 문법이나 브라우저단에서 실행할 것이 있다면 마운트된 이후인 useEffect 에 넣어서 실행할것
  // useEffect(() => {
  //   console.log(window);
  // }, []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

// 페이지 컴포넌트에 대해서, getLayout 메서드를 사용하면 => 인자로 페이지를 받아올 수 있음
// 그러면 return 할때 Wrapping해서 리턴 가능
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

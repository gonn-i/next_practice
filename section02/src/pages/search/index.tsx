// 스타일의 충돌 방지를 위해서 css를 모듈화해서 사용해야함 (고유한 클래스 name으로 반환)
import { ReactNode } from 'react';
import SearchableLayout from '@/pages/components/searchable-layout';
import BookItem from '../components/book-item';
import books from '@/mock/books.json';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';


// context는 요청에 관련한 모든 정보들을 담고 있음  (페이지 랜더링할때 전달되는 요청 )
// context안에 들어있는 것들{
//   params,       // 동적 라우팅에서 [id] 같은 파라미터
//   query,        // URL에 포함된 쿼리 스트링 (?search=abc 같은 것)
//   req,          // HTTP 요청 객체 (요청 헤더, 쿠키 등 접근 가능)
//   res,          // HTTP 응답 객체 (리다이렉트 등 처리 가능)
//   resolvedUrl,  // 사용자가 요청한 전체 URL 경로
//   locale,       // 현재 사용자의 로케일 (i18n 기능 쓸 때)
//   defaultLocale,// 기본 로케일
// }
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const q = context.query.q;
  const books = await fetchBooks(q as string);

  return {
    props: {books}
  }
}

export default function Home({books}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

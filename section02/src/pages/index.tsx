// 스타일의 충돌 방지를 위해서 css를 모듈화해서 사용해야함 (고유한 클래스 name으로 반환)
import { ReactNode } from 'react';
import style from './index.module.css';
import SearchableLayout from '@/pages/components/searchable-layout';
import books from '@/mock/books.json';
import BookItem from './components/book-item';

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
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

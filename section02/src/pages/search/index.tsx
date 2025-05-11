// 스타일의 충돌 방지를 위해서 css를 모듈화해서 사용해야함 (고유한 클래스 name으로 반환)
import { ReactNode } from 'react';
import SearchableLayout from '@/pages/components/searchable-layout';
import BookItem from '../components/book-item';
import books from '@/mock/books.json';

export default function Home() {
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

import { useRouter } from 'next/router';
import style from './[id].module.css';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchOneBook from '@/lib/fetch-one-books';

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
  const id = context.params?.id;

  const book = await fetchOneBook(Number(id));
  return {
    props: {
      book
    }
  }
}
// [id].tsx : 동적 라우팅 – /book/123 → id = "123"
// [...id].tsx : catch-all 라우팅 – /book/a/b/c → id = ["a", "b", "c"]
// [[...id]].tsx : 옵셔널 catch-all 라우팅 – /book 또는 /book/a → id = undefined 또는 ["a"]
export default function Page({book}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  if(!book) return "문제가 발생했습니다! 다시 시도하세요"
  // const route = useRouter();
  // const { id } = route.query;
  const { id: bookId, title, subTitle, description, author, publisher, coverImgUrl } = book;
  
  return (
    <div className={style.container}>
      <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl})` }}>
        <img src={coverImgUrl} alt="image-book" />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}

import { BookItemProp } from '@/types';
import Link from 'next/link';
import style from './book-item.module.css';

export default function BookItem(props: BookItemProp) {
  return (
    <Link href={`/book/${props.id}`} className={style.container}>
      <img src={props.coverImgUrl} />
      <div>
        <div className={style.title}>{props.title}</div>
        <div className={style.subTitle}>{props.subTitle}</div>
        <br />
        <div className={style.author}>
          {props.author} | {props.publisher}
        </div>
      </div>
    </Link>
  );
}

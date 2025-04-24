import { Html, Head, Main, NextScript } from 'next/document';

// 커스텀 Document: HTML 및 <head>, <body> 등의 구조를 커스터마이징할 때 사용 (정적인 HTML 레벨)
// React의 index.html과 유사한 역할
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

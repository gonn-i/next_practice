import { ReactNode } from 'react';

export default function SearchableLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>검색 관련 레이아웃</h1>
      {children}
    </div>
  );
}

import type { NextApiRequest, NextApiResponse } from 'next';

// Next.js에서 서버리스 함수 역할을 하는 API Route
// pages/api 경로에 위치, 클라이언트와 서버 간 데이터 통신에 사용
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date();
  res.status(200).json({ now: date.toLocaleString() });
}

import { API } from '@/lib/server';

export async function GET(req: Request) {
  try {
    const res = await API.post('/v1/news/fetch', {
      orderBy: 'DESC',
      sortBy: 'updatedAt',
      pageSize: 1,
      page: 1,
      isDeleted: false,
      //   "newsTagIds": [
      //     "string"
      //   ],
    });
    console.log('🚨 - GET res', res);
  } catch (error) {
    console.log('GET error', error);
  }
}

import { NextResponse } from 'next/server';

import { wait } from '@/utils';
import { getSupabaseServerClient } from '@/utils/supabase/server';

// TODO: Update params newsId to slug
export async function DELETE(
  req: Request,
  { params }: { params: { newsId: string; projectId: string } }
) {
  await wait(3000);
  try {
    const supabase = getSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    // if (!params.newsId) {
    //   return new NextResponse('News id is required', { status: 400 });
    // }

    // const storeByUserId = await prismadb.store.findFirst({
    //   where: {
    //     id: params.storeId,
    //     userId,
    //   },
    // });

    // if (!storeByUserId) {
    //   return new NextResponse('Unauthorized', { status: 405 });
    // }

    // const news = await prismadb.news.delete({
    //   where: {
    //     id: params.newsId,
    //   },
    // });

    return NextResponse.json({});
  } catch (error) {
    console.log('[NEWS_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

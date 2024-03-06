import { type NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/middleware';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // const hostname = req.headers.get('host')!;

  // const searchParams = req.nextUrl.searchParams.toString();

  // const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { supabase, response } = createClient(req);

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const user = await supabase.auth.getUser();
    console.log('🚨 - user', user);

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: req.headers,
      },
    });
  }
  // return await updateSession(req);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

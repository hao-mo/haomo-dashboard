import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

import { getSupabaseServerClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const existingProject = await prismadb.projects.findFirst({
      where: {
        name,
        userId: user.id,
      },
    });

    if (existingProject) {
      return new NextResponse('Project already exists', {
        status: 400,
      });
    }

    const projects = await prismadb.projects.create({
      data: {
        name,
        userId: user.id,
      },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.log('[PROJECTS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

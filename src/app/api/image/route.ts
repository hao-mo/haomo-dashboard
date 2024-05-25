import ImageKit from 'imagekit';
import type { UploadResponse } from 'imagekit/dist/libs/interfaces';
import type IKResponse from 'imagekit/dist/libs/interfaces/IKResponse';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { safeParseJson } from '@/utils';

const imageKit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
});

async function uploadToImageKit(file: File, folder: string, tags: string[]) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<IKResponse<UploadResponse> | null>((resolve, reject) => {
    imageKit.upload(
      {
        tags,
        folder,
        file: buffer,
        fileName: file.name,
        useUniqueFileName: true,
        isPrivateFile: false,
        responseFields: 'tags,customCoordinates,isPrivateFile,metadata',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string;
    const tags = safeParseJson<string[]>(formData.get('tags') as string) ?? [];

    if (!file) {
      return NextResponse.json({ message: 'No file provided' }, { status: 400 });
    }

    const response = await uploadToImageKit(file, folder, tags);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to upload image' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get('fileId');
    if (!fileId) {
      return NextResponse.json({ message: 'No file ID provided' }, { status: 400 });
    }

    await new Promise((resolve, reject) => {
      imageKit.deleteFile(fileId, (error) => {
        if (error) reject(error);
        else resolve(true);
      });
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete image' }, { status: 500 });
  }
}

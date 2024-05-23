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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string;
    const tags = safeParseJson<string[]>(formData.get('tags') as string) ?? [];

    if (!file) {
      return NextResponse.json({ message: 'No file provided' }, { status: 400 });
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const response = await new Promise<IKResponse<UploadResponse> | null>((resolve, reject) => {
      imageKit.upload(
        {
          file: buffer,
          fileName: file.name,
          folder,
          tags,
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

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to upload image' }, { status: 500 });
  }
}

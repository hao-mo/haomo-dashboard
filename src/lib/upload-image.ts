import type { UploadResponse } from 'imagekit/dist/libs/interfaces';

interface UploadImageProps {
  file?: File;
  folder: string;
  tags: string[];
}

export const uploadImage = async ({ file, folder, tags }: UploadImageProps) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('tags', JSON.stringify(tags));

    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    });
    const data = (await response.json()) as UploadResponse;
    return data;
  } catch (error) {
    console.log('🚨 - error', error);
    throw new Error('Failed to upload image');
  }
};

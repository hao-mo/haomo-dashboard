'use client';

import { m, useAnimation } from 'framer-motion';
import { XCircleIcon } from 'lucide-react';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/utils';

import { Input } from './ui/input';

interface FileInputAreaProps extends React.ComponentPropsWithRef<typeof Input> {
  previewImage: File | null;
}

const MotionImage = m(Image);

export const FileInputArea = ({ className, previewImage, ...props }: FileInputAreaProps) => {
  const { resetField } = useFormContext();
  const controls = useAnimation();
  const startAnimation = () => controls.start('hover');
  const stopAnimation = () => controls.stop();

  return (
    <m.div
      className={cn(
        ' relative flex h-80 items-center justify-center rounded-lg border border-dashed border-muted-foreground px-6 py-10',
        className
      )}
      initial='initial'
      whileHover='hover'
    >
      {previewImage ? (
        <>
          <PreviewImage previewImage={previewImage} />
          <button
            className='group absolute inset-0 flex size-full items-center justify-center'
            onClick={() => props.name && resetField(props.name)}
          >
            <XCircleIcon className='size-16 cursor-pointer rounded-full text-muted opacity-0 transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:opacity-100' />
          </button>
        </>
      ) : (
        <>
          <div className='space-y-4 text-center'>
            <div className='relative mx-auto h-16 min-h-fit w-12 min-w-fit'>
              {imagePlaceholders.map((image, index) => (
                <ImagePlaceholder
                  key={`image-placeholder-${index}`}
                  index={index}
                  {...image}
                />
              ))}
            </div>
            <div className='space-y-2'>
              <h2 className='text-lg font-medium text-primary'>將圖片拖至此區</h2>
              <p className='text-muted-foreground'>或點擊選擇圖片</p>
            </div>
          </div>
          <Input
            type='file'
            onDragEnter={startAnimation}
            onDragLeave={stopAnimation}
            className={cn('absolute inset-0 z-1 block size-full bg-transparent opacity-0')}
            inputClassName='size-full left-0 top-0 z-1 absolute bg-transparent'
            {...props}
          />
        </>
      )}
    </m.div>
  );
};

const imagePlaceholders: ImageDataProps[] = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1520564816385-4f9d711941aa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y292ZXIlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'image',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1645947091786-4399f228f5f0?q=80&w=3430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'image',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvdmVyJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D',
    alt: 'image',
  },
];

const PreviewImage = ({ previewImage }: { previewImage: File }) => {
  return (
    <Image
      src={URL.createObjectURL(previewImage)}
      alt={previewImage.name}
      className='h-auto w-full rounded-lg object-cover object-center'
      loading='lazy'
      fill
    />
  );
};

const ImagePlaceholder = ({ index, alt, imageUrl }: ImageDataProps & { index: number }) => {
  return (
    <MotionImage
      className='top-0 size-full rounded-lg border-2 border-muted bg-white object-cover object-center'
      variants={{
        initial: {
          x: index === 0 ? '-50%' : index === 1 ? '50%' : '0%',
          scale: index === 2 ? 1.1 : 0.95,
          rotate: index === 0 ? '-15deg' : index === 1 ? '15deg' : '0deg',
          filter: 'grayscale(80%)',
          transition: {
            duration: 0.5,
            type: 'tween',
            ease: 'easeIn',
          },
        },
        hover: {
          x: index === 0 ? '-70%' : index === 1 ? '70%' : '0%',
          scale: index === 2 ? 1.3 : 1.1,
          rotate: index === 0 ? '-20deg' : index === 1 ? '20deg' : '0deg',
          filter: 'grayscale(0%)',
          transition: {
            duration: 0.4,
            type: 'tween',
            ease: 'easeOut',
          },
        },
      }}
      src={imageUrl}
      alt={alt}
      loading='lazy'
      fill
    />
  );
};

import { cn } from '@/utils';

export const UserSetting = ({ className, children }: PropsWithChildren & WithClassName) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-x-8 gap-y-10 border-b border-muted-foreground/20 pb-12 md:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
};

export const UserSettingHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h2 className='text-base font-semibold text-foreground'>{title}</h2>
      <p className='mt-1 text-sm text-foreground/80'>{description}</p>
    </div>
  );
};

export const UserSettingContent = ({ children }: PropsWithChildren) => {
  return (
    <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2'>
      {children}

      <div className='col-span-full'>
        <label
          htmlFor='cover-photo'
          className='text-gray-900 block text-sm font-medium'
        >
          Cover photo
        </label>
        <div className='border-gray-900/25 mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10'>
          <div className='text-center'>
            {/* <ImageIcon
              className='text-gray-300 mx-auto size-12'
              aria-hidden='true'
            /> */}
            <div className='text-gray-600 mt-4 flex text-sm'>
              <label
                htmlFor='file-upload'
                className='text-indigo-600 focus-within:ring-indigo-600 hover:text-indigo-500 relative cursor-pointer rounded-md bg-white font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2'
              >
                <span>Upload a file</span>
                <input
                  id='file-upload'
                  name='file-upload'
                  type='file'
                  className='sr-only'
                />
              </label>
              <p className='pl-1'>or drag and drop</p>
            </div>
            <p className='text-gray-600 text-xs leading-5'>PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

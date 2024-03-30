import { useEffect, useState } from 'react';

export const useMount = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, []);

  return mounted;
};

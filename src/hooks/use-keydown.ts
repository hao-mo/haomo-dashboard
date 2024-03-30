import useEventListener from './use-event-listener';

type Handler = (event: KeyboardEvent) => void;

export const useKeydown = (key: string, handler: Handler) => {
  useEventListener('keydown', (event) => {
    if (event.key === key) {
      handler(event);
    }
  });
};

import useEventListener from './use-event-listener';

type Handler = (event: MouseEvent) => void;

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler?: Handler
) => {
  useEventListener('mousedown', (event) => {
    const el = ref.current;

    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(event.target as Node)) return;
    handler && handler(event);
  });
};

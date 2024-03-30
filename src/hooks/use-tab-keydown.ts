import useEventListener from './use-event-listener';

type Handler = (event: KeyboardEvent) => void;

export const useTabKeydown = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler?: Handler
) => {
  useEventListener('keydown', (event) => {
    const focusableElements = ref.current?.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (event.key === 'Tab' && focusableElements) {
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        // Shift + Tab，轉移到上一个元素
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        // Tab，轉移到下一個元素
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    }

    handler && handler(event);
  });
};

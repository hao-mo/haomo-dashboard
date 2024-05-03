import { useEffect } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

export const useJumpToErrorInput = <TFieldValues extends FieldValues = FieldValues>(
  errors: FieldErrors<TFieldValues>
) => {
  useEffect(() => {
    const errorKeys = Object.keys(errors);

    if (errorKeys.length > 0) {
      const firstErrorKey = errorKeys[0];
      const errorInput = document.querySelector(`input[name="${firstErrorKey}"]`) as HTMLElement;
      if (errorInput) {
        errorInput.focus();
        return;
      }
      const errorLabel = document.getElementById(firstErrorKey) as HTMLElement;
      if (errorLabel) {
        errorLabel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [errors]);
};

declare module 'flatpickr' {
  export type FlatpickrOptions = {
    allowInput?: boolean;
    disableMobile?: boolean;
    dateFormat?: string;
    defaultDate?: string;
    onChange?: (selectedDates: Date[], dateStr: string) => void;
  };

  export interface FlatpickrInstance {
    destroy(): void;
    setDate(date: string, triggerChange?: boolean): void;
    input: HTMLInputElement;
  }

  export default function flatpickr(element: HTMLElement, options?: FlatpickrOptions): FlatpickrInstance;
}

declare module 'flatpickr/dist/types/instance' {
  export type Instance = {
    destroy(): void;
    setDate(date: string, triggerChange?: boolean): void;
    input: HTMLInputElement;
  };
}


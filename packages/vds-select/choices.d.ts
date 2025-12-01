declare module 'choices.js' {
  export interface Options {
    removeItemButton?: boolean;
    searchEnabled?: boolean;
    itemSelectText?: string;
    placeholder?: boolean;
    placeholderValue?: string;
    searchPlaceholderValue?: string;
    noResultsText?: string;
    noChoicesText?: string;
    uniqueItemText?: string;
    shouldSort?: boolean;
    silent?: boolean;
  }

  export interface Choice {
    value: string;
    label: string;
    disabled?: boolean;
    selected?: boolean;
  }

  export interface Dropdown {
    isActive: boolean;
  }

  export interface PassedElement {
    element: HTMLElement;
  }

  export default class Choices {
    constructor(element: HTMLElement | string, options?: Options);
    destroy(): void;
    setChoiceByValue(value: string | string[]): void;
    getValue(valueOnly?: boolean): string | string[] | Choice[];
    clearStore(): void;
    hideDropdown(): void;
    showDropdown(): void;
    dropdown: Dropdown;
    passedElement: PassedElement;
  }
}


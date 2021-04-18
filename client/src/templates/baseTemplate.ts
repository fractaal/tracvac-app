export interface FormItem {
  isSeparator: boolean;
  name: string;
  displayName: string;
  description?: string;
  type: string;
  options: string[];
  format: string;
  limit?: number;
  isRequired: boolean | undefined;
  /**
   * Conditionally render this item based on current form data
   * @param data Current form data.
   */
  conditionalFunction?(data: Record<string, any>): boolean;
}

export interface Section {
  title: string;
  description: string;
  formItems: FormItem[];
}

export interface TypeMap {
    string: string,
    number: number,
    boolean: boolean,
    // eslint-disable-next-line @typescript-eslint/ban-types
    symbol: Symbol,
    undefined: undefined,
    // eslint-disable-next-line @typescript-eslint/ban-types
    object: object,
    // eslint-disable-next-line @typescript-eslint/ban-types
    function: Function,
    date: Date,
}

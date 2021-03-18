export interface FormItem {
  isSeparator: boolean;
  name: string;
  displayName: string;
  description?: string;
  type: string;
  options: string[];
  format: string;
  limit?: number;
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

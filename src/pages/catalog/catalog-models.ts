export interface CatalogState {
  style: string;
  color: string;
  size: string;
}

export interface KeyValuePair {
  text: string;
  value: string;
}

export interface StylesValuePair extends KeyValuePair {
  disabled?: boolean;
}

export interface ShirtPageViewModel {
  styles: StylesValuePair[];
  colors: string[];
  sizes: KeyValuePair[];
}

export const styles: KeyValuePair[] = [
  { text: 'Crew', value: 'C' },
  { text: 'V-Neck', value: 'V' }
];

export const sizes: KeyValuePair[] = [
  { text: 'Small', value: 'S' },
  { text: 'Medium', value: 'M' },
  { text: 'Large', value: 'L' },
  { text: 'Extra Large', value: 'XL' },
  { text: 'XXL', value: 'XXL' }
];

export const colors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4'
];

export const shirtPageLookups: ShirtPageViewModel = {
  styles: styles,
  colors: colors,
  sizes: sizes
};

export interface Data {
  name: string | null;
}

export interface Props {
  data: Data;
  mode: 'light' | 'dark';
}
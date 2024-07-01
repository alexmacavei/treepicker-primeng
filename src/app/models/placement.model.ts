export interface Placement {
  name: string;
  section: string;
  level: number;
  children: Placement[];
}

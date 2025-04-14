// Type definitions for react-calendar
export type Value = Date | Date[] | null;

// Extended type for calendar tile props
export interface TileProps {
  date: Date;
  view: string;
}

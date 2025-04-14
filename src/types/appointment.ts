import { ReactNode } from "react";

export interface AppointmentType {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
}

import { ReactNode, Ref } from "react";

export interface TableProps {
  header: string[];
  children: ReactNode;
}

export interface TableRowProps {
  data: object;
}
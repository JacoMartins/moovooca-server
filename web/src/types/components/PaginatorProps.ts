export interface PaginatorProps {
  page: number;
  setPage: (page:number) => void;
  update?: boolean;
  setUpdate?: (arg0: boolean) => void;
  data: {
    items: object[];
    pages: string;
    page: string;
  };
}
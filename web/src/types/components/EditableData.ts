export interface EditableDataProps {
  data: { id: number };
  tableSchema: {
    name: string;
    fields: object;
  };
  update: boolean;
  setUpdate?: (data: boolean) => void;
  handleOpenMenuModal: (id: number) => void;
  handleCloseModal: () => void;
}
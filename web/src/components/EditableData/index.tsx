import { Pencil, Trash } from "phosphor-react";
import { Tr } from "./styles";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useRouter } from "next/router";
import { api } from "../../services/api";


interface EditableDataProps {
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

export default function EditableData({ data, tableSchema, handleOpenMenuModal }: EditableDataProps) {
  const router = useRouter()
  const organizedData = Object.assign(tableSchema.fields, data)
  const dataValues = Object.values(organizedData)
  const filteredValues = dataValues.map(value => value === null ? '' : value)

  return (
    <Tr onClick={() => handleOpenMenuModal(data.id)}>
      {filteredValues.map((value, index) => {
        if (typeof value === 'object') {
          return null
        }

        return (
          <td key={value + index.toString()}>
            {value}
          </td>
        )
      })}
    </Tr>
  )
}
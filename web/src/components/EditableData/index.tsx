import { Tr } from "./styles";
import { useRouter } from "next/router";
import { EditableDataProps } from "../../types/components/EditableData";

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
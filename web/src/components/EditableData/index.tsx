import { Tr } from "./styles";

interface EditableDataProps {
  data: { id: number };
  order: object;
}

export default function EditableData({ data, order }: EditableDataProps) {
  const organizedData = Object.assign(order, data)
  const dataValues = Object.values(organizedData)
  const filteredValues = dataValues.map(value => value === null ? '' : value)

  return (
    <Tr>
      {filteredValues.map((value, index) => {
        if (typeof value === 'object') {
          return (
            <></>
          )
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
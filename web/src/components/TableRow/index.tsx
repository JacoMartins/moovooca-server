import { TableRowProps } from "../../types/components/table";
import { Main } from "./styles";

export default function TableRow ({data}:TableRowProps) {
  return(
    <Main>
      {Object.entries(data).map(([key, value]) => (
        <td key={key}>{value}</td>
      ))}
    </Main>
  )
}
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
  handleOpenModal: (id: number) => void;
  handleCloseModal: () => void;
}

export default function EditableData({ data, tableSchema, update, setUpdate, handleOpenModal }: EditableDataProps) {
  const router = useRouter()
  const organizedData = Object.assign(tableSchema.fields, data)
  const dataValues = Object.values(organizedData)
  const filteredValues = dataValues.map(value => value === null ? '' : value)

  function goTo(route: string) {
    event.preventDefault()
    router.push(route)
  }

  async function handleDeleteItem(id: number) {
    await api.delete(`/${tableSchema.name}?id=${id}`)
    setUpdate(!update)
  }

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild className="DropdownMenuButton">
          <Tr>
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
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5} align='start'>
            <DropdownMenu.Label className="DropdownMenuLabel" style={{ paddingLeft: '0.5rem' }}>
              Item {data.id}
            </DropdownMenu.Label>
            <DropdownMenu.Arrow className="DropdownMenuArrow" />

            <DropdownMenu.Item className="DropdownMenuItem" onClick={() => handleOpenModal(data.id)}>
              <DropdownMenu.Item className="DropdownMenuItemIndicator" asChild={false}>
                <Pencil size={14} weight="bold" color="rgba(0, 0, 0, 0.8)" />
              </DropdownMenu.Item>
              Editar
            </DropdownMenu.Item>

            {/* <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger className="DropdownSubTriggerItem">
                Editar
                <CaretRight size={14} weight="bold" color="rgba(0, 0, 0, 0.8)" />
              </DropdownMenu.SubTrigger>

              <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                  className="DropdownMenuContent"
                  sideOffset={2}
                  style={{
                    marginLeft: '-0.25rem'
                  }}
                >
                  {Object.keys(organizedData).map(item => {
                    if (typeof organizedData[item] !== 'object') {
                      return (
                        <DropdownMenu.Item style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '0.5rem'
                        }}>
                          {item}:
                          <input type="text" defaultValue={organizedData[item]} style={{
                            padding: 0,
                            border: 0,
                            backgroundColor: 'transparent'
                          }} />
                        </DropdownMenu.Item>
                      )
                    }
                  })}
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub> */}

            <DropdownMenu.Item className="DropdownMenuItem" onClick={() => handleDeleteItem(data.id)}>
              <DropdownMenu.Item className="DropdownMenuItemIndicator" asChild={false}>
                <Trash size={14} weight="bold" color="rgba(0, 0, 0, 0.8)" />
              </DropdownMenu.Item>
              Remover
            </DropdownMenu.Item>

          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  )
}
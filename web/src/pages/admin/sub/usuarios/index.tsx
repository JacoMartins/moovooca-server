import { useRouter } from "next/router"
import { CircleNotch, Export, Funnel, List, MagnifyingGlass, Plus } from "phosphor-react"
import { useEffect, useState } from "react"
import Table from "../../../../components/Table"
import { api } from "../../../../services/api"
import { Usuario, paginated_usuarios } from "../../../../types/api/usuario"
import { AdminSubMain } from "../../../../styles/pages/admin"
import EditableData from "../../../../components/EditableData"
import { usuarioSchema } from "../../../../utils/tableSchemas"
import { clean_object } from "../../../../utils/clean_object"
import Paginator from "../../../../components/Paginator"
import AdminModal from "../../../../components/AdminModal"
import { AdminSubProps } from "../../../../types/pages/AdminSub"

export default function AdminUsuarios({ item_id, handleSub, handleOpenSidebar, handleCloseSidebar }: AdminSubProps) {
  const router = useRouter()

  const [dataBusy, setDataBusy] = useState<boolean>(false)
  const [usuarios, setUsuarios] = useState<paginated_usuarios>()
  const [update, setUpdate] = useState<boolean>(false)

  const [modal, setModal] = useState<boolean>(false)
  const [modalItem, setModalItem] = useState<number>()
  const [modalType, setModalType] = useState<number>(0)
  const [buttonBusy, setButtonBusy] = useState<boolean>(false)

  const [itemData, setItemData] = useState<Usuario>()
  const [itemDataRequest, setItemDataRequest] = useState<Usuario>()

  const [page, setPage] = useState<number>(1)
  const showFilter = Object.keys(usuarioSchema.fields).find(item => item.startsWith('id_'))

  function goTo(route: string) {
    event.preventDefault()
    router.push(route)
  }

  function handleOpenMenuModal(id: number) {
    setModal(true)
    setModalItem(id)

    setModalType(3)
  }

  function handleOpenExportModal() {
    setModal(true)
    setModalType(5)
  }

  function handleOpenAddModal() {
    const obj = clean_object(usuarioSchema.fields) as Usuario;

    setModal(true)
    setModalItem(null)
    setItemData(obj)
    setItemDataRequest(obj)
    setModalType(1)
  }

  function handleOpenEditModal(id: number) {
    setModal(true)
    setModalItem(id)
    setItemData(usuarios.items.find(item => item.id === id))
    setItemDataRequest(usuarios.items.find(item => item.id === id))
    setModalType(0)
  }

  function handleOpenErrorModal() {
    setModal(true)
    setModalItem(null)
    setModalType(2)
  }

  function handleOpenFilterModal() {
    setModal(true)
    setModalItem(null)
    setItemData(null)
    setItemDataRequest(null)
    setModalType(4)
  }

  function handleCloseModal() {
    setModal(false)
  }

  async function handleAddItem(data: Usuario) {
    const { id: _id, criado_em, atualizado_em, reservas, ...filteredData } = data

    setButtonBusy(true)

    await api.post(`/usuario`, filteredData)

    setButtonBusy(false)
    handleCloseModal()
    setUpdate(!update)
  }

  async function handleEditItem(id: number, data: Usuario) {
    const { id: _id, criado_em, atualizado_em, reservas, ...filteredData } = data

    setButtonBusy(true)

    await api.put(`/usuario?id=${id}`, filteredData)

    setButtonBusy(false)
    handleCloseModal()
    setUpdate(!update)
  }

  useEffect(() => {
    const fetch = async () => {
      setDataBusy(true)

      if (item_id) {
        await api.get(`/usuario?id=${item_id}`).then(res => setUsuarios({
          items: [res.data],
          pages: '1',
          page: '1'
        })).catch(() => handleOpenErrorModal())
      } else {
        await api.get(`/usuarios?page=${page}&limit=15`).then(res => setUsuarios(res.data))
      }

      setDataBusy(false)
    }

    fetch()
  }, [update, item_id, page])

  return (
    <AdminSubMain>
      <AdminModal
        isOpen={modal}
        onRequestClose={handleCloseModal}
        modalType={modalType}
        schema={usuarioSchema}
        handleAddItem={handleAddItem}
        handleOpenEditModal={handleOpenEditModal}
        handleEditItem={handleEditItem}
        modalItem={modalItem}
        itemData={itemData}
        itemDataRequest={itemDataRequest}
        setItemDataRequest={setItemDataRequest}
        buttonBusy={buttonBusy}
        setButtonBusy={setButtonBusy}
        handleSub={handleSub}
        setUpdate={setUpdate}
        update={update}
      />

      <section className='dataSection'>
        <div className="headerContainer">
          <button onClick={handleOpenSidebar}>
            <List size={24} weight='regular' color="rgba(0, 0, 0, 0.8)" />
          </button>
          <h2>Linhas</h2>
        </div>

        <h3 className='lead'>Selecione, adicione, altere ou remova linhas.</h3>
        <div className="actionsContainer">
          {usuarios &&
            <button onClick={handleOpenExportModal}>
              <Export size={18} weight='regular' color='#276749' />
              Exportar para CSV
            </button>
          }

          {
            showFilter &&
            <button onClick={handleOpenFilterModal}>
              <Funnel size={18} weight='regular' color='#276749' />
              Filtrar
            </button>
          }
        </div>
      </section>

      <button className="addButton" onClick={() => handleOpenAddModal()}><Plus size={24} weight='regular' color='white' /></button>

      <section className='lineSection'>
        <Table header={Object.keys(usuarioSchema.fields).filter(item => item !== 'reservas')}>
          {dataBusy ?
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row-reverse',
              gap: '0.25rem',
            }}>
              Carregando <CircleNotch className="load" size={18} weight='regular' color="#2f855a" />
            </div>
            :
            usuarios && usuarios.items.map(usuario => (
              <EditableData
                key={usuario.id}
                data={usuario}
                tableSchema={usuarioSchema}
                update={update}
                setUpdate={setUpdate}
                handleOpenMenuModal={handleOpenMenuModal}
                handleCloseModal={handleCloseModal}
              />
            ))}
        </Table>
      </section>

      {
        usuarios &&
        <Paginator
          setPage={setPage}
          page={page}
          update={update}
          setUpdate={setUpdate}
          data={usuarios}
        />
      }
    </AdminSubMain>
  )
}
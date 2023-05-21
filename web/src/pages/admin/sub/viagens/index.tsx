import { useRouter } from "next/router"
import { CircleNotch, Export, Funnel, List, MagnifyingGlass, Plus } from "phosphor-react"
import { useEffect, useState } from "react"
import Table from "../../../../components/Table"
import { api } from "../../../../services/api"
import { paginated_viagens, viagem } from "../../../../types/api/viagem"
import { AdminSubMain } from "../../../../styles/pages/admin"
import EditableData from "../../../../components/EditableData"
import { viagemSchema } from "../../../../utils/tableSchemas"
import { clean_object } from "../../../../utils/clean_object"
import Paginator from "../../../../components/Paginator"
import AdminModal from "../../../../components/AdminModal"
import { AdminSubProps } from "../../../../types/pages/AdminSub"

export default function AdminViagens({ item_id, handleSub, handleOpenSidebar, handleCloseSidebar, id_linha, id_sentido }: AdminSubProps) {
  const router = useRouter()

  const [dataBusy, setDataBusy] = useState<boolean>(false)
  const [viagens, setViagens] = useState<paginated_viagens>()
  const [update, setUpdate] = useState<boolean>(false)

  const [modal, setModal] = useState<boolean>(false)
  const [modalItem, setModalItem] = useState<number>()
  const [modalType, setModalType] = useState<number>(0)
  const [buttonBusy, setButtonBusy] = useState<boolean>(false)

  const [itemData, setItemData] = useState<viagem>()
  const [itemDataRequest, setItemDataRequest] = useState<viagem>()

  const [page, setPage] = useState<number>(1)
  const showFilter = Object.keys(viagemSchema.fields).find(item => item.startsWith('id_'))

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
    const obj = clean_object(viagemSchema.fields) as viagem;

    setModal(true)
    setModalItem(null)
    setItemData(obj)
    setItemDataRequest(obj)
    setModalType(1)
  }

  function handleOpenEditModal(id: number) {
    setModal(true)
    setModalItem(id)
    setItemData(viagens.items.find(item => item.id === id))
    setItemDataRequest(viagens.items.find(item => item.id === id))
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

  async function handleAddItem(data: viagem) {
    const { id: _id, criado_em, atualizado_em, linha, sentido, ...filteredData } = data

    setButtonBusy(true)

    await api.post(`/viagem`, filteredData)

    setButtonBusy(false)
    handleCloseModal()
    setUpdate(!update)
  }

  async function handleEditItem(id: number, data: viagem) {
    const { id: _id, criado_em, atualizado_em, linha, sentido, ...filteredData } = data

    setButtonBusy(true)

    await api.put(`/viagem?id=${id}`, filteredData)

    setButtonBusy(false)
    handleCloseModal()
    setUpdate(!update)
  }

  useEffect(() => {
    const fetch = async () => {
      setDataBusy(true)

      let api_link = `/viagens?page=${page}&limit=15`

      if (item_id) {
        await api.get(`/viagem?id=${item_id}`).then(res => setViagens({
          items: [res.data],
          pages: '1',
          page: '1'
        })).catch(() => handleOpenErrorModal())
        setDataBusy(false)

        return
      }
      
      if (id_linha) {
        api_link += `${api_link.includes('=') ? '&' : ''}linha=${id_linha}`
      }

      if (id_sentido) {
        api_link += `${api_link.includes('=') ? '&' : ''}sentido=${id_linha}`
      }

      await api.get(api_link).then(res => setViagens(res.data))
      setDataBusy(false)
    }

    fetch()
  }, [update, item_id, id_linha, id_sentido, page])

  return (
    <AdminSubMain>
      <AdminModal
        isOpen={modal}
        onRequestClose={handleCloseModal}
        modalType={modalType}
        schema={viagemSchema}
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
          <h2>Viagens</h2>
        </div>

        <h3 className='lead'>Selecione, adicione, altere ou remova viagens.</h3>
        <div className="actionsContainer">
          {viagens &&
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
        <Table header={Object.keys(viagemSchema.fields).filter(key => key !== 'linha' && key !== 'sentido' && key !== 'reservas')}>
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
            viagens && viagens.items.map(viagem => (
              <EditableData
                key={viagem.id}
                data={viagem}
                tableSchema={viagemSchema}
                update={update}
                setUpdate={setUpdate}
                handleOpenMenuModal={handleOpenMenuModal}
                handleCloseModal={handleCloseModal}
              />
            ))}
        </Table>
      </section>

      {
        viagens &&
        <Paginator
          setPage={setPage}
          page={page}
          update={update}
          setUpdate={setUpdate}
          data={viagens}
        />
      }
    </AdminSubMain>
  )
}
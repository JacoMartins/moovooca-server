import { useRouter } from "next/router"
import { CircleNotch, List, MagnifyingGlass, Plus, X } from "phosphor-react"
import { useEffect, useState } from "react"
import Table from "../../../../components/Table"
import { api } from "../../../../services/api"
import { linha, paginated_linhas } from "../../../../types/api/linha"
import EditableData from "../../../../components/EditableData"
import { AdminSubMain } from "../../../../styles/pages/admin"
import { linhaSchema } from "../../../../utils/tableSchemas"
import { clean_object } from "../../../../utils/clean_object"
import Paginator from "../../../../components/Paginator"
import AdminModal from "../../../../components/AdminModal"

export default function AdminLinhas({ item_id, handleSub, handleOpenSidebar, handleCloseSidebar }) {
  const router = useRouter()

  const [linhas, setLinhas] = useState<paginated_linhas>()
  const [dataBusy, setDataBusy] = useState<boolean>(false)
  const [update, setUpdate] = useState<boolean>(false)
  const [busy, setBusy] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>('')

  const [modal, setModal] = useState<boolean>(false)
  const [modalItem, setModalItem] = useState<number>()
  const [modalType, setModalType] = useState<number>(0)
  const [buttonBusy, setButtonBusy] = useState<boolean>(false)

  const [itemData, setItemData] = useState<linha>()
  const [itemDataRequest, setItemDataRequest] = useState<linha>()

  const [page, setPage] = useState<number>(1)

  function goTo(route: string) {
    event.preventDefault()
    router.push(route)
  }

  function handleOpenMenuModal(id: number) {
    setModal(true)
    setModalItem(id)

    setModalType(3)
  }

  function handleOpenAddModal() {
    const obj = clean_object(linhaSchema.fields) as linha;

    setModal(true)
    setModalItem(null)
    setItemData(obj)
    setItemDataRequest(obj)

    setModalType(1)
  }

  function handleOpenEditModal(id: number) {
    setModal(true)
    setModalItem(id)
    setItemData(linhas.items.find(item => item.id === id))
    setItemDataRequest(linhas.items.find(item => item.id === id))
    setModalType(0)
  }

  function handleOpenErrorModal() {
    setModal(true)
    setModalItem(null)
    setModalType(2)
  }

  function handleCloseModal() {
    setModal(false)
  }

  function handleSearch() {
    event.preventDefault()
    goTo(`/search?query=${searchInput}`)
    setBusy(true)
  }

  async function handleAddItem(data: linha) {
    const { id: _id, criado_em, atualizado_em, sentidos, ...filteredData } = data

    setButtonBusy(true)

    await api.post(`/linha`, filteredData)

    setButtonBusy(false)
    handleCloseModal()
    setUpdate(!update)
  }

  async function handleEditItem(id: number, data: linha) {
    const { id: _id, criado_em, atualizado_em, sentidos, ...filteredData } = data

    setButtonBusy(true)

    await api.put(`/linha?id=${id}`, filteredData)

    setButtonBusy(false)
    handleCloseModal()
    setUpdate(!update)
  }

  useEffect(() => {
    const fetch = async () => {
      setDataBusy(true)

      if (item_id) {
        await api.get(`/linha?id=${item_id}`).then(res => setLinhas({
          items: [res.data],
          pages: '1',
          page: '1'
        })).catch(() => handleOpenErrorModal())
      } else {
        await api.get(`/linhas?page=${page}`).then(res => setLinhas(res.data))
      }

      setDataBusy(false)
    }

    fetch()
  }, [update, router.asPath])

  return (
    <AdminSubMain>
      <AdminModal
        isOpen={modal}
        onRequestClose={handleCloseModal}
        modalType={modalType}
        schema={linhaSchema}
        handleAddItem={handleAddItem}
        handleOpenEditModal={handleOpenEditModal}
        handleEditItem={handleEditItem}
        modalItem={modalItem}
        itemData={itemData}
        itemDataRequest={itemDataRequest}
        setItemDataRequest={setItemDataRequest}
        buttonBusy={buttonBusy}
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
        
        <form onSubmit={handleSearch} className='searchContainer'>
          <input type="text" placeholder="Pesquisar" onChange={event => setSearchInput(event.target.value)} />
          <button type='submit'>
            {
              busy ?
                <CircleNotch className="load" size={18} weight='regular' color="#2f855a" />
                :
                <MagnifyingGlass size={18} weight="bold" color="#2f855a" />
            }
          </button>
        </form>
      </section>

      <button className="addButton" onClick={() => handleOpenAddModal()}><Plus size={24} weight='regular' color='white' /></button>

      <section className='lineSection'>
        <Table header={Object.keys(linhaSchema.fields).filter(item => item !== 'sentidos')}>
          {dataBusy ?
            <tr>
              <td style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row-reverse',
                gap: '0.25rem',
              }}>
                Carregando <CircleNotch className="load" size={18} weight='regular' color="#2f855a" />
              </td>
            </tr>
            :
            linhas && linhas.items.map(linha => (
              <EditableData
                key={linha.id}
                data={linha}
                tableSchema={linhaSchema}
                update={update}
                setUpdate={setUpdate}
                handleOpenMenuModal={handleOpenMenuModal}
                handleCloseModal={handleCloseModal}
              />
            ))}
        </Table>
      </section>

      {
        linhas &&
        <Paginator
          setPage={setPage}
          page={page}
          update={update}
          setUpdate={setUpdate}
          data={linhas}
        />
      }
    </AdminSubMain>
  )
}
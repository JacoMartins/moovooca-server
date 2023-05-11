import { useRouter } from "next/router"
import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight, CircleNotch, MagnifyingGlass, Plus, X } from "phosphor-react"
import { useEffect, useRef, useState } from "react"
import Table from "../../../../components/Table"
import { api } from "../../../../services/api"
import Modal from 'react-modal'
import { paginated_reservas, reserva } from "../../../../types/api/reserva"
import { AdminSubMain, ModalContainer } from "../../../../styles/pages/admin"
import EditableData from "../../../../components/EditableData"
import { reservaSchema } from "../../../../utils/tableSchemas"
import moment from "moment"
import { clean_object } from "../../../../utils/clean_object"
import { int } from "../../../../utils/convert"

export default function AdminReservas() {
  const router = useRouter()

  const [busy, setBusy] = useState<boolean>(false)
  const [dataBusy, setDataBusy] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>('')
  const [reservas, setReservas] = useState<paginated_reservas>()
  const [update, setUpdate] = useState<boolean>(false)

  const [modal, setModal] = useState<boolean>(false)
  const [modalItem, setModalItem] = useState<number>()
  const [modalType, setModalType] = useState<number>(0)
  const [buttonBusy, setButtonBusy] = useState<boolean>(false)

  const [itemData, setItemData] = useState<reserva>()
  const [itemDataRequest, setItemDataRequest] = useState<reserva>()

  const [page, setPage] = useState<number>(1)

  const pageContainerRef = useRef<HTMLDivElement>()

  function goTo(route: string) {
    event.preventDefault()
    router.push(route)
  }

  function handleSearch() {
    event.preventDefault()
    goTo(`/search?query=${searchInput}`)
    setBusy(true)
  }

  function handleOpenEditModal(id: number) {
    setModal(true)
    setModalItem(id)
    setItemData(reservas.items.find(item => item.id === id))
    setItemDataRequest(reservas.items.find(item => item.id === id))
    setModalType(0)
  }

  function handleOpenAddModal() {
    const obj = clean_object(reservaSchema.fields) as reserva;

    setModal(true)
    setModalItem(null)
    setItemData(obj)
    setItemDataRequest(obj)
    setModalType(1)
  }

  function handleCloseModal() {
    setModal(false)
  }

  async function handleAddItem(data: reserva) {
    const { id: _id, criado_em, atualizado_em, usuario, viagem, ...filteredData } = data

    setButtonBusy(true)

    await api.post(`/reserva`, filteredData)

    setButtonBusy(false)
    handleCloseModal()
    setUpdate(!update)
  }

  async function handleEditItem(id: number, data: reserva) {
    const { id: _id, criado_em, atualizado_em, usuario, viagem, ...filteredData } = data

    setButtonBusy(true)

    await api.put(`/reserva?id=${id}`, filteredData)

    setButtonBusy(false)
    handleCloseModal()
    setUpdate(!update)
  }

  function handleChangePage(elmnt_left: number, page: number) {
    setPage(page)

    pageContainerRef.current.scrollTo({
      left: elmnt_left - 128,
      behavior: 'smooth'
    })

    setUpdate(!update)
  }

  function handleFirstPage() {
    setPage(1)

    pageContainerRef.current.scrollBy({
      left: -100000,
      behavior: 'smooth'
    })

    setUpdate(!update)
  }

  function handleLastPage() {
    setPage(int(reservas.pages))

    pageContainerRef.current.scrollBy({
      left: +100000,
      behavior: 'smooth'
    })

    setUpdate(!update)
  }

  function handlePreviousPage() {
    page > 1 && setPage(page - 1)

    pageContainerRef.current.scrollBy({
      left: -32,
      behavior: 'smooth'
    })

    setUpdate(!update)
  }

  function handleNextPage() {
    page < int(reservas.pages) && setPage(page + 1)

    pageContainerRef.current.scrollBy({
      left: +32,
      behavior: 'smooth'
    })

    setUpdate(!update)
  }

  useEffect(() => {
    const fetch = async () => {
      setDataBusy(true)
      await api.get(`/reservas?page=${page}`).then(res => setReservas(res.data))
      setDataBusy(false)
    }

    fetch()
  }, [update])

  Modal.setAppElement('.react-modal')

  return (
    <AdminSubMain>
      <Modal
        isOpen={modal}
        onRequestClose={handleCloseModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <div className="react-modal-content-header">
          <h2>
            {modalType === 0 && 'Editar Item'}
            {modalType === 1 && 'Adicionar Item'}
          </h2>
          <X className="react-modal-close" size={24} onClick={handleCloseModal} />
        </div>

        <div className="react-modal-container">
          <ModalContainer>
            <div className="itemDataContainer" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}>
              {itemData &&
                Object.entries(Object.assign(reservaSchema.fields, itemData)).map(([key, value]) => {
                  if (typeof value !== 'object') {
                    return (
                      <div key={key + value + itemData.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: '0.25rem'
                      }}>
                        {key}:
                        <input
                          className="editInput"
                          type={key == 'senha' ? 'password' : typeof value === 'number' ? 'number' : moment(value.length > 3 && value).isValid() ? 'datetime-local' : typeof value === 'string' && 'text'}
                          defaultValue={moment(value.length > 3 && value).isValid() ? value.substring(0, 16) : value}
                          onChange={event => setItemDataRequest({ ...itemDataRequest, [key]: typeof value === 'number' ? event.target.valueAsNumber : event.target.value })}
                          disabled={key === 'id' || key === 'criado_em' || key === 'atualizado_em'}
                        />
                      </div>
                    )
                  }
                }
                )}

              {modalType === 0 && <button className="sendButton" onClick={() => handleEditItem(itemData.id, itemDataRequest)} disabled={buttonBusy}>
                {buttonBusy ?
                  <>
                    <CircleNotch className="load" size={20} weight='regular' color="white" />
                    Enviando...
                  </>
                  :
                  'Enviar alterações'}
              </button>}

              {modalType === 1 && <button className="sendButton" onClick={() => handleAddItem(itemDataRequest)} disabled={buttonBusy}>
                {buttonBusy ?
                  <>
                    <CircleNotch className="load" size={20} weight='regular' color="white" />
                    Enviando alterações...
                  </>
                  :
                  'Adicionar item'}
              </button>}
            </div>
          </ModalContainer>
        </div>
      </Modal>

      <section className="dataSection">
        <h2>Reservas</h2>
        <h3 className='lead'>Selecione, adicione, altere ou remova reservas.</h3>
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
        <Table header={Object.keys(reservaSchema.fields).filter(item => item !== 'usuario' && item !== 'viagem')}>
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
            reservas && reservas.items.map(reserva => (
              <EditableData
                key={reserva.id}
                data={reserva}
                tableSchema={reservaSchema}
                update={update}
                setUpdate={setUpdate}
                handleOpenModal={handleOpenEditModal}
                handleCloseModal={handleCloseModal}
              />
            ))}
        </Table>
      </section>

      {
        reservas && <div className="paginationContainer">
          <div className="paginationButtons">
            <button onClick={handleFirstPage} disabled={!(page > 1)}>
              <CaretDoubleLeft size={14} weight="regular" />
            </button>
            <button onClick={handlePreviousPage} disabled={!(page > 1)}>
              <CaretLeft size={14} weight="regular" />
            </button>

            <div className="pagesContainer" ref={pageContainerRef}>
              {[...Array(int(reservas.pages))].map((key, value) => (
                <button className={page === value + 1 ? 'pageSelected' : ''} key={value} onClick={(event: any) => handleChangePage(event.target.offsetLeft, value + 1)}>
                  {value + 1}
                </button>
              ))}
            </div>

            <button onClick={handleNextPage} disabled={!(page < int(reservas.pages))}>
              <CaretRight size={14} weight="regular" />
            </button>

            <button onClick={handleLastPage} disabled={!(page < int(reservas.pages))}>
              <CaretDoubleRight size={14} weight="regular" />
            </button>
          </div>
        </div>
      }
    </AdminSubMain>
  )
}
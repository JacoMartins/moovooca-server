import { useRouter } from "next/router"
import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight, CircleNotch, MagnifyingGlass, Plus, X } from "phosphor-react"
import { useEffect, useRef, useState } from "react"
import Table from "../../../../components/Table"
import Modal from 'react-modal'
import { api } from "../../../../services/api"
import { paginated_viagens, viagem } from "../../../../types/api/viagem"
import { AdminSubMain, ModalContainer } from "../../../../styles/pages/admin"
import EditableData from "../../../../components/EditableData"
import { viagemSchema } from "../../../../utils/tableSchemas"
import moment from "moment"
import { clean_object } from "../../../../utils/clean_object"
import { int } from "../../../../utils/convert"

export default function AdminViagens() {
  const router = useRouter()

  const [busy, setBusy] = useState<boolean>(false)
  const [dataBusy, setDataBusy] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>('')
  const [viagens, setViagens] = useState<paginated_viagens>()
  const [update, setUpdate] = useState<boolean>(false)

  const [modal, setModal] = useState<boolean>(false)
  const [modalItem, setModalItem] = useState<number>()
  const [modalType, setModalType] = useState<number>(0)
  const [buttonBusy, setButtonBusy] = useState<boolean>(false)

  const [itemData, setItemData] = useState<viagem>()
  const [itemDataRequest, setItemDataRequest] = useState<viagem>()

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
    setItemData(viagens.items.find(item => item.id === id))
    setItemDataRequest(viagens.items.find(item => item.id === id))
    setModalType(0)
  }

  function handleOpenAddModal() {
    const obj = clean_object(viagemSchema.fields) as viagem;

    setModal(true)
    setModalItem(null)
    setItemData(obj)
    setItemDataRequest(obj)
    setModalType(1)
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
    setPage(int(viagens.pages))

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
    page < int(viagens.pages) && setPage(page + 1)

    pageContainerRef.current.scrollBy({
      left: +32,
      behavior: 'smooth'
    })

    setUpdate(!update)
  }

  useEffect(() => {
    const fetch = async () => {
      setDataBusy(true)
      await api.get(`/viagens?page=${page}`).then(res => setViagens(res.data))
      setDataBusy(false)
    }

    fetch()
  }, [update])

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
                Object.entries(Object.assign(viagemSchema.fields, itemData)).map(([key, value]) => {
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
                          type={key === 'senha' ? 'password' : typeof value === 'number' ? 'number' : moment(value.length > 3 && value).isValid() || key.startsWith('hor') ? 'datetime-local' : typeof value === 'string' && 'text'}
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
        <h2>Viagens</h2>
        <h3 className='lead'>Selecione, adicione, altere ou remova viagens.</h3>
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
                handleOpenModal={handleOpenEditModal}
                handleCloseModal={handleCloseModal}
              />
            ))}
        </Table>
      </section>

      {
        viagens && <div className="paginationContainer">
          <div className="paginationButtons">
            <button onClick={handleFirstPage} disabled={!(page > 1)}>
              <CaretDoubleLeft size={14} weight="regular" />
            </button>
            <button onClick={handlePreviousPage} disabled={!(page > 1)}>
              <CaretLeft size={14} weight="regular" />
            </button>

            <div className="pagesContainer" ref={pageContainerRef}>
              {[...Array(int(viagens.pages))].map((key, value) => (
                <button className={page === value + 1 ? 'pageSelected' : ''} key={value} onClick={(event: any) => handleChangePage(event.target.offsetLeft, value + 1)}>
                  {value + 1}
                </button>
              ))}
            </div>

            <button onClick={handleNextPage} disabled={!(page < int(viagens.pages))}>
              <CaretRight size={14} weight="regular" />
            </button>

            <button onClick={handleLastPage} disabled={!(page < int(viagens.pages))}>
              <CaretDoubleRight size={14} weight="regular" />
            </button>
          </div>
        </div>
      }
    </AdminSubMain>
  )
}
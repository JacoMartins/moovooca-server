import { useRouter } from "next/router"
import { Bus, CircleNotch, MagnifyingGlass, X } from "phosphor-react"
import { useEffect, useRef, useState } from "react"
import Table from "../../../../components/Table"
import TableRow from "../../../../components/TableRow"
import { api } from "../../../../services/api"
import Modal from 'react-modal'
import { reserva } from "../../../../types/api/reserva"
import { AdminSubMain, ModalContainer } from "../../../../styles/pages/admin"
import EditableData from "../../../../components/EditableData"
import { reservaSchema } from "../../../../utils/tableSchemas"
import moment from "moment"

export default function AdminReservas() {
  const router = useRouter()

  const [busy, setBusy] = useState<boolean>(false)
  const [dataBusy, setDataBusy] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>('')
  const [reservas, setReservas] = useState<reserva[]>([])
  const [update, setUpdate] = useState<boolean>(false)

  const [modal, setModal] = useState<boolean>(false)
  const [modalItem, setModalItem] = useState<number>()
  const [modalType, setModalType] = useState<number>(0)
  const [editBusy, setEditBusy] = useState<boolean>(false)

  const [itemData, setItemData] = useState<reserva>()
  const [itemDataRequest, setItemDataRequest] = useState<reserva>()

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
    setItemData(reservas.find(item => item.id === id))
    setItemDataRequest(reservas.find(item => item.id === id))
    setModalType(0)
  }

  function handleCloseModal() {
    setModal(false)
  }

  async function handleEditItem(id: number, data: reserva) {
    const { id: _id, criado_em, atualizado_em, usuario, viagem, ...filteredData } = data

    setEditBusy(true)

    await api.put(`/reserva?id=${id}`, filteredData)

    setEditBusy(false)
    handleCloseModal()
    setUpdate(!update)
  }

  useEffect(() => {
    const fetch = async () => {
      setDataBusy(true)
      await api.get('/reservas').then(res => setReservas(res.data))
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
          <h2>{modalType === 0 && 'Editar Item'}</h2>
          <X className="react-modal-close" size={24} onClick={handleCloseModal} />
        </div>

        <div className="react-modal-container">
          <ModalContainer>
            <div className="itemDataContainer" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}>
              {itemData && Object.entries(Object.assign(reservaSchema.fields, itemData)).map(([key, value]) => {
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
                        type={typeof value === 'number' ? 'number' : moment(value.length > 3 && value).isValid() ? 'datetime-local' : 'text'}
                        defaultValue={moment(value.length > 3 && value).isValid() ? value.substring(0, 16) : value}
                        onChange={event => setItemDataRequest({ ...itemDataRequest, [key]: typeof value === 'number' ? event.target.valueAsNumber : event.target.value })}
                        disabled={key === 'id' || key === 'criado_em' || key === 'atualizado_em'}
                      />
                    </div>
                  )
                }
              })}
            </div>
            <button className="sendButton" onClick={() => handleEditItem(itemData.id, itemDataRequest)} disabled={editBusy}>
              {
                editBusy ?
                  <>
                    <CircleNotch className="load" size={20} weight='regular' color="white" />
                    Enviando...
                  </>
                  :
                  'Enviar alterações'
              }
            </button>
          </ModalContainer>
        </div>
      </Modal>
      <h1>Reservas</h1>
      <h3 className='lead'>Pesquise ou selecione a linha que fica melhor para você.</h3>
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
            reservas.map(reserva => (
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
    </AdminSubMain>
  )
}
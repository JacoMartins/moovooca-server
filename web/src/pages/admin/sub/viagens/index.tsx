import { useRouter } from "next/router"
import { Bus, CircleNotch, MagnifyingGlass, X } from "phosphor-react"
import { useEffect, useRef, useState } from "react"
import Table from "../../../../components/Table"
import TableRow from "../../../../components/TableRow"
import Modal from 'react-modal'
import { api } from "../../../../services/api"
import { Usuario } from "../../../../types/api/usuario"
import { viagem } from "../../../../types/api/viagem"
import { AdminSubMain, ModalContainer } from "../../../../styles/pages/admin"
import EditableData from "../../../../components/EditableData"
import { viagemSchema } from "../../../../utils/tableSchemas"
import moment from "moment"

export default function AdminViagens() {
  const router = useRouter()

  const [busy, setBusy] = useState<boolean>(false)
  const [dataBusy, setDataBusy] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>('')
  const [viagens, setViagens] = useState<viagem[]>([])
  const [update, setUpdate] = useState<boolean>(false)

  const [modal, setModal] = useState<boolean>(false)
  const [modalItem, setModalItem] = useState<number>()
  const [modalType, setModalType] = useState<number>(0)
  const [editBusy, setEditBusy] = useState<boolean>(false)

  const [itemData, setItemData] = useState<viagem>()
  const [itemDataRequest, setItemDataRequest] = useState<viagem>()

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
    setItemData(viagens.find(item => item.id === id))
    setItemDataRequest(viagens.find(item => item.id === id))
    setModalType(0)
  }

  function handleCloseModal() {
    setModal(false)
  }

  async function handleEditItem(id: number, data: viagem) {
    const { id: _id, criado_em, atualizado_em, linha, sentido, ...filteredData } = data

    setEditBusy(true)

    await api.put(`/viagem?id=${id}`, filteredData)

    setEditBusy(false)
    handleCloseModal()
    setUpdate(!update)
  }

  useEffect(() => {
    const fetch = async () => {
      setDataBusy(true)
      await api.get('/viagens').then(res => setViagens(res.data))
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
              {itemData && Object.entries(Object.assign(viagemSchema.fields, itemData)).map(([key, value]) => {
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
      <h1>Viagens</h1>
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
            viagens.map(viagem => (
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
    </AdminSubMain>
  )
}
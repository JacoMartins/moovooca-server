import { useRouter } from "next/router"
import { Bus, CircleNotch, MagnifyingGlass, X } from "phosphor-react"
import { useEffect, useRef, useState } from "react"
import Table from "../../../../components/Table"
import TableRow from "../../../../components/TableRow"
import Modal from 'react-modal'
import { api } from "../../../../services/api"
import { linha } from "../../../../types/api/linha"
import EditableData from "../../../../components/EditableData"
import { AdminSubMain, ModalContainer } from "../../../../styles/pages/admin"
import { linhaSchema } from "../../../../utils/tableSchemas"
import moment from "moment"

export default function AdminLinhas() {
  const router = useRouter()

  const [linhas, setLinhas] = useState<linha[]>([])
  const [dataBusy, setDataBusy] = useState<boolean>(false)
  const [update, setUpdate] = useState<boolean>(false)
  const [busy, setBusy] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>('')

  const [modal, setModal] = useState<boolean>(false)
  const [modalItem, setModalItem] = useState<number>()
  const [modalType, setModalType] = useState<number>(0)
  const [editBusy, setEditBusy] = useState<boolean>(false)

  const [itemData, setItemData] = useState<linha>()
  const [itemDataRequest, setItemDataRequest] = useState<linha>()

  function goTo(route: string) {
    event.preventDefault()
    router.push(route)
  }

  function handleOpenEditModal(id: number) {
    setModal(true)
    setModalItem(id)
    setItemData(linhas.find(item => item.id === id))
    setItemDataRequest(linhas.find(item => item.id === id))
    setModalType(0)
  }

  function handleCloseModal() {
    setModal(false)
  }

  function handleSearch() {
    event.preventDefault()
    goTo(`/search?query=${searchInput}`)
    setBusy(true)
  }

  async function handleEditItem(id: number, data: linha) {
    const { id: _id, criado_em, atualizado_em, sentidos, ...filteredData } = data

    setEditBusy(true)

    await api.put(`/linha?id=${id}`, filteredData)

    setEditBusy(false)
    handleCloseModal()
    setUpdate(!update)
  }

  useEffect(() => {
    const fetch = async () => {
      setDataBusy(true)
      await api.get('/linhas').then(res => setLinhas(res.data))
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
              {itemData && Object.entries(Object.assign(linhaSchema.fields, itemData)).map(([key, value]) => {
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
      <section className='dataSection'>
        <h1>Linhas</h1>
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
      </section>

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
            linhas.map(linha => (
              <EditableData
                key={linha.id}
                data={linha}
                tableSchema={linhaSchema}
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
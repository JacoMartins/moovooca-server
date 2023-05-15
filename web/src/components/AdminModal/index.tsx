import { ArrowSquareOut, CircleNotch, PencilSimple, Trash, X } from "phosphor-react"
import { ChangeEvent, HTMLInputTypeAttribute } from "react"
import Modal from 'react-modal'
import { api } from "../../services/api"
import { ModalContainer } from "./styles"

export default function AdminModal({ isOpen, onRequestClose, modalType, modalItem, schema, handleAddItem, handleOpenEditModal, handleEditItem, itemData, itemDataRequest, setItemDataRequest, buttonBusy, handleSub, setUpdate, update }) {
  Modal.setAppElement('.react-modal')

  async function handleDeleteItem(id: number) {
    await api.delete(`/${schema.name}?id=${id}`)
    onRequestClose()
    setUpdate(!update)
  }

  function handleChangeInput(key: string, value: any, event: ChangeEvent<HTMLInputElement>) {
    setItemDataRequest({
      ...itemDataRequest,
      [key]: typeof value === 'number' ? event.target.valueAsNumber : event.target.value
    })

    console.log(itemDataRequest)
  }

  function setInputType(key: string, value: any): HTMLInputTypeAttribute {
    switch (true) {
      case (key.startsWith('dat') || key === 'criado_em' || key === 'atualizado_em' || key === 'horario_partida' || key === 'horario_chegada'): return 'datetime-local'
      case (key === 'horario_inicio' || key === 'horario_fim'): return 'time'
      case (typeof value === 'number'): return 'number'
      case (typeof value === 'string'): return 'text'
      case (key === 'senha'): return 'password'
    }
  }

  function padronizeValue(key: string, value: any): string | number | readonly string[] {
    if (key.startsWith('dat') || key.startsWith('hor') || key === 'criado_em' || key === 'atualizado_em') {
      if (typeof value === 'string') {
        return value.substring(0, 16)
      }
    } else {
      if (typeof value === 'string' || typeof value === 'number') {
        return value
      }
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div className="react-modal-content-header">
        <h2>
          {modalType === 0 && 'Editar Item'}
          {modalType === 1 && 'Adicionar Item'}
          {modalType === 2 && 'Erro'}
          {modalType === 3 && `Item ${modalItem}`}
        </h2>
        <X className="react-modal-close" size={24} onClick={onRequestClose} />
      </div>

      <div className="react-modal-container">
        <ModalContainer>
          <div className="itemDataContainer" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}>
            {
              ((modalType === 0 || modalType === 1) && itemData) &&
              Object.entries(Object.assign(schema.fields, itemData)).map(([key, value]) => {
                if (typeof value !== 'object') {
                  const type = setInputType(key, value)
                  const defaultValue = padronizeValue(key, value)

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
                        type={type}
                        defaultValue={defaultValue}
                        onChange={event => handleChangeInput(key, value, event)}
                        disabled={key === 'id' || key === 'criado_em' || key === 'atualizado_em'}
                      />
                      {
                        key.startsWith('id_') &&
                        <button className="redirectButton" onClick={() => handleSub(`${key.replace('id_', '') === 'viagem' ? key.slice(3, 8) + 'ns' : key.replace('id_', '') + 's'}?id=${value}`)}>
                          <ArrowSquareOut size={16} weight='regular' color='#2f855a' />
                        </button>
                      }
                    </div>
                  )
                }
              })
            }

            {
              modalType === 0 && <button className="sendButton" onClick={() => handleEditItem(itemData.id, itemDataRequest)} disabled={buttonBusy}>
                {buttonBusy ?
                  <>
                    <CircleNotch className="load" size={20} weight='regular' color="white" />
                    Enviando...
                  </>
                  :
                  'Enviar alterações'}
              </button>
            }

            {
              modalType === 1 && <button className="sendButton" onClick={() => handleAddItem(itemDataRequest)} disabled={buttonBusy}>
                {buttonBusy ?
                  <>
                    <CircleNotch className="load" size={20} weight='regular' color="white" />
                    Enviando alterações...
                  </>
                  :
                  'Adicionar item'}
              </button>
            }

            {
              modalType === 2 &&
              <span>
                Nenhum item encontrado.
              </span>
            }

            {
              modalType === 3 && 
              <div className="menuList">
                <button onClick={() => handleOpenEditModal(modalItem)}><PencilSimple size={16} weight='regular' color='rgba(0, 0, 0, 0.8)' /> Editar Item</button>
                <button onClick={() => handleDeleteItem(modalItem)}><Trash size={16} weight='regular' color='rgba(0, 0, 0, 0.8)' /> Remover Item</button>
              </div>
            }
          </div>
        </ModalContainer>
      </div>
    </Modal>
  )
}
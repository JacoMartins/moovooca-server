import { ArrowSquareOut, CircleNotch, PencilSimple, Trash, X } from "phosphor-react"
import { useState } from "react"
import { ChangeEvent, HTMLInputTypeAttribute } from "react"
import { CSVLink } from "react-csv"
import Modal from 'react-modal'
import { api } from "../../services/api"
import { paginated_linhas } from "../../types/api/linha"
import { clean_object } from "../../utils/clean_object"
import { int } from "../../utils/convert"
import { ModalContainer } from "./styles"

export default function AdminModal({ isOpen, onRequestClose, modalType, modalItem, schema, handleAddItem, handleOpenEditModal, handleEditItem, itemData, itemDataRequest, setItemDataRequest, buttonBusy, setButtonBusy, handleSub, setUpdate, update }) {
  const [filterObj, setFilterObj] = useState<any>({})
  const [limitBool, setLimitBool] = useState<boolean>(false)
  const [limit, setLimit] = useState<number>()
  const [exportPage, setExportPage] = useState<number>(1)
  const [exportData, setExportData] = useState<paginated_linhas>()

  async function handleBringExportData(limit: number | null, page: number) {
    setButtonBusy(true)

    await api.get(`/${schema.name + 's'}?page=${page}${limit && '&limit=' + limit}`).then(res => setExportData({
      items: res.data.items.map(item => {
        const { sentidos, ...rest } = Object.assign({ ...schema.fields }, item)
        return rest
      }),
      pages: res.data.pages,
      page: res.data.page,
    }));

    setButtonBusy(false)
  }

  function handleToggleLimit() {
    if (limitBool) {
      setLimitBool(false)
      setLimit(null)
      setExportPage(1)

      handleBringExportData(null, 1)
    } else {
      setLimitBool(true)
    }
  }

  !exportData && handleBringExportData(null, 1)

  function handleToggleField(field: string) {
    if (Object.keys(filterObj).find(item => item === field)) {
      const { [field]: property, ...rest } = filterObj
      setFilterObj(rest)
    } else {
      const [property, value] = Object.entries(clean_object(schema.fields)).find(([key, value]) => key === field)
      setFilterObj({ ...filterObj, [property]: value })
    }
  }

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

  Modal.setAppElement('.react-modal')

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
          {modalType === 4 && `Filtrar items`}
          {modalType === 5 && `Exportar para CSV`}
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

            <div className="filterContainer">
              {
                modalType === 4 &&
                <>
                  <span>Campos</span>
                  <div className="fieldsContainer">
                    {Object.entries(clean_object({ ...schema.fields })).map(([key, value]) => {
                      const key_id = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

                      return (
                        <div key={key_id} className="checkboxContainer">
                          <input
                            type='checkbox'
                            id={key + key_id}
                            name={key + key_id}
                            onChange={() => handleToggleField(key)}
                            checked={Object.keys(filterObj).find(item => item === key) && true}
                          />
                          <label htmlFor={key + key_id}>{key}</label>
                        </div>
                      )
                    })}
                  </div>
                </>
              }
              {
                (modalType === 4 && filterObj) &&
                Object.entries(filterObj).map(([key, value]) => {
                  const type = setInputType(key, value)
                  const defaultValue = padronizeValue(key, value)

                  return (
                    <div key={key} className="filterFieldContainer">
                      <div className="field">
                        {key}
                      </div>
                      <select className="operator">
                        <option>=</option>
                        <option>{'<'}</option>
                        <option>{'>'}</option>
                        <option>NOT</option>
                      </select>
                      <input
                        className="editInput"
                        type={type}
                        defaultValue={defaultValue}
                        onChange={event => handleChangeInput(key, value, event)}
                      />
                    </div>
                  )
                })
              }
            </div>

            {
              modalType === 5 &&
              <div className="exportContainer">
                <div className="checkboxContainer">
                  <input
                    type='checkbox'
                    id='exportLimitCheckbox'
                    name='exportLimitCheckbox'
                    onChange={handleToggleLimit}
                    checked={limitBool}
                  />
                  <label htmlFor='exportLimitCheckbox'>Usar limite e paginação?</label>
                </div>
                {limitBool && <input placeholder="Insira o limite desejado" type="number" onChange={event => { setLimit(event.target.valueAsNumber); handleBringExportData(event.target.valueAsNumber, exportPage) }} />}
                {
                  exportData &&
                  <>
                    <div className="selectPageContainer">
                      <span>Página:</span>
                      <select className="operator" onChange={event => { setExportPage(int(event.target.value)); handleBringExportData(limit, int(event.target.value)) }}>
                        {[...Array(int(exportData.pages))].map((key, value) => <option>
                          {value + 1}
                        </option>)}
                      </select>
                    </div>
                    <span>Total de Páginas: {exportData.pages}</span>
                    <CSVLink data={exportData.items} filename={`linhas${new Date().toISOString()}.csv`} onClick={onRequestClose}>
                      <button className="sendButton" disabled={buttonBusy}>
                        {buttonBusy ?
                          <>
                            <CircleNotch className="load" size={20} weight='regular' color="white" />
                            Obtendo os dados...
                          </>
                          :
                          'Exportar'}
                      </button>
                    </CSVLink>
                  </>
                }
              </div>
            }
          </div>
        </ModalContainer>
      </div>
    </Modal>
  )
}
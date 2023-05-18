import Header from '../../components/Header'
import { BodyContainer, ModalContainer } from '../../styles/pages/linhas'
import Modal from 'react-modal'
import { api } from '../../services/api'
import { linha, paginated_linhas } from '../../types/api/linha'
import Table from '../../components/Table'
import TableRow from '../../components/TableRow'
import { Bus, CaretRight, CircleNotch, MagnifyingGlass, X } from 'phosphor-react'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'
import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { AuthContext } from '../../contexts/AuthContext'
import { GlobalMain } from "../../styles/global";
import Paginator from '../../components/Paginator'
import { int } from '../../utils/convert'
import { sentido } from '../../types/api/sentido'

export default function Linhas({ head_coletivos, head_privados, page }) {
  const router = useRouter()

  const [searchInput, setSearchInput] = useState<string>('')
  const [busy, setBusy] = useState(false)

  const [modalType, setModalType] = useState<number>(0)
  const [modal, setModal] = useState(false)

  const [coletivos, setColetivos] = useState<paginated_linhas>()
  const [privados, setPrivados] = useState<paginated_linhas>()

  function goTo(path: string) {
    event.preventDefault()
    router.push(path)
  }

  function handleSearch() {
    event.preventDefault()
    goTo(`/search?query=${searchInput}`)
    setBusy(true)
  }

  function openModal(modalType: number) {
    setModalType(modalType)
    setModal(true)
  }

  function closeModal() {
    setModal(false)
  }

  useEffect(() => {
    if (modalType === 0) {
      const fetch = async () => await api.get(`/linhas?tipo=COLETIVO&page=${page}&limit=15`).then(res => setColetivos(res.data))
      fetch()
    }

    if (modalType === 1) {
      const fetch = async () => await api.get(`/linhas?tipo=PRIVADO&page=${page}&limit=15`).then(res => setPrivados(res.data))
      fetch()
    }
  }, [modalType, page])

  console.log(head_coletivos)

  Modal.setAppElement('.react-modal')

  return (
    <>
      <Head>
        <title>Moovooca - Linhas</title>
        <meta name='description' content='Linhas de Ônibus dos Campus UFC' />
      </Head>
      <GlobalMain>
        <Modal
          isOpen={modal}
          onRequestClose={closeModal}
          overlayClassName="react-modal-overlay"
          className="react-modal-content"
        >
          <div className="react-modal-content-header">
            <h2>
              Linhas
              {modalType == 0 && ' Coletivas'}
              {modalType == 1 && ' Privadas'}
            </h2>
            <X className="react-modal-close" size={24} onClick={closeModal} />
          </div>

          <div className="react-modal-container">
            <ModalContainer>
              {modalType == 0 &&
                <Table header={['Todos']}>
                  {coletivos && coletivos.items.map((linha: linha) => {
                    return (
                      <TableRow key={linha.id} data={{
                        linha:
                          <button className='tableButton' onClick={() => goTo(`/linha?id=${linha.id}&sid=${linha.sentidos[0].id}`)}>
                            <div className='firstContainer'>
                              <span><Bus size={18} color="#2f855a" weight="bold" />{linha.cod}</span>
                              {linha.nome} - {linha.tipo}
                            </div>
                            <div className='lastContainer'>
                              <span>Passa próximo de</span>
                              <a>{linha.campus}</a>
                            </div>
                          </button>,
                      }} />
                    )
                  })}
                </Table>}

              {modalType == 1 &&
                <Table header={['Todos']}>
                  {privados && privados.items.map((linha: linha) => {
                    return (
                      <TableRow key={linha.id} data={{
                        linha:
                          <button onClick={() => goTo(`/linha?id=${linha.id}&sid=${linha.sentidos[0].id}`)}>
                            <div className='firstContainer'>
                              <span><Bus size={18} color="#2f855a" weight="bold" />{linha.cod}</span>
                              {linha.nome} - {linha.tipo}
                            </div>
                            <div className='lastContainer'>
                              <span>Passa próximo de</span>
                              <a>{linha.campus}</a>
                            </div>
                          </button>,
                      }} />
                    )
                  })}
                </Table>}
            </ModalContainer>
          </div>
        </Modal>
        <Header />
        <BodyContainer>
          <section className="headerSection">
            <div className="textContainer">
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
            </div>
          </section>

          <section className='lineSection'>
            {head_coletivos.items.length > 0 &&
              <Table header={['Transporte Público: Coletivos']}>
                {head_coletivos.items.map((linha: linha) => {
                  return (
                    <TableRow key={linha.id} data={{
                      linha:
                        <button className='tableButton' onClick={() => goTo(`/linha?id=${linha.id}&sid=${linha.sentidos[0].id}`)}>
                          <div className='firstContainer'>
                            <span><Bus size={18} color="#2f855a" weight="bold" />{linha.cod}</span>
                            {linha.nome} - {linha.tipo}
                          </div>
                          <div className='lastContainer'>
                            <span>Passa próximo de</span>
                            <a>{linha.campus}</a>
                          </div>
                        </button>,
                    }} />
                  )
                })}
                <TableRow data={{
                  linha:
                    <div>
                      <Paginator 
                        page={int(page)} 
                        setPage={(page:number) => goTo(`/linhas?page=${page}`)}
                        data={head_coletivos}
                      />
                    </div>,
                }} />
              </Table>
            }

            {head_privados.items.length > 0 && <Table header={['Transporte Privado']}>
              {head_privados.items.map((linha: linha) => {
                return (
                  <TableRow key={linha.id} data={{
                    linha:
                      <button className='tableButton' onClick={() => goTo(`/linha?id=${linha.id}&sid=${linha.sentidos[0].id}`)}>
                        <div className='firstContainer'>
                          <span><Bus size={18} color="#2f855a" weight="bold" />{linha.cod}</span>
                          {linha.nome} - {linha.tipo}
                        </div>
                        <div className='lastContainer'>
                          <span>Passa próximo de</span>
                          <a>{linha.campus}</a>
                        </div>
                      </button>,
                  }} />
                )
              })}
              <TableRow data={{
                linha:
                  <div>
                    <button onClick={() => openModal(1)}>
                      <div className='firstContainer'>
                        Ver mais
                        <CaretRight size={18} weight='regular' />
                      </div>
                    </button>
                  </div>,
              }} />
            </Table>}
          </section>
        </BodyContainer>
      </GlobalMain>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { page } = context.query
  const page_ = page ? page : 1

  const { data: head_coletivos } = await api.get(`/linhas?tipo=COLETIVO&page=${page_}&limit=15`);
  const { data: head_privados } = await api.get(`/linhas?tipo=PRIVADO&page=${page_}&limit=15`);

  return {
    props: {
      page: page_,
      head_coletivos,
      head_privados
    }
  }
}
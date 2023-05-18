import Header from '../../components/Header'
import { BodyContainer } from '../../styles/pages/search'

import { api } from '../../services/api'
import { linha } from '../../types/api/linha'
import Table from '../../components/Table'
import TableRow from '../../components/TableRow'
import { Bus, CircleNotch, MagnifyingGlass } from 'phosphor-react'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { GlobalMain } from "../../styles/global";
import Paginator from '../../components/Paginator'
import { int } from '../../utils/convert'

export default function Search({ linhas, query, texto_gerado, page }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [searchInput, setSearchInput] = useState<string>('')

  function goTo(path: string) {
    event.preventDefault()
    router.push(path)
  }

  function handleSearch() {
    setBusy(true)
    goTo(`/search?query=${searchInput}`)
  }

  useEffect(() => {
    setBusy(false)
  }, [linhas])

  return (
    <>
      <Head>
        <title>{query ? `${query} - Pesquisa Moovooca` : `Moovooca - Pesquisa`}</title>
        <meta name='description' content='Linhas de Ônibus dos Campus UFC' />
      </Head>
      <GlobalMain>
        <Header />
        <BodyContainer>
          <section className="headerSection">
            <div className="textContainer">
              <h1>Buscar</h1>
              <h3 className='lead'>Pesquise ou selecione a linha que fica melhor para você.</h3>
              <form onSubmit={handleSearch} className='searchContainer'>
                <input type="text" placeholder="Pesquisar" defaultValue={query} onChange={event => setSearchInput(event.target.value)} />
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
            <div className='gptText'>
              <span className='bold'>{
                !texto_gerado ?
                  'Gerando texto...'
                  :
                  'Texto gerado por inteligência artifical: '
              }</span>
              <br />
              <span>{texto_gerado && texto_gerado}</span>
            </div>
          </section>

          <section className='lineSection'>
            <Table header={[]}>
              {linhas.items.map((linha: linha) => {
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
              {
                linhas.pages > 1 &&
                <TableRow data={{
                  linha:
                    <div>
                      <Paginator
                        page={int(page)}
                        setPage={(page: number) => goTo(`/search?query=${query}&page=${page}`)}
                        data={linhas}
                      />
                    </div>,
                }} />
              }
            </Table>
          </section>
        </BodyContainer>
      </GlobalMain>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const page = context.query.page ? context.query.page : 1
  const query = context.query.query || '';

  const { data: linhas } = await api.get(`/linhas/search?query=${query}&page=${page}&limit=15`);
  // const { data: texto_gerado } = await api.post(`/linhas/search?query=${query}`);

  return {
    props: {
      linhas,
      query,
      page,
      texto_gerado: ''
    }
  }
}
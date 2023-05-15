import Header from '../../components/Header'
import { BodyContainer } from '../../styles/pages/reservas'

import { api } from '../../services/api'
import { useEffect, useState } from 'react'
import Table from '../../components/Table'
import TableRow from '../../components/TableRow'
import { Bus, Trash } from 'phosphor-react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { GetServerSidePropsContext } from 'next'
import { format_date, format_datetime } from '../../utils/format_datetime'
import { paginated_reservas, reserva } from '../../types/api/reserva'
import { GlobalMain } from "../../styles/global";
import { parseServerSideCookies } from '../../utils/parseServerSideCookies'
import { Usuario } from '../../types/api/usuario'

export default function Reservas({ me }: { me: Usuario }) {
  const [reservas, setReservas] = useState<paginated_reservas>()
  const [reload, setReload] = useState(false)
  const router = useRouter()

  function goTo(route: string) {
    router.push(route)
  }

  if (!me.id) {
    goTo('/')
  }

  async function handleDeleteBooking(id: number) {
    console.log(`/reserva?id=${id}`)
    await api.delete(`/reserva?id=${id}`)
      .catch(except => console.log(except))
    setReload(!reload)
  }

  useEffect(() => {
    const fetch = async () => {
      await api.get('/reservas')
        .then(res => setReservas(res.data))
        .catch(except => console.log(except))
    }


    fetch()
  }, [reload])

  return (
    <>
      <Head>
        <title>Moovooca - Minhas reservas</title>
        <meta name='description' content='Linhas de Ônibus dos Campus UFC' />
      </Head>
      <GlobalMain>
        <Header />
        <BodyContainer>
          <section className="myBookingsSection">
            <Table header={['Minhas Reservas']}>
              {reservas && reservas.items.length > 0 ? reservas.items.map(reserva => (
                <TableRow key={reserva.id} data={{
                  linha:
                    <button className="bookingRow tableButton">
                      <div className='firstContainer'>
                        <span><Bus size={18} color="#2f855a" weight="bold" />{reserva.viagem.linha.cod}</span>
                        <div className="bookingInfo">
                          <a><a className='bold'>Linha: </a>{reserva.viagem.linha.cod} - {reserva.viagem.linha.nome}</a>
                          <a><a className='bold'>Código da reserva: </a>{reserva.cod}</a>
                          <a><a className='bold'>Data da viagem: </a>{format_date(reserva.viagem.data)}</a>
                          <a><a className='bold'>Horário de partida: </a>{format_datetime(reserva.viagem.horario_partida)}</a>
                          <a><a className='bold'>Estimativa de término: </a>{format_datetime(reserva.viagem.horario_chegada)}</a>
                        </div>
                      </div>
                      <div className='lastContainer'>
                        <button onClick={() => handleDeleteBooking(reserva.id)}>
                          <Trash size={20} weight='regular' />
                        </button>
                      </div>
                    </button>,
                }} />
              )) : <p>Ainda não há nenhuma reserva aqui.</p>}
            </Table>
          </section>
        </BodyContainer>
      </GlobalMain>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = parseServerSideCookies(context.req.headers.cookie) as { __session: string, __session_refresh: string }

  const config = {
    headers: {
      Authorization: `Bearer ${cookies.__session}`
    }
  }

  const exception_func = (exception) => ({ data: `{"error": "${exception}"}` })

  const { data: me } = await api.get('/me', config).catch(exception_func) as { data: Usuario }

  return {
    props: {
      me,
    }
  }
}
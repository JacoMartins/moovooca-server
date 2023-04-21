import { useRouter } from "next/router"
import { Bus, CircleNotch, MagnifyingGlass } from "phosphor-react"
import { useEffect, useState } from "react"
import Table from "../../../../components/Table"
import TableRow from "../../../../components/TableRow"
import { api } from "../../../../services/api"
import { Usuario } from "../../../../types/api/usuario"
import { viagem } from "../../../../types/api/viagem"
import { AdminSubMain } from "../../../../styles/pages/admin"
import EditableData from "../../../../components/EditableData"
import { viagemOrder } from "../../../../utils/order"

export default function AdminViagens() {
  const router = useRouter()

  const [busy, setBusy] = useState(false)
  const [searchInput, setSearchInput] = useState<string>('')
  const [viagens, setViagens] = useState<Usuario[]>([])

  function goTo(route: string) {
    event.preventDefault()
    router.push(route)
  }

  function handleSearch() {
    event.preventDefault()
    goTo(`/search?query=${searchInput}`)
    setBusy(true)
  }

  useEffect(() => {
    const fetch = async () => {
      await api.get('/viagens').then(res => setViagens(res.data))
    }

    fetch()
  }, [])

  return (
    <AdminSubMain>
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
        <Table header={Object.keys(viagemOrder).filter(key => key !== 'linha' && key !== 'sentido' && key !== 'reservas')}>
          {viagens.map(viagem => (
            <EditableData data={viagem} order={viagemOrder} />
          ))}
        </Table>
      </section>
    </AdminSubMain>
  )
}
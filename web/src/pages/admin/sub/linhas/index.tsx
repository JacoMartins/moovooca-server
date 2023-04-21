import { useRouter } from "next/router"
import { Bus, CircleNotch, MagnifyingGlass } from "phosphor-react"
import { useEffect, useState } from "react"
import Table from "../../../../components/Table"
import TableRow from "../../../../components/TableRow"
import { api } from "../../../../services/api"
import { linha } from "../../../../types/api/linha"
import EditableData from "../../../../components/EditableData"
import { AdminSubMain } from "../../../../styles/pages/admin"
import { linhaOrder } from "../../../../utils/order"

export default function AdminLinhas() {
  const router = useRouter()

  const [linhas, setLinhas] = useState<linha[]>([])
  const [busy, setBusy] = useState(false)
  const [searchInput, setSearchInput] = useState<string>('')

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
      await api.get('/linhas').then(res => setLinhas(res.data))
    }

    fetch()
  }, [])

  const organizedLinha = Object.assign(linhaOrder, linhas[0])

  return (
    <AdminSubMain>
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
        <Table header={Object.keys(linhaOrder).filter(item => item !== 'sentidos')}>
          {linhas.map(linha => (
            <EditableData data={linha} order={linhaOrder} />
          ))}
        </Table>
      </section>
    </AdminSubMain>
  )
}
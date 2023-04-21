import { useRouter } from "next/router"
import { Bus, CircleNotch, MagnifyingGlass } from "phosphor-react"
import { useEffect, useState } from "react"
import Table from "../../../../components/Table"
import TableRow from "../../../../components/TableRow"
import { api } from "../../../../services/api"
import { Usuario } from "../../../../types/api/usuario"
import { AdminSubMain } from "../../../../styles/pages/admin"
import EditableData from "../../../../components/EditableData"
import { usuarioOrder } from "../../../../utils/order"

export default function AdminUsuarios() {
  const router = useRouter()

  const [busy, setBusy] = useState(false)
  const [searchInput, setSearchInput] = useState<string>('')
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

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
      await api.get('/usuario').then(res => setUsuarios(res.data))
    }

    fetch()
  }, [])
  
  return (
    <AdminSubMain>
      <h1>Usuários</h1>
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
        <Table header={Object.keys(usuarioOrder)}>
          {usuarios.map(usuarios => (
            <EditableData data={usuarios} order={usuarioOrder} />
          ))}
        </Table>
      </section>
    </AdminSubMain>
  )
}
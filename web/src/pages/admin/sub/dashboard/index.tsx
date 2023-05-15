import { List } from "phosphor-react";
import { AdminSubMain } from "../../../../styles/pages/admin";

export default function AdminDashboard({handleOpenSidebar}) {
  return (
    <AdminSubMain>
      <section className='dataSection'>
        <div className="headerContainer">
          <button onClick={handleOpenSidebar}>
            <List size={24} weight='regular' color="rgba(0, 0, 0, 0.8)" />
          </button>
          <h2>Dashboard</h2>
        </div>
        <br />
        <h3 className='lead'>Seja bem-vindo ao dashboard admin.</h3>
        <p>Clique no botão lista para navegar em outras abas.</p>
      </section>
    </AdminSubMain>
  )
}
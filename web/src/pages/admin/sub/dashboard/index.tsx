import { List } from "phosphor-react";
import { AdminSubMain } from "../../../../styles/pages/admin";
import { AdminSubProps } from "../../../../types/pages/AdminSub";

export default function AdminDashboard({ item_id, handleSub, handleOpenSidebar, handleCloseSidebar }:AdminSubProps) {
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
        <p>Em desenvolvimento</p>
      </section>
    </AdminSubMain>
  )
}
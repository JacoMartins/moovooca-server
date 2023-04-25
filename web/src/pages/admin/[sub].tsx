import Head from "next/head";
import { BodyContainer, ListButton, Main } from "../../styles/pages/admin";
import { useState } from "react";
import { Logo } from "../../styles/pages/entrar";
import { Bus } from "phosphor-react";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { Usuario } from "../../types/api/usuario";
import { GetServerSidePropsContext } from "next";
import { parseServerSideCookies } from "../../utils/parseServerSideCookies";
import Forbidden from "../forbidden";

import { Info, LineSegments, ListBullets, Path, Users } from "phosphor-react"
import AdminLinhas from "./sub/linhas"
import AdminReservas from "./sub/reservas"
import AdminUsuarios from "./sub/usuarios"
import AdminViagens from "./sub/viagens"
import AdminDashboard from "./sub/dashboard"

export default function Admin({ me }) {
  const router = useRouter()
  const { sub } = router.query
  const [SPAPage, setSPAPage] = useState(sub)

  const pages = [
    {
      name: 'dashboard',
      title: 'Dashboard',
      icon: <Info size={20} weight={SPAPage === 'dashboard' ? 'fill' : 'regular'} color="#2f855a" />,
      Content: AdminDashboard
    },
    {
      name: 'linhas',
      title: 'Linhas',
      icon: <LineSegments size={20} weight={SPAPage === 'linhas' ? 'fill' : 'regular'} color="#2f855a" />,
      Content: AdminLinhas
    },

    {
      name: 'reservas',
      title: 'Reservas',
      icon: <ListBullets size={20} weight={SPAPage === 'reservas' ? 'fill' : 'regular'} color="#2f855a" />,
      Content: AdminReservas
    },

    {
      name: 'viagens',
      title: 'Viagens',
      icon: <Path size={20} weight={SPAPage === 'viagens' ? 'fill' : 'regular'} color="#2f855a" />,
      Content: AdminViagens
    },

    {
      name: 'usuarios',
      title: 'Usuários',
      icon: <Users size={20} weight={SPAPage === 'usuarios' ? 'fill' : 'regular'} color="#2f855a" />,
      Content: AdminUsuarios
    },
  ]

  function goTo(route: string) {
    router.push(route)
  }

  function handleSub(page: string) {
    goTo(`/admin/${page}`)
    setSPAPage(page)
  }

  if (!me || !me.admin) {
    return <Forbidden />
  }

  return (
    <>
      <Head>
        <title>Moovooca - Dashboard Admin</title>
        <meta name='description' content='Linhas de Ônibus dos Campus UFC' />
      </Head>
      <Main>
        <BodyContainer>
          <div className="sidebar">
            <div className="headerContainer">
              <Logo onClick={() => goTo('/')}>
                <Bus size={24} weight="regular" color="#276749" />
                <span>
                  moovooca
                </span>
              </Logo>
              <h4>Administrador</h4>
              <hr></hr>
              <div className="listContainer">

                {pages.map(page => (
                  <ListButton key={page.name} isActive={SPAPage === page.name} onClick={() => handleSub(page.name)}>
                    {page.icon}
                    {page.title}
                  </ListButton>
                ))}
              </div>
            </div>
          </div>

          <div className="content">
            {pages.map(page => (SPAPage === page.name && <page.Content key={page.name + "_content"} />))}
          </div>
        </BodyContainer>
      </Main>
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

  const exception_func = (exception) => ({ data: `null` })
  const { data: me } = await api.get('/me', config).catch(exception_func) as { data: Usuario }

  return {
    props: {
      me,
    }
  }
}
import Head from "next/head";
import { BodyContainer, ListButton, Main, Sidebar } from "../../styles/pages/admin";
import { useEffect, useState } from "react";
import { Logo } from "../../styles/pages/entrar";
import { Bus, Compass, House, MapPin, SignOut, Wrench } from "phosphor-react";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { Usuario } from "../../types/api/usuario";
import { GetServerSidePropsContext } from "next";
import { parseServerSideCookies } from "../../utils/parseServerSideCookies";
import Forbidden from "../forbidden";

import { Info, LineSegments, ListBullets, Path, Users } from "phosphor-react"
import AdminLinhas from "./sub/linhas"
import AdminParadas from "./sub/paradas"
import AdminReservas from "./sub/reservas"
import AdminUsuarios from "./sub/usuarios"
import AdminViagens from "./sub/viagens"
import AdminDashboard from "./sub/dashboard"
import AdminSentidos from "./sub/sentidos";
import ProfileButton from "../../components/ProfileButton";

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { logout, reload } from "../../contexts/AuthContext";

export default function Admin({ me, item_id }) {
  const router = useRouter()
  const { sub } = router.query
  const [SPAPage, setSPAPage] = useState<string>(sub as string)
  const [sidebar, setSidebar] = useState<boolean>(false)

  useEffect(() => {
    setSPAPage(sub as string)
  }, [sub, router.asPath])

  function goTo(route: string) {
    router.push(route)
  }

  function handleOpenSidebar() {
    setSidebar(true)
  }

  function handleCloseSidebar() {
    setSidebar(false)
  }

  function handleSub(page: string) {
    goTo(`/admin/${page}`)
    handleCloseSidebar()
  }

  function handleLogout() {
    logout()
    reload()
  }

  if (!me || !me.admin) {
    return <Forbidden />
  }

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
      name: 'sentidos',
      title: 'Sentidos',
      icon: <Compass size={20} weight={SPAPage === 'sentidos' ? 'fill' : 'regular'} color="#2f855a" />,
      Content: AdminSentidos
    },

    {
      name: 'paradas',
      title: 'Paradas',
      icon: <MapPin size={20} weight={SPAPage === 'paradas' ? 'fill' : 'regular'} color="#2f855a" />,
      Content: AdminParadas
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

  return (
    <>
      <Head>
        <title>Moovooca - Dashboard Admin</title>
        <meta name='description' content='Linhas de Ônibus dos Campus UFC' />
      </Head>
      <Main>
        <BodyContainer>
          <Sidebar open={sidebar}>
            <div className="sidebar">
              <div className="headerContainer">
                <Logo onClick={() => goTo('/')}>
                  <Bus size={24} weight="regular" color="#276749" />
                  <span>
                    moovooca
                  </span>
                </Logo>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild={false} className="DropdownMenuButton">
                    <div className="userContainer">
                      <ProfileButton mainName={me.nome} />

                      <div className="userInfoContainer">
                        <span>{me.nome}</span>
                        <span>Administrador</span>
                      </div>
                    </div>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="DropdownMenuContent" style={{ zIndex: 2 }} sideOffset={5}>
                      <DropdownMenu.Arrow className="DropdownMenuArrow" />

                      <DropdownMenu.Item className="DropdownMenuItem" onClick={() => goTo('/')}>
                        <DropdownMenu.Item className="DropdownMenuItemIndicator" asChild={false}>
                          <House size={14} weight="fill" color="rgba(0, 0, 0, 0.8)" />
                        </DropdownMenu.Item>
                        Voltar ao Início
                      </DropdownMenu.Item>

                      <DropdownMenu.Item className="DropdownMenuItem" onClick={() => goTo('/reservas')}>
                        <DropdownMenu.Item className="DropdownMenuItemIndicator" asChild={false}>
                          <ListBullets size={14} weight="bold" color="rgba(0, 0, 0, 0.8)" />
                        </DropdownMenu.Item>
                        Minhas reservas
                      </DropdownMenu.Item>

                      <DropdownMenu.Separator className="DropdownMenuSeparator" />

                      <DropdownMenu.Item className="DropdownMenuItem" onClick={handleLogout}>
                        <DropdownMenu.Item className="DropdownMenuItemIndicator" asChild={false}>
                          <SignOut size={14} weight="bold" color="rgba(0, 0, 0, 0.8)" />
                        </DropdownMenu.Item>
                        Sair
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>

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

            <div className="sidebarBackground" onClick={handleCloseSidebar} />
          </Sidebar>

          <div className="content">
            {pages.map(page => (SPAPage === page.name && <page.Content key={page.name + "_content"} item_id={item_id} handleSub={handleSub} handleOpenSidebar={handleOpenSidebar} handleCloseSidebar={handleCloseSidebar} />))}
          </div>
        </BodyContainer>
      </Main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = parseServerSideCookies(context.req.headers.cookie) as { __session: string, __session_refresh: string }
  const { id } = context.query

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
      item_id: id ? id : null,
    }
  }
}
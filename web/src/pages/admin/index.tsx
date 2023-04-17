import Head from "next/head";
import { Main, BodyContainer, ListButton } from "../../styles/pages/admin";
import { useEffect, useState } from "react";
import { Logo } from "../../styles/pages/entrar";
import { Bus, CircleNotch, LineSegments, ListBullets, MagnifyingGlass, Path, Users } from "phosphor-react";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { Usuario } from "../../types/api/usuario";
import { linha } from "../../types/api/linha";
import { GetServerSidePropsContext } from "next";
import { parseServerSideCookies } from "../../utils/parseServerSideCookies";
import { reserva } from "../../types/api/reserva";
import Table from "../../components/Table";
import TableRow from "../../components/TableRow";
import Forbidden from "../forbidden";
import { AdminSub } from "./sub/meta";

export default function Admin({ linhas, reservas, me }) {
  const [SPAPage, setSPAPage] = useState('linhas')
  const subMeta = new AdminSub(SPAPage)

  const [pages, setPages] = useState(subMeta.all)

  const router = useRouter()

  function goTo(route: string) {
    router.push(route)
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
                  <ListButton isActive={SPAPage === page.name} onClick={() => setSPAPage(page.name)}>
                    {page.icon}
                    {page.title}
                  </ListButton>
                ))}
              </div>
            </div>
          </div>

          <div className="content">
            {pages.map(page => (SPAPage === page.name && <page.Content />))}
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

  const { data: linhas } = await api.get('/linhas').catch(exception_func) as { data: linha[] }
  const { data: reservas } = await api.get('/reservas', config).catch(exception_func) as { data: reserva[] }
  const { data: me } = await api.get('/me', config).catch(exception_func) as { data: Usuario }


  return {
    props: {
      linhas,
      reservas,
      me,
    }
  }
}
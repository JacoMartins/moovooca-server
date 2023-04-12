import Head from "next/head";
import Header from "../../components/Header";
import { Main, BodyContainer } from "../../styles/pages/admin";

export default function Admin() {
  return (
    <>
      <Head>
        <title>Moovooca - Dashboard Admin</title>
        <meta name='description' content='Linhas de Ônibus dos Campus UFC' />
      </Head>
      <Main>
        <Header />
        <BodyContainer>
          
        </BodyContainer>
      </Main>
    </>
  )
}
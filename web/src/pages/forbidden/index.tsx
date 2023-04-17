import { useRouter } from "next/router";
import { Bus } from "phosphor-react";
import { Logo } from "../../components/Header/styles";
import { ErrorMain } from "../../styles/global";

export default function Forbidden() {
  const router = useRouter()

  function goTo(route: string) {
    router.push(route)
  }
  
  return (
    <ErrorMain>
      <div className='formContainer'>
        <Logo onClick={() => goTo('/')}>
          <Bus size={24} weight="regular" color="#276749" />
          <span>
            moovooca
          </span>
        </Logo>
        <h4>Não autorizado.</h4>
      </div>
    </ErrorMain>
  )
}
import { useRouter } from "next/router";
import { NavButton, NavContainer } from "./styles";
import { House, LineSegments, ListBullets, MagnifyingGlass, SignOut, Wrench } from 'phosphor-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { NavProps } from "../../types/components/nav";
import { useContext, useState } from "react";
import ProfileButton from "../ProfileButton";
import { LabelText } from "../Header/styles";
import { AuthContext, logout, reload } from "../../contexts/AuthContext";

export default function Nav({ isNavOpen }: NavProps) {
  const router = useRouter();
  const page = router.pathname.split("/")[1];
  const { autenticado, usuario } = useContext(AuthContext);

  const profileImage = 'https://st2.depositphotos.com/5682790/10456/v/600/depositphotos_104564156-stock-illustration-male-user-icon.jpg';

  function goTo(route: string) {
    router.push(route);
  }

  function handleLogout() {
    logout();
    reload();
  }

  return (
    <NavContainer isNavOpen={isNavOpen}>
      <div className="linkContainer">
        <ul>
          <NavButton active={page === '' && true} onClick={() => goTo('/')}>
            <House size={20} weight={page === '' ? 'fill' : 'regular'} color="#2f855a" />
            <span>Início</span>
          </NavButton>
          <NavButton active={page === 'linhas' && true} onClick={() => goTo('/linhas')}>
            <LineSegments size={20} weight={page === 'linhas' ? 'fill' : 'regular'} color="#2f855a" />
            <span>Linhas</span>
          </NavButton>
          <NavButton active={page === 'search' && true} onClick={() => goTo('/search?query=')}>
            <MagnifyingGlass size={20} weight={page === 'search' ? 'fill' : 'regular'} color="#2f855a" />
            <span>Buscar</span>
          </NavButton>
        </ul>
      </div>

      <div className="authContainer">
        {autenticado ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild={false} className="DropdownMenuButton">
              <ProfileButton main_name={'noname'} picture_profile={profileImage} />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                <DropdownMenu.Label className="DropdownMenuLabel" style={{ paddingLeft: '0.5rem' }}>
                  <LabelText>
                    {usuario.nome} {usuario.sobrenome}
                  </LabelText>
                </DropdownMenu.Label>
                <DropdownMenu.Arrow className="DropdownMenuArrow" />

                {
                  autenticado && usuario.admin && <DropdownMenu.Item className="DropdownMenuItem" onClick={() => goTo('/admin/dashboard')}>
                    <DropdownMenu.Item className="DropdownMenuItemIndicator" asChild={false}>
                      <Wrench size={14} weight="bold" color="rgba(0, 0, 0, 0.8)" />
                    </DropdownMenu.Item>
                    Gerenciar
                  </DropdownMenu.Item>
                }

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
        ) : (
          <>
            <NavButton onClick={() => goTo('/criar')} isSignUp={false}>Criar conta</NavButton>
            <NavButton onClick={() => goTo('/entrar')} isSignUp={true}>Entrar</NavButton>
          </>
        )}
      </div>
    </NavContainer>
  )
}
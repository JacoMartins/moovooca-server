import { LineSegments, ListBullets, Path, Users } from "phosphor-react"
import { AdminLinhas } from "./linhas"
import { AdminReservas } from "./reservas"
import { AdminUsuarios } from "./usuarios"
import { AdminViagens } from "./viagens"

export class AdminSub {
  pages = []

  constructor(SPAPage: string) {
    this.pages = [
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
  }

  get all() {
    return this.pages
  }
}
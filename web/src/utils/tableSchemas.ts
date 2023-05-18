import { linha_co } from "../types/api/linha"
import { parada_co } from "../types/api/parada"
import { reserva_co } from "../types/api/reserva"
import { sentido_co } from "../types/api/sentido"
import { usuario_co } from "../types/api/usuario"
import { viagem_co } from "../types/api/viagem"

export const linhaSchema:linha_co = {
  name: 'linha',
  fields: {
    id: null,
    cod: 0,
    nome: '',
    campus: '',
    valor_inteira: 0,
    valor_meia: 0,
    tipo: '',
    tags: '',
    capacidade_assento: 0,
    criado_em: new Date().toUTCString(),
    atualizado_em: ''
  }
}

export const sentidoSchema:sentido_co = {
  name: 'sentido',
  fields: {
    id: null,
    id_linha: null,
    sentido: '',
    ponto_partida: '',
    ponto_destino: '',
    horario_inicio: '',
    horario_fim: '',
    criado_em: new Date().toUTCString(),
    atualizado_em: ''
  }
}

export const paradaSchema:parada_co = {
  name: 'parada',
  fields: {
    id: null,
    id_linha: 0,
    id_sentido: 0,
    parada: '',
    latitude: 0,
    longitude: 0,
    criado_em: '',
    atualizado_em: '',
  }
}

export const reservaSchema:reserva_co = {
  name: 'reserva',
  fields: {
    id: null,
    id_viagem: null,
    id_usuario: null,
    cod: 0,
    forma_pagamento: '',
    criado_em: '',
    atualizado_em: '',
  }
}

export const usuarioSchema:usuario_co = {
  name: 'usuario',
  fields: {
    id: null,
    nome_usuario: '',
    nome: '',
    senha: '',
    sobrenome: '',
    email: '',
    motorista: 0,
    admin: 0,
    criado_em: new Date().toUTCString(),
    atualizado_em: '',
  }
}

export const viagemSchema:viagem_co = {
  name: 'viagem',
  fields: {
    id: null,
    id_linha: null,
    id_sentido: null,
    id_motorista: null,
    data: '',
    origem: '',
    destino: '',
    horario_partida: '',
    horario_chegada: '',
    duracao_media: 0,
    pago_inteira: 0,
    pago_meia: 0,
    gratuidade: 0,
    assentos_disponiveis: 0,
    criado_em: new Date().toUTCString(),
    atualizado_em: '',
  }
}
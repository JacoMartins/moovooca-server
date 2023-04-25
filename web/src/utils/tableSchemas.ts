export const linhaSchema = {
  name: 'linha',
  fields: {
    id: null,
    cod: null,
    nome: null,
    campus: null,
    valor_inteira: null,
    valor_meia: null,
    tipo: null,
    capacidade_assento: null,
    criado_em: null,
    atualizado_em: null
  }
}

export const reservaSchema = {
  name: 'reserva',
  fields: {
    id: null,
    id_viagem: null,
    id_usuario: null,
    cod: null,
    forma_pagamento: null,
    criado_em: null,
    atualizado_em: null,
  }
}

export const usuarioSchema = {
  name: 'usuario',
  fields: {
    id: null,
    nome_usuario: null,
    nome: null,
    sobrenome: null,
    email: null,
    motorista: null,
    admin: null,
    criado_em: null,
    atualizado_em: null,
  }
}

export const viagemSchema = {
  name: 'viagem',
  fields: {
    id: null,
    id_linha: null,
    id_sentido: null,
    id_motorista: null,
    data: null,
    origem: null,
    destino: null,
    horario_partida: null,
    horario_chegada: null,
    duracao_media: null,
    pago_inteira: null,
    pago_meia: null,
    gratuidade: null,
    assentos_disponiveis: null,
    criado_em: null,
    atualizado_em: null,
  }
}
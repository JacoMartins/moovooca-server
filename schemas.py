from marshmallow import fields, Schema


class PlainUsuarioSchema(Schema):
  id = fields.Int(dump_only=True)
  nome_usuario = fields.Str(required=True)
  nome = fields.Str(required=True)
  sobrenome = fields.Str(required=True)
  senha = fields.Str(load_only=True)
  email = fields.Str(required=True)
  tipo= fields.Int()
  admin= fields.Boolean()
  criado_em = fields.DateTime()
  atualizado_em = fields.DateTime()


class PlainReservaSchema(Schema):
  id = fields.Int(dump_only=True)
  id_viagem = fields.Int(required=True)
  id_usuario = fields.Int(required=True)
  cod = fields.Int(required=True)
  forma_pagamento = fields.Str(required=True)
  criado_em = fields.DateTime()
  atualizado_em = fields.DateTime()


class AuthSchema(Schema):
  identificador = fields.Str(required=True)
  senha = fields.Str(required=True)


class ClienteSchema(Schema):
  id = fields.Int(dump_only=True)
  nome_usuario = fields.Str(dump_only=True)
  nome = fields.Str(dump_only=True)
  sobrenome = fields.Str(dump_only=True)
  email = fields.Str(dump_only=True)
  admin = fields.Boolean(dump_only=True)
  tipo = fields.Int(dump_only=True)


class PlainSentidoSchema(Schema):
  id = fields.Int()
  id_linha = fields.Int(required=True)
  sentido = fields.Str(required=True)
  ponto_partida = fields.Str(required=True)
  ponto_destino = fields.Str(required=True)
  horario_inicio = fields.Str(required=True)
  horario_fim = fields.Str(required=True)
  criado_em = fields.DateTime()
  atualizado_em = fields.DateTime()


class LinhaSchema(Schema):
  id = fields.Int()
  cod = fields.Str(required=True)
  nome = fields.Str(required=True)
  campus = fields.Str(required=True)
  valor_inteira = fields.Float(required=True)
  valor_meia = fields.Float(required=True)
  tipo = fields.Str(required=True)
  capacidade_assento = fields.Int(required=True)
  tags = fields.Str()
  criado_em = fields.DateTime()
  atualizado_em = fields.DateTime()

  sentidos = fields.List(fields.Nested(PlainSentidoSchema(), dump_only=True))


class PlainViagemSchema(Schema):
  id = fields.Int(dump_only=True)
  id_linha = fields.Int(required=True)
  id_sentido = fields.Int(required=True)
  id_usuario = fields.Int()
  data = fields.DateTime(required=True)
  origem = fields.Str(required=True)
  destino = fields.Str(required=True)
  duracao_media = fields.Int(required=True)
  horario_partida = fields.Str(required=True)
  horario_chegada = fields.Str(required=True)
  pago_inteira = fields.Int(required=True)
  pago_meia = fields.Int(required=True)
  gratuidade = fields.Int(required=True)
  assentos_disponiveis = fields.Int(required=True)
  criado_em = fields.DateTime()
  atualizado_em = fields.DateTime()

  linha = fields.Nested(LinhaSchema(), dump_only=True)


class UsuarioSchema(Schema):
  id = fields.Int()
  nome_usuario = fields.Str(required=True)
  nome = fields.Str()
  sobrenome = fields.Str()
  senha = fields.Str(load_only=True)
  email = fields.Str()
  tipo = fields.Int()
  admin = fields.Boolean()
  criado_em = fields.DateTime()
  atualizado_em = fields.DateTime()

  reservas = fields.List(fields.Nested(PlainReservaSchema(), dump_only=True))
  viagens = fields.List(fields.Nested(PlainViagemSchema(), dump_only=True))


class PlainParadaSchema(Schema):
  id = fields.Int()
  id_linha = fields.Int(required=True)
  id_sentido = fields.Int(required=True)
  parada = fields.Str(required=True)
  latitude = fields.Str(required=True)
  longitude = fields.Str(required=True)
  criado_em = fields.DateTime()
  atualizado_em = fields.DateTime()


class PlainLinhaSchema(Schema):
  id = fields.Int()
  cod = fields.Str(required=True)
  nome = fields.Str(required=True)
  campus = fields.Str(required=True)
  valor_inteira = fields.Float(required=True)
  valor_meia = fields.Float(required=True)
  tipo = fields.Str(required=True)
  capacidade_assento = fields.Int(required=True)
  tags = fields.Str()
  criado_em = fields.DateTime()
  atualizado_em = fields.DateTime()


class SentidoSchema(Schema):
  id = fields.Int()
  id_linha = fields.Int(required=True)
  sentido = fields.Str(required=True)
  ponto_partida = fields.Str(required=True)
  ponto_destino = fields.Str(required=True)
  horario_inicio = fields.Str(required=True)
  horario_fim = fields.Str(required=True)
  criado_em = fields.DateTime()
  atualizado_em = fields.DateTime()

  paradas = fields.List(fields.Nested(PlainParadaSchema(), dump_only=True))


class ParadaSchema(Schema):
  id = fields.Int()
  id_linha = fields.Int(required=True)
  id_sentido = fields.Int(required=True)
  parada = fields.Str(required=True)
  latitude = fields.Str(required=True)
  longitude = fields.Str(required=True)
  criado_em = fields.DateTime()
  atualizado_em = fields.DateTime()


class ViagemSchema(Schema):
  id = fields.Int()
  id_linha = fields.Int(required=True)
  id_sentido = fields.Int(required=True)
  id_usuario = fields.Int()
  data = fields.DateTime(required=True)
  origem = fields.Str(required=True)
  destino = fields.Str(required=True)
  horario_partida = fields.DateTime(required=True)
  horario_chegada = fields.DateTime(required=True)
  duracao_media = fields.Int(required=True)
  pago_inteira = fields.Int(required=True)
  pago_meia = fields.Int(required=True)
  gratuidade = fields.Int(required=True)
  assentos_disponiveis = fields.Int(required=True)
  criado_em = fields.DateTime()
  atualizado_em = fields.DateTime()

  linha = fields.Nested(PlainLinhaSchema(), dump_only=True)
  sentido = fields.Nested(PlainSentidoSchema(), dump_only=True)
  reservas = fields.List(fields.Nested(PlainReservaSchema(), dump_only=True))


class ReservaSchema(Schema):
  id = fields.Int()
  id_viagem = fields.Int(required=True)
  id_usuario = fields.Int()
  cod = fields.Int()
  forma_pagamento = fields.Str(required=True)
  criado_em = fields.DateTime()
  atualizado_em = fields.DateTime()

  viagem = fields.Nested(PlainViagemSchema(), dump_only=True)
  usuario = fields.Nested(PlainUsuarioSchema(), dump_only=True)


class LinhaPaginationSchema(Schema):
  items = fields.List(fields.Nested(LinhaSchema(), dump_only=True))
  page = fields.Str(required=True)
  pages = fields.Str(required=True)


class SentidoPaginationSchema(Schema):
  items = fields.List(fields.Nested(SentidoSchema(), dump_only=True))
  page = fields.Str(required=True)
  pages = fields.Str(required=True)


class ParadaPaginationSchema(Schema):
  items = fields.List(fields.Nested(ParadaSchema(), dump_only=True))
  page = fields.Str(required=True)
  pages = fields.Str(required=True)


class ReservaPaginationSchema(Schema):
  items = fields.List(fields.Nested(ReservaSchema(), dump_only=True))
  page = fields.Str(required=True)
  pages = fields.Str(required=True)


class UsuarioPaginationSchema(Schema):
  items = fields.List(fields.Nested(UsuarioSchema(), dump_only=True))
  page = fields.Str(required=True)
  pages = fields.Str(required=True)


class ViagemPaginationSchema(Schema):
  items = fields.List(fields.Nested(ViagemSchema(), dump_only=True))
  page = fields.Str(required=True)
  pages = fields.Str(required=True)
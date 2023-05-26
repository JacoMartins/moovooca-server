from flask import request as req
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from sqlalchemy.exc import SQLAlchemyError

from datetime import datetime, timezone, timezone
from random import randint

from db import db
from models import ReservaModel, ViagemModel
from schemas import ReservaSchema, ReservaPaginationSchema


blp = Blueprint("Reservas", __name__, description="Operações com reservas.")


@blp.route('/reservas')
class ReservaList(MethodView):
  @jwt_required()
  @blp.response(200, ReservaPaginationSchema)
  def get(self):
    usuario_id = get_jwt_identity()
    usuario_admin = get_jwt()['admin']

    usuario = req.args.get('usuario', type=int)
    viagem = req.args.get('viagem', type=int)
    
    page = req.args.get('page', type=int)
    per_page = req.args.get('limit', type=int)

    reservas = ReservaModel.query

    if usuario_admin:
      if usuario:
        reservas = reservas.filter(ReservaModel.id_usuario == usuario_id)
      
      if viagem:
        reservas = reservas.filter(ReservaModel.id_viagem == viagem)
    else:
      reservas = reservas.filter(ReservaModel.id_usuario == usuario_id).order_by(ReservaModel.criado_em.desc())
    
    if page:
      reservas = reservas.paginate(page=page, per_page=per_page, error_out=False)

      pagination_object = {
        "items": reservas.items,
        "page": reservas.page,
        "pages": reservas.pages
      }

      return pagination_object
    
    return {
      "items": reservas,
      "page": 1,
      "pages": 1
    }

@blp.route('/reserva')
class Reserva(MethodView):
  @jwt_required()
  @blp.response(200, ReservaSchema)
  def get(self):
    reserva_id = req.args.get('id')
    reserva = ReservaModel.query.get_or_404(reserva_id)

    return reserva
  
  @jwt_required()
  @blp.arguments(ReservaSchema)
  @blp.response(201, ReservaSchema)
  def post(self, reserva_data):
    usuario_id = get_jwt_identity()
    reserva_data["id_usuario"] = usuario_id
    reserva = ReservaModel(**reserva_data)

    reserva.cod = randint(0, 2048)

    viagem = ViagemModel.query.get_or_404(reserva_data['id_viagem'])
    reserva_exists = ReservaModel.query.filter(ReservaModel.id_usuario == usuario_id, ReservaModel.id_viagem == reserva_data['id_viagem']).all()

    if len(reserva_exists) >= 3:
      abort(403, "Impossible to make new booking: Max of 3 bookings per user.")

    if viagem.assentos_disponiveis > 0:
      viagem.assentos_disponiveis -= 1
    else:
      abort(403, "Impossible to make new booking: There's no seat left.")

    try:
      db.session.add(reserva)
      db.session.add(viagem)
      db.session.commit()
    except SQLAlchemyError:
      abort(500, "An error ocurred while inserting item to table 'reserva'.")

    return reserva
  
  @jwt_required()
  @blp.arguments(ReservaSchema)
  @blp.response(200, ReservaSchema)
  def put(self, reserva_data):
    usuario_id = get_jwt_identity()
    usuario_admin = get_jwt()['admin']

    reserva_id = req.args.get('id')
    reserva = ReservaModel.query.get(reserva_id)

    if usuario_admin:
      if reserva:
        reserva.id_viagem = reserva_data["id_viagem"]
        reserva.id_usuario = reserva_data["id_usuario"]
        reserva.cod = reserva_data["cod"]
        reserva.forma_pagamento = reserva_data["forma_pagamento"]
        reserva.atualizado_em = datetime.now(tz=timezone.utc)

        try:
          db.session.add(reserva)
          db.session.commit()
        except SQLAlchemyError:
          abort(500, "An error ocurred while updating item from table 'reserva'.")
        
        return reserva
      else:
        reserva = ReservaModel(id=reserva_id, **reserva_data)

        try:
          db.session.add(reserva)
          db.session.commit()
        except SQLAlchemyError:
          abort(500, "An error ocurred while updating item from table 'reserva'.")
        
        return reserva
    else:
      if reserva.id_usuario == usuario_id:
        if reserva:
          reserva.id_viagem = reserva_data["id_viagem"]
          reserva.id_usuario = usuario_id
          reserva.cod = reserva_data["cod"]
          reserva.forma_pagamento = reserva_data["forma_pagamento"]
          reserva.atualizado_em = datetime.now(tz=timezone.utc)

          try:
            db.session.add(reserva)
            db.session.commit()
          except SQLAlchemyError:
            abort(500, "An error ocurred while updating item from table 'reserva'.")
          
          return reserva
        else:
          reserva = ReservaModel(id=reserva_id, **reserva_data)

          try:
            db.session.add(reserva)
            db.session.commit()
          except SQLAlchemyError:
            abort(500, "An error ocurred while updating item from table 'reserva'.")
          
          return reserva
        
    abort(401, "Identitification error.")

  @jwt_required()
  @blp.response(204)
  def delete(self):
    usuario_id = get_jwt_identity()

    reserva_id = req.args.get('id')
    reserva = ReservaModel.query.get_or_404(reserva_id)

    if reserva.id_usuario == usuario_id:
      if reserva:
        try:
          db.session.delete(reserva)
          db.session.commit()
        except SQLAlchemyError:
          abort(500, "An error ocurred while deleting item from table 'reserva'.")
      else:
        abort(404, "Item not found.")

      return {"message": "Reserva excluida."}
    abort(401, "Identification error.")
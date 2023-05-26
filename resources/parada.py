from flask import request as req
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt

from sqlalchemy.exc import SQLAlchemyError

from datetime import datetime, timezone

from db import db
from models import ParadaModel
from schemas import ParadaSchema, ParadaPaginationSchema


blp = Blueprint("Paradas", __name__, description="Operações com paradas.")


@blp.route('/paradas')
class ParadaList(MethodView):
  @blp.response(200, ParadaPaginationSchema)
  def get(self):
    linha_id = req.args.get('linha')
    sentido_id = req.args.get('sentido')

    page = req.args.get('page', type=int)
    per_page = req.args.get('limit', type=int)

    paradas = ParadaModel.query

    if linha_id :
      paradas = paradas.filter(ParadaModel.id_linha == linha_id)

    if sentido_id:
      paradas = paradas.filter(ParadaModel.id_sentido == sentido_id)

    if page:
      paradas = paradas.paginate(page=page, per_page=per_page, error_out=False)

      return {
        "items": paradas.items,
        "page": paradas.page,
        "pages": paradas.pages
      }
    
    return {
      "items": paradas,
      "page": 1,
      "pages": 1
    }


@blp.route('/parada')
class Parada(MethodView):
  @blp.response(200, ParadaSchema)
  def get(self):
    parada_id = req.args.get('id')
    parada = ParadaModel.query.get_or_404(parada_id)

    return parada
  
  @jwt_required()
  @blp.arguments(ParadaSchema)
  @blp.response(201, ParadaSchema)
  def post(self, parada_data):
    usuario_admin = get_jwt()["admin"]
    
    if usuario_admin:
      parada = ParadaModel(**parada_data)

      try:
        db.session.add(parada)
        db.session.commit()
      except SQLAlchemyError:
        abort(500, "An error ocurred while inserting item to table 'parada'.")

      return parada
    abort(401, "Unauthorized access.")

  @jwt_required()
  @blp.arguments(ParadaSchema)
  @blp.response(200, ParadaSchema)
  def put(self, parada_data):
    usuario_admin = get_jwt()["admin"]

    if usuario_admin:
      parada_id = req.args.get('id')
      parada = ParadaModel.query.get(parada_id)

      if parada:
        parada.id_linha = parada_data["id_linha"]
        parada.id_sentido = parada_data["id_sentido"]
        parada.parada = parada_data["parada"]
        parada.atualizado_em = datetime.now()
      else:
        parada = ParadaModel(id=parada_id, **parada_data)

      try:
        db.session.add(parada)
        db.session.commit()
      except SQLAlchemyError:
        abort(500, "An error ocurred while updating item to table 'parada'.")

      return parada
    abort(401, "Unauthorized access.")
  
  @jwt_required()
  @blp.response(204)
  def delete(self):
    usuario_admin = get_jwt()["admin"]

    if usuario_admin:
      parada_id = req.args.get('id')
      parada = ParadaModel.query.get(parada_id)

      if parada:
        try:
          db.session.delete(parada)
          db.session.commit()
        except SQLAlchemyError:
          abort(500, "An error ocurred while deleting item from table 'parada'.")
      else:
        abort(404, "Item not found in table 'parada'.")

      return {"message": "Item deleted from table 'parada'."}
    abort(401, "Unauthorized access.")
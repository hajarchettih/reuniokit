from flask import Blueprint, session, request, redirect, make_response
import json
import pandas as pd

from models.postgre_database import Dataclass

routes_referentiel = Blueprint('routes_referentiel', __name__)

@routes_referentiel.route("/filtres", methods=['GET'])
def get_filtres_values():
    objectifs_valeurs = Dataclass.select_distinct_data("fiche", "objectif")
    objectifs_valeurs = {"Objectifs": objectifs_valeurs}
    resp = make_response(objectifs_valeurs)
    return resp
from flask import Blueprint, session, request, redirect, make_response, send_file
from flask_cors import cross_origin
import json
import pandas as pd

from models.postgre_database import Dataclass
from models.proposition_fiches_algo import proposition_fiche

routes_fiches = Blueprint('routes_fiches', __name__)

'''
Les fonctions suivantes doivent renvoyer uniquement des données
au format json
NB: make_response convertit les données en format json automatiquement
'''

@routes_fiches.route("/fiches", methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type','access-control-allow-origin'])
def get_all_fiches():
    fiches = Dataclass.select_data("fiche")

    resp = make_response(fiches)
    return resp

@routes_fiches.route("/fiche/<string:id_fiche>", methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type','access-control-allow-origin'])
def get_specific_fiche(id_fiche):
    fiche = Dataclass.select_single_data("fiche", id_fiche)

    resp = make_response(fiche)
    return resp

@routes_fiches.route("/fiche/pdf/<string:id_fiche>", methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type','access-control-allow-origin'])
def get_pdf_specific_fiche(id_fiche):
    return send_file('models/Crazy Jobs.pdf', as_attachment=True)


@routes_fiches.route("/fiches/proposition", methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type','access-control-allow-origin'])
def fiches_proposition():
    # Récupérer les variables de notre requête
    data_arg = request.args
    
    # Remise en format dict
    data_to_send = {}
    for elem in data_arg:
        data_to_send[elem] = data_arg.get(elem)

    # Le nombre de participant est obligatoires
    if data_to_send['nb_participant'] == '':
        erreur = {"erreur": "Veuillez renseigner un nombre de participant"}
        resp = make_response(erreur)
        return resp

    # Formattage des variables
    if data_to_send['duree_reunion'] != '':
        data_to_send['duree_reunion']= int(data_to_send['duree_reunion'])
    data_to_send['nb_participant']= int(data_to_send['nb_participant'])

    data_to_send['type_objectifs']= json.loads(data_to_send['type_objectifs'])
    data_to_send['type_reunion']= data_to_send['type_reunion'].replace("é", "e")

    # Générer une proposition
    proposition = proposition_fiche(data_to_send)

    resp = make_response(proposition)
    return resp

"""
Cette route permet d'obtenir les objectifs possibles d'une réunion
en fonction de la typologie de la réunion
"""
@routes_fiches.route("/objectifs/<string:typologie_reunion>", methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type','access-control-allow-origin'])
def get_objectifs(typologie_reunion):
    # Formatage des données
    typologie_reunion = typologie_reunion.replace("é", "e")
    fiches_reunion = pd.DataFrame(Dataclass.select_data_condition("fiche", {f"typologie_{typologie_reunion.lower()}":"<> ''"}))
    # Convertir en numérique les valeurs pour les trier
    fiches_reunion['objectif_ordre'] = pd.to_numeric(fiches_reunion['objectif_ordre'])
    fiches_reunion = fiches_reunion.sort_values(by=['objectif_ordre'])

    # Créer une liste qui contient les objectifs possibles
    objectifs = [objectif for objectif in list(fiches_reunion["objectif"].unique()) if objectif != '']
    objectifs_brise_glace = [objectif_brise_glace for objectif_brise_glace in list(fiches_reunion["objectif_brise_glace"].unique()) if objectif_brise_glace != '']

    # Structure des données envoyées
    data_to_send = {"objectifs": [], "objectifs_brise_glace": []}
    data_to_send["objectifs"] = objectifs
    data_to_send["objectifs_brise_glace"] = objectifs_brise_glace

    resp = make_response(data_to_send)
    return resp


# Modifier une donnée dans une table specifique
@routes_fiches.route('/update/<string:table>/<string:id_data>', methods=['POST'])      
def update_single_data_from_table(table, id_data):
    return {"data": 0}

# Supprimer une donnée dans une table specifique
@routes_fiches.route('/delete/<string:table>/<string:id_data>', methods=['POST'])      
def delete_single_data_from_table(table, id_data):
    return {"data": 0}

# Ajouter plusieurs données dans une table specifique
@routes_fiches.route('/add/<string:table>', methods=['POST'])      
def add_data_from_table(table):
    return {"data": 0}

# Ajouter une donnée dans une table specifique
@routes_fiches.route('/delete/<string:table>/<string:id_data>', methods=['POST'])      
def add_single_data_from_table(table, id_data):
    return {"data": 0}


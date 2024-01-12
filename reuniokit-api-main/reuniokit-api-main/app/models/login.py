""" TOUTE LA PARTIE LOGIN A REVOIR """
from flask import Blueprint, session, request, render_template, redirect, url_for
from models.postgre_database import Dataclass
import secrets
login_routes = Blueprint('login_routes', __name__)
def session_user(identifiant, direction):
    session['identifiant'] = [secrets.token_hex(16), identifiant, direction]

def session_logout(identifiant):
    session.pop('identifiant')

#connexion
@login_routes.route('/connexion', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        identifiant = request.form.get('identifiant')
        motdepasse = request.form.get('mdp')
        if Dataclass.verification('Login', identifiant, motdepasse):
            direction = Dataclass.select_data_direction('Login', identifiant)[0][0]
            session_user(identifiant, direction)
            return {"valide": "validation à définir"}
        else:
            return {"erreur": "erreur à définir"}
    return {"erreur": "erreur à définir"}

#page création et suppression de compte
@login_routes.route('/account/create', methods=['POST'])
def create_account():
    return "A DEFINIR"

@login_routes.route('/account/delete', methods=['POST'])
def delete_account():
    return "A DEFINIR"

@login_routes.route('/account/info/<string:id>', methods=['POST'])
def get_account_info(id):
    return "A DEFINIR"


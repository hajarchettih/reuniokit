from flask import Flask, render_template, session, request, make_response
from flask_cors import CORS, cross_origin
from waitress import serve
import secrets
from models.login import login_routes
from models.routes_fiches import routes_fiches
from models.routes_referentiel import routes_referentiel

app = Flask(__name__)

#app.register_blueprint(login_routes)
app.register_blueprint(routes_fiches, url_prefix='/v1')
app.register_blueprint(routes_referentiel, url_prefix='/v1')

CORS(app, resources={r"/*": {"origins": "*"}})
app.secret_key= 'Mzhghfvhgg32P'
app.config['PERMANENT_SESSION_LIFETIME']= 1600
 
@app.route("/", methods=['GET'])
def home():
    resp = make_response({"response":"API de l'application Réuniokit ! V1.0"})
    return resp

@app.route("/send_data", methods=['PUT'])
def send_data():
    if request.method == 'PUT':
        data = request.get_json()
        print(data)
        print({"ip": request.remote_addr})
        resp = make_response({"response":"Successful"}, 200)
        
        return resp
    else:
        resp = make_response({"response":"Unable to realise such action"}, 404)

    


@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Service'] = 'DSCI'
    return response

mode = "dev"

if __name__ == '__main__':
    if mode == "dev":
        app.run(host='0.0.0.0', port=5050, debug=True)
    else:
        serve(app, host='0.0.0.0', port=5050, threads=10)


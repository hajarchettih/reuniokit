# Porte d'entrée pour la base de données avec psycopg2.
# Les fonctions sont assez générales, il faut spécifier la table et les colonnes.
# Des fonctions personnalisées sont disponibles pour les cas exceptionnels.
# 3 classes : Database pour la connexion, Controle pour la vérification des données, Dataclass pour les fonctions CRUD.
import psycopg2
from psycopg2.extras import DictCursor
from models.db_config import *

class Database:
        def con():
            conn = psycopg2.connect(
                host=host,
                database=database,
                user=user,
                password=password,
                port=port)
            cursor = conn.cursor(cursor_factory=DictCursor)  
            return conn, cursor
        
        def commit(conn):
            conn.commit()
            
        def close(conn, cursor):
            cursor.close()
            conn.close()

class controle:
    def type_data(data, type):
            ok = isinstance(data,type)
            return ok

    def float_data(data):
        if controle.type_data(data, int):
            float_data = float(data)
            return float_data
        else:
            return False

    def float_round_data(data):
        return round(data, 2)
    
    def nombre_caractere(data, limit):
        if len(data)> limit:
            return False
        else:
            return True

    def valeur_borne(data, limit_basse=None, limit_haute=None):
        if limit_basse is not None and data <= limit_basse:
            return False
        if limit_haute is not None and data >= limit_haute:
            return False
        return True
    
    def mot_espace(mot):
        mot = mot.strip()
        return mot

class Dataclass: 
    """ GESTION DES TABLES """
    def delete_table(table):
        conn, cursor =  Database.con()
        query = f"DROP TABLE IF EXISTS {table}"
        cursor.execute(query)
        Database.commit(conn)
        Database.close(conn, cursor)

    def create_table(table, columns):
        conn, cursor =  Database.con()
        query = f"CREATE TABLE IF NOT EXISTS {table} ({columns[0]} SERIAL PRIMARY KEY, "
        for col in columns[1:]:
            query += f"{col} TEXT,"
        query = query[:-1] + ")"
        cursor.execute(query)
        Database.commit(conn)
        Database.close(conn, cursor)
        
    """ REQUETE SUR LES TABLES """
    def query_builder(table, columns_to_select, conditions, order_by = None):
        if table is None or table=="":
            return {"erreur": "Table inconnue"}

        if type(columns_to_select) != (str or list): 
            return {"erreur": "Le format des colonnes n'est pas valide. Le format attendu est str ou list"}
        
        if type(conditions)!=dict and conditions != None:
            return {"erreur": "Le format des conditions n'est pas valide. Le format attendu est un dictionnaire de type {Colonne:Valeur}"}
        
        # Ajout des colonnes à sélectionner
        if type(columns_to_select)==list:
            query = "SELECT " + ", ".join(columns_to_select)
        else:
            query= "SELECT " + columns_to_select

        # Ajout de la table
        query = query + " FROM " + table

        # Ajout des conditions
        if conditions != None:
            query = f"SELECT "

        return query

    def execute_selectdata_query(query):
        conn, curseur = Database.con()
        curseur.execute(query)
        Database.commit(conn)
        columns = [desc.name for desc in cursor.description] 
        data = [dict(zip(columns, row)) for row in cursor.fetchall()]
        Database.close(conn, curseur)
        return data



    """ Sélectionner des données """
    def select_data(table):
        conn, cursor = Database.con()        
        query = f"SELECT * FROM {table}"
        cursor.execute(query)
        columns = [desc.name for desc in cursor.description] 
        data = [dict(zip(columns, row)) for row in cursor.fetchall()]
        Database.close(conn, cursor)
        return data

    def select_single_data(table, data_id):
        conn, cursor = Database.con()        
        query = f"SELECT * FROM {table} WHERE {table_id[table]} = {data_id}"
        cursor.execute(query)
        columns = [desc.name for desc in cursor.description] 
        data = [dict(zip(columns, row)) for row in cursor.fetchall()]
        Database.close(conn, cursor)
        return data

    def select_distinct_data(table, colonne):
        conn, cursor = Database.con()        
        query = f"SELECT DISTINCT({colonne}) FROM {table}"
        cursor.execute(query)
        columns = [desc.name for desc in cursor.description] 
        data = [dict(zip(columns, row)) for row in cursor.fetchall()]
        Database.close(conn, cursor)
        return data

    # conditions doit être un dict qui contient le nom des colonnes en keys et les valeurs en values
    def select_data_condition(table, conditions):
        conn, cursor = Database.con()
        conditions_query = ' AND '.join([f"{key} {conditions[key]}" for key in conditions.keys()])
        query = f"SELECT * FROM {table} WHERE {conditions_query}"
        cursor.execute(query)
        columns = [desc.name for desc in cursor.description]
        data = [dict(zip(columns, row)) for row in cursor.fetchall()]
        Database.close(conn, cursor)
        return data
    
    def select_data_groupby(table, operation, colonne_to_groupby, colonne_operation, conditions):
        conn, cursor = Database.con()
        if conditions == None:
            query = f"SELECT {colonne_to_groupby}, {groupby_operation[operation]}({colonne_operation}) FROM {table} GROUP BY {colonne_to_groupby}"
        else:
            conditions_query = ' AND '.join([f"{key} = {conditions[key]}" for key in conditions.keys()])
            query = f"""SELECT {colonne_to_groupby}, {groupby_operation[operation]}({colonne_operation}) 
                            FROM {table} WHERE {conditions_query} GROUP BY {colonne_to_groupby}"""
        cursor.execute(query)
        columns = [desc.name for desc in cursor.description]
        data = [dict(zip(columns, row)) for row in cursor.fetchall()]
        Database.close(conn, cursor)
        return data

    """ Insérer des données """
    # data doit être un dict qui contient le nom des colonnes en keys et les valeurs en values
    def insert_data(table, data):
        conn, cursor =  Database.con()
        colonnes = ', '.join(data.keys())
        valeurs = ', '.join([f'%({key})s' for key in data.keys()])
        query = f'INSERT INTO {table} ({colonnes}) VALUES ({valeurs})'
        cursor.execute(query, data)
        Database.commit(conn)
        Database.close(conn, cursor)

    """ Mettre à jour des données """
    # updated_data doit être un dict qui contient le nom des colonnes en keys et les valeurs en values
    def update_data(table, updated_data, data_id):
        conn, cursor =  Database.con()
        updated_data_query = ', '.join([f"{key} = %({key})s" for key in updated_data.keys()])
        query = f"UPDATE {table} SET {updated_data_query} WHERE {table_id[table]} = {data_id}"
        cursor.execute(query, updated_data)
        Database.commit(conn)
        Database.close(conn, cursor)


    """ Supprimer des données """
    # conditions doit être un dict qui contient le nom des colonnes en keys et les valeurs en values
    def delete_single_data(table, data_id):
        conn, cursor =  Database.con()
        query = f"TRUNCATE FROM {table} WHERE {table_id[table]} = {data_id};"
        cursor.execute(query)
        Database.commit(conn)
        Database.close(conn, cursor)    
    
    def delete_data_condition(table, conditions):
        conn, cursor =  Database.con()
        conditions_query = ' AND '.join([f"{key} = %({conditions[key]}" for key in conditions.keys()])
        query = f'TRUNCATE FROM {table} WHERE {conditions_query}'
        cursor.execute(query)
        Database.commit(conn)
        Database.close(conn, cursor)

    def delete_data_vide(table, colonne):
        conn, cursor =  Database.con()
        query = f"TRUNCATE from {table} WHERE {colonne} IS NULL or {colonne} = '' or {colonne} = 'NaN' or {colonne} = 'nan' ;"
        cursor.execute(query)
        Database.commit(conn)
        Database.close(conn, cursor)

    def delete_data_doublon(table):
        conn, cursor =  Database.con()
        query = f"DELETE FROM {table} WHERE code_action IN (SELECT code_action FROM (SELECT DISTINCT ON (code_action) code_action FROM {table} ORDER BY code_action, ctid) AS subquery WHERE ctid <> (SELECT min(ctid) FROM {table} WHERE {table}.code_action = subquery.code_action));"
        cursor.execute(query)
        Database.commit(conn)
        Database.close(conn, cursor)

    """ Commandes annexes d'informations """
    def colname_data(table):
        conn, cursor =  Database.con()
        query = f"SELECT * FROM {table} LIMIT 0"  
        cursor.execute(query)
        data = [desc[0] for desc in cursor.description]
        Database.close(conn, cursor)
        return data

    def count_col(table, colonne):
        conn, cursor =  Database.con()
        query = f'SELECT COUNT({colonne}) FROM {table} WHERE {colonne} IS NOT NULL'
        cursor.execute(query)
        data = cursor.fetchone()[0] 
        Database.commit(conn)
        Database.close(conn, cursor)
        return data

    def table():
        conn, cursor =  Database.con()
        query = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'"
        cursor.execute(query)
        data = cursor.fetchall()
        Database.close(conn, cursor)
        return data
    


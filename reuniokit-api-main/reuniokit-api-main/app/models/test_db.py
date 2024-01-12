def query_builder(table, columns_to_select, conditions, order_by = None):
        if table is None or table=="":
            return {"erreur": "Table inconnue"}

        if type(columns_to_select) != (str or list): 
            return {"erreur": "Le format des colonnes n'est pas valide. Le format attendu est str ou list"}
        
        if type(conditions)!=dict and conditions != None:
            return {"erreur": "Le format des conditions n'est pas valide. Le format attendu est un dictionnaire de type {Colonne:Valeur}"}
        
        query = ""

        return query

def test_querybuilder_without_table():
    table = None
    columns_to_select = "*"
    conditions = {}
    assert query_builder(table, columns_to_select, conditions, order_by = None) == {"erreur": "Table inconnue"}


def test_querybuilder_without_columns_to_select():
    table = "Login"
    columns_to_select = None
    conditions = {}
    assert query_builder(table, columns_to_select, conditions, order_by = None) == {"erreur": "Le format des colonnes n'est pas valide. Le format attendu est str ou list"}


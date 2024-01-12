from models.postgre_database import Dataclass
import boto3
import chardet
import pandas as pd
import timeit
import os

# Supprimer toutes les tables pour réinitialiser la bdd
def delete_all_tables_initilisation():
    Dataclass.delete_table('login')
    Dataclass.delete_table('fiche')


# Définition et création des tables de la BDD
def create_all_tables_initialisation():
    #Définition des colonnes pour chaque table
    login_colonnes = ["id_login", "identifiant", "mot_de_passe", "direcion", "service"]
    fiche_colonnes = ["id_fiche", "nom_fiche", 
                        "typologie_service", "typologie_information", "typologie_construction", "typologie_decision", 
                        "objectif_ordre", "objectif", "sous_objectif", "objectif_brise_glace",
                        "phase_ordre", "phase", 
                        "critere_duree_min", "critere_duree_max", "critere_duree_par_participant", "critere_participant_min", "critere_participant_max",
                        "faisable_visio", "besoin_materiel", "difficulte", "contexte_detendu"]

            
    # Créer les tables dans la BDD
    Dataclass.create_table("login", login_colonnes)
    Dataclass.create_table("fiche", fiche_colonnes)



#création de login de test - si une table login est necessaire
def creation_login():
    login = {"identifiant": 'test',  "mot_de_passe": "test"}
    login2 = {"identifiant": 'test',  "mot_de_passe": "test"}

    # Générer les identifiants - a retirer pour la production
    Dataclass.insert_data('login', login)
    Dataclass.insert_data('login', login2)



"""
Initialisation des données dans la BDD à partir d'un fichier source.
A adapter en fonction des projets
"""
def ajout_data(df_source):
    fiche_colonnes = ["nom_fiche", 
                        "typologie_service", "typologie_information", "typologie_construction", "typologie_decision", 
                        "objectif_ordre", "objectif", "sous_objectif", "objectif_brise_glace",
                        "phase_ordre", "phase", 
                        "critere_duree_min", "critere_duree_max", "critere_duree_par_participant", "critere_participant_min", "critere_participant_max",
                        "faisable_visio", "besoin_materiel", "difficulte", "contexte_detendu"]

    df_source_clean = df_source.drop(df_source.columns[[0, 1, 22, 23, 24, 25, 26]], axis=1)
    df_source_clean.reset_index(drop=True, inplace=True)
    
    nom_colonnes = list(df_source_clean.keys())

    for i in range(len(df_source_clean)):
        row_to_insert = {}
        for num_colonne in range(len(fiche_colonnes)):
            row_to_insert[fiche_colonnes[num_colonne]] = str(df_source_clean.loc[i, nom_colonnes[num_colonne]])
        Dataclass.insert_data('fiche', row_to_insert)
        print(f"Ligne {i+1} inseree")
    return 0



if __name__ == "__main__":
    """ 
        Generation a partir du fichier Excel des fichiers CSV correspondant à chaque feuille du fichier EXCEL
        Cette étape permet de gérer les problèmes d'encoding
    """
    FILE_PATH = "/home/onyxia/work/reuniokit/Réunio'Kit - base de données.xlsx"
    with open(FILE_PATH, mode="rb") as file_in:
        df_reuniokit_source = pd.read_excel(file_in, sheet_name=None, keep_default_na=False)

    onglets = df_reuniokit_source.keys()
    for onglet in onglets:
        df_reuniokit_source[onglet].to_csv(f"reuniokit_{onglet}.csv",sep=",", encoding='cp1252')

    data_source = pd.read_csv(f"reuniokit_{list(onglets)[0]}.csv", encoding="latin1", skiprows=1, keep_default_na=False).reset_index(drop=True)
    print(data_source.head())

    #Lancement de toutes les méthodes
    delete_all_tables_initilisation()
    create_all_tables_initialisation()
    ajout_data(data_source)
    creation_login()
    #log_delete_data()

    print(Dataclass.select_data('login'))
    print(Dataclass.select_data('fiche'))

    for onglet in onglets:
        os.remove(f"reuniokit_{onglet}.csv")

from models.postgre_database import Dataclass
import pandas as pd
import itertools
import json

# Il ne peut y avoir qu'une typologie de réunion
def get_data_filtre_typologie_reunion(typologie_reunion):
    df = pd.DataFrame(Dataclass.select_data_condition("fiche", {f"typologie_{typologie_reunion.lower()}":"<> ''"}))
    return df

def split_fiche_par_objectif(df, type_objectifs, objectif_brise_glace):
    all_df = []

    print(objectif_brise_glace == 'Stimuler la créativité')
    for objectif in type_objectifs:
        if objectif == "Briser la glace":
            print(f"""objectif_brise_glace \n {objectif_brise_glace}""")
            df_tmp = df[(df["objectif"]==objectif)]
            print(f"""df_tmp \n {df_tmp}""")
            df_tmp = df_tmp[(df_tmp["objectif_brise_glace"]==objectif_brise_glace)]
            all_df.append(df_tmp.reset_index())
        else:
            all_df.append(df[df["objectif"]==objectif].reset_index())

    return all_df

def generer_combinaisons_fiches(multiple_df):
    list_index = [df.index.values.tolist() for df in multiple_df]
    combinaisons = [list(combinaison) for combinaison in list(itertools.product(*list_index))]

    combinaisons_initiales = []
    for combinaison in combinaisons:
        combinaisons_initiales.append({
            "Combinaison" : combinaison,
            "Nom fiches": [],
            "Temps individuel min": [],
            "Temps individuel max": [],
            "Temps cumule" : [],
            "Pertinence temps" : 0,
            "Participants" : [],
            "Pertinence participants" : 0,
            "Pertinence finale" : 0
        })
    return combinaisons_initiales

def get_nom_fiches(multiple_df, combinaison_valeur):
    nom_fiches = []
    for i in range(len(combinaison_valeur)):
        nom_fiches.append(multiple_df[i].loc[combinaison_valeur[i]]["nom_fiche"])
    return nom_fiches

def filtre_contexte_detendu(df_unfiltered, contexte):
    if contexte == "Détendu":
        return df_unfiltered
    elif contexte == '':
        return df_unfiltered[df_unfiltered["contexte_detendu"] == "Non"]

def filtre_modalite(df_unfiltered, modalite_reunion):
    if modalite_reunion == "Présentiel":
        return df_unfiltered
    elif modalite_reunion == "Mixte":
        return df_unfiltered[df_unfiltered["faisable_visio"] == "Oui"]

def get_temps_individuel(multiple_df, combinaison_valeur, nb_objectifs):
    temps_individuel_min = []
    temps_individuel_max = []
    # Calcul du temps cumule de chaque combinaison
    for i in range(nb_objectifs):
        temps_individuel_min.append(int(multiple_df[i].loc[combinaison_valeur[i]]["critere_duree_min"]))
        temps_individuel_max.append(int(multiple_df[i].loc[combinaison_valeur[i]]["critere_duree_max"]))

    return temps_individuel_min, temps_individuel_max

def classement_critere_temps(temps_individuel_min, temps_individuel_max, temps):
    duree_cumulee_min = sum(temps_individuel_min)
    duree_cumulee_max = sum(temps_individuel_max)

    if temps == '':
        return [duree_cumulee_min, duree_cumulee_max], 0
    else:
        if temps >= duree_cumulee_min and temps <= duree_cumulee_max:
            # Couvrir le plus de temps de la réunion
            # temps de la réunion = Temps max => 1
            # temps de la réunion >  0.9*Temps max => 2
            # temps de la réunion entre (0.8 et 0.9)*Temps max => 3
            if temps == duree_cumulee_max:
                pertinence_temps = 1
            elif temps >= 0.9*duree_cumulee_max:
                pertinence_temps = 2
            elif temps >= 0.65*duree_cumulee_max and temps < 0.9*duree_cumulee_max:
                pertinence_temps = 3
            else:
                pertinence_temps = 10
        else:
            pertinence_temps = 10

    return [duree_cumulee_min, duree_cumulee_max], pertinence_temps

def classement_critere_participant(multiple_df, combinaison_valeur, nb_participant, nb_objectifs):
    nb_max_participants = []
    nb_min_participants = []
    for i in range(nb_objectifs):
        nb_min_participants.append(int(multiple_df[i].loc[combinaison_valeur[i]]["critere_participant_min"]))
        nb_max_participants.append(int(multiple_df[i].loc[combinaison_valeur[i]]["critere_participant_max"]))

    max_participants = min(nb_max_participants)
    min_participants = max(nb_min_participants)
 
    if nb_participant >= min_participants and nb_participant <= max_participants:
        valeur_pertinence_participant = 1
    else:
        valeur_pertinence_participant = 10

    return [min_participants, max_participants], valeur_pertinence_participant

def calcul_pertinence_combinaisons(valeur_pertinence_temps, valeur_pertinence_participants):
    return valeur_pertinence_temps+valeur_pertinence_participants

def get_nom_fiche_autre_possibilite(multiple_df, combinaisons_traitees, objectifs):
    combinaisons_traitees = combinaisons_traitees[:int(len(combinaisons_traitees)/2)]

    autres_possibilites = {}
    for i in range(len(objectifs)):
        autres_possibilites[objectifs[i]] = []
        for combinaison in combinaisons_traitees:
            nom_fiche = multiple_df[i].loc[combinaison["Combinaison"][i]]["nom_fiche"]
            if nom_fiche not in autres_possibilites[objectifs[i]]:
                autres_possibilites[objectifs[i]].append(nom_fiche)

    return autres_possibilites

def proposition_fiche(user_options: dict):
    type_reunion = user_options['type_reunion']
    type_objectifs = user_options['type_objectifs']
    objectif_brise_glace = user_options['objectif_brise_glace']
    duree_reunion = user_options['duree_reunion']
    nb_participant = user_options['nb_participant']
    contexte_detendu = user_options['contexte_detendu']
    modalite_reunion = user_options['modalite_reunion']

    # Récupérer les fiches en lien avec la typologie de la réunion
    df_fiche = get_data_filtre_typologie_reunion(type_reunion)
    #print(f"df_fiche : \n {df_fiche}")


    # Filtrer en fonction du contexte
    df_filtre_contexte = filtre_contexte_detendu(df_fiche, contexte_detendu)
    #print(f"df_filtre_contexte : \n {df_filtre_contexte}")



    # Filtrer en fonction des modalités de la réunion
    df_filtre_modalite = filtre_modalite(df_filtre_contexte, modalite_reunion)
    #print(f"df_filtre_modalite : \n {df_filtre_modalite}")

    # Répartir les fiches par type d'objectifs
    multiple_df_by_objectif = split_fiche_par_objectif(df_filtre_modalite, type_objectifs, objectif_brise_glace)
    print(f"multiple_df_by_objectif : \n {multiple_df_by_objectif}")


    # L'idée est de renseigner les valeurs à chaque étape du dictionnaire
    # Initialisation
    combinaisons = generer_combinaisons_fiches(multiple_df_by_objectif)
    

    for combinaison in combinaisons:
        # Récupérer le nom des fiches
        combinaison["Nom fiches"] = get_nom_fiches(multiple_df=multiple_df_by_objectif, combinaison_valeur=combinaison['Combinaison'])


        # Mise à jour des valeurs de temps
        combinaison['Temps individuel min'], combinaison['Temps individuel max'] = get_temps_individuel(multiple_df=multiple_df_by_objectif, 
                                                                                                    combinaison_valeur=combinaison['Combinaison'], 
                                                                                                    nb_objectifs=len(type_objectifs))
        combinaison['Temps cumule'], combinaison['Pertinence temps'] = classement_critere_temps(combinaison['Temps individuel min'], combinaison['Temps individuel max'], duree_reunion)

        # Mise à jour des valeurs participants
        combinaison["Participants"], combinaison["Pertinence participants"] = classement_critere_participant(multiple_df=multiple_df_by_objectif, 
                                                                                    combinaison_valeur=combinaison['Combinaison'], 
                                                                                    nb_participant=nb_participant, 
                                                                                    nb_objectifs=len(type_objectifs))
        # Calcul valeur finale
        combinaison['Pertinence finale'] = calcul_pertinence_combinaisons(combinaison['Pertinence temps'], combinaison['Pertinence finale'])
    
    # Trier la liste par ordre
    combinaisons_classees_par_ordre = sorted(combinaisons, key=lambda pertinence: pertinence["Pertinence finale"])

    autres_possibilites_par_objectif = get_nom_fiche_autre_possibilite(multiple_df_by_objectif, combinaisons, type_objectifs)

    data_to_send = {"Solution": combinaisons_classees_par_ordre[0], "Autres_possibilites":autres_possibilites_par_objectif}

    return data_to_send


if __name__ == "__main__":

    #type_reunion, type_objectif, duree_reunion, nb_participant = get_user_information()
    # Test URL
    a = """?type_reunion=Service&type_objectifs=["Briser la glace", "Générer des idées", "Résoudre un problème","Faire le bilan"]&duree_reunion=90&nb_participant=13&contexte_detendu=Détendu&modalite_reunion=Présentiel"""
    type_reunion = 'Service'
    type_objectifs = ['Briser la glace', 'Générer des idées', "Résoudre un problème",'Faire le bilan']
    duree_reunion = 90
    nb_participant = 13
    contexte_detendu = 'Détendu'
    modalite_reunion = 'Présentiel'

    fiche = get_data_filtre_typologie_reunion('Service')
    stimuler_creativite = split_fiche_par_objectif(fiche, ['Briser la glace'], 'Stimuler la créativité')
    print(stimuler_creativite)

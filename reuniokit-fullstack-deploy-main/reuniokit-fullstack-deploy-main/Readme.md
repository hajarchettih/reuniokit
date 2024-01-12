# Déploiement fullstack de l'application Réuniokit
### Problème rencontré
Actuellement, il est impossible de déployer en même temps et sur la même url une partie backend et frontend d'une même application.
Cela implique à l'utilisateur de valider les certificats sur la partie frontend et sur la partie backend sinon les requêtes seront toutes bloquées tant que le certificat n'est pas accepté.

### Déploiement
#### 1. Prérequis
Il est nécessaire de déployer les charts utilsé dans chaque pod sur helm  
Pour déployer une application, voir le tutoriel (https://forge.dgfip.finances.rie.gouv.fr/bercyhub/nubonyxia/nubonyxia-python-app-example)
#### 2. Configuration
La configuration concerne principalement 3 éléments: ingress, services et pods  
Dans le fichier values.yaml:  
- __pods__  
Il convient de modifier plus particulièrement les 2 variables suivantes:  
```
  name: nom-du-pod
  image:
    repository: harbor.lab.incubateur.finances.rie.gouv.fr/nom_du_project_harbor/nom_du_chart
    tag: tag de l'image dans harbor
  port: YYYY
```
port: doit être identique au port sur lequel tourne le serveur (Flask, streamlit, node ...). Il s'agit du port d'écoute du pod.
name: permet au service d'identifier sur quel pod rediriger le traffic  

- __services__  
Il convient de modifier plus particulièrement les 2 variables suivantes:  
```
  service:
    name: nom-du-service
    port: XXXX
    targetPort: http # par défaut
```
name: permet à l'ingress de rediriger le traffic vers le bon service
port: port d'écoute du service  
targetPort: il s'agit du port (du pod) vers lequel le service doit lui même rediriger le traffic. Le traffic arrivant sur le port http
du pod est redirigé vers son port d'écoute.

- __ingress__  
Il convient de modifier plus particulièrement la partie hosts:  
```
- host: hostnamepersonnalise.lab.incubateur.finances.rie.gouv.fr
  paths:
  - path: /prefix_path(/|$)(.*) #prefix_path peut être modifié par la valeur souhaitée
      pathType: Prefix
      backend:
      service:
          name: doit être identique au nom défini pour le service
          port:
            number: doit être identique au port défini pour le service
```

Une fois la configuration terminée, la commande suivante permettra de déployer l'application  
```
sh helm_install.sh
```
__Redirection des segments__
Le choix a été fait de ne pas prendre en compte le préfixe du path lorsque la requête est redirigé vers le service.  
Exemple:  
https://monurl.fr/api/fiches -> le serveur api recevra la requête /fiches  
https://monurl.fr/app/pages/Accueil -> le serveur web retournera le contenu de la requête /pages/Accueil  
De cette façon, il n'est pas nécessaire de rajouter une couche dans l'arborescence du frontend ou un segment dans l'API.  

##### Commandes utiles
- Générer le template final sans déployer l'app  
A la racine du projet, là où se trouve votre dossier /chart et fichier values.yaml
```
helm template chart ./chart -f ./values.yaml > my-output.yaml 
```

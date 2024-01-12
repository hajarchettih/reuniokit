'use client' 
// Cette ligne indique que le code suivant est destiné à s'exécuter uniquement dans l'environnement du navigateur (côté client).

import React, { useEffect, useState } from "react"; 
// Importation de React et de deux hooks : useEffect pour les effets secondaires, useState pour gérer l'état du composant.
import './Edition.scss'; 
// Importation du fichier de style pour ce composant.

// Définition d'une interface pour les données renvoyées par l'API.
interface ApiData {
  id_fiche: ApiData | string | null; // Il semble y avoir une erreur ici. `id_fiche` devrait probablement être de type 'number' ou 'string'.
  nom_fiche: string; // Nom de la fiche.
  objectif: string; // Objectif de la fiche.
}

// Définition des props attendues par le composant.
interface EditFicheProps {
  onBack: () => void; // Une fonction de rappel pour gérer l'action "retour".
}

// Déclaration du composant EditFiche, qui prend les props définies dans EditFicheProps.
const EditFiche: React.FC<EditFicheProps> = ({ onBack }) => {
  const [apiData, setApiData] = useState<ApiData | null>(null); 
  // État pour stocker les données de l'API. Initialement nul, sera mis à jour une fois les données chargées.

  useEffect(() => {
    // Hook useEffect pour charger les données lors du montage du composant.
    const urlParams = new URLSearchParams(window.location.search); // Extraction des paramètres de l'URL.
    const ficheId = urlParams.get('fiche'); // Obtention de l'ID de la fiche à partir des paramètres de l'URL.

    if (ficheId) {
      // Si un ID de fiche est présent, effectuer une requête à l'API.
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/fiche/${ficheId}`) // Requête à l'API.
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données de l\'API');
          }
          return response.json();
        })
        .then(data => {
          if (data.length > 0) {
            setApiData(data[0]); // Mise à jour de l'état avec les données de la première fiche.
          } else {
            console.error('Aucune fiche trouvée.');
          }
        })
        .catch(error => {
          console.error(error); // Gestion des erreurs.
        });
    }
  }, []);
  

  const handleDelete = () => {
    // Fonction pour gérer la suppression de la fiche.
    if (apiData && apiData.id_fiche) {
      // Vérification de la présence des données et de l'ID de la fiche.
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete/fiche/${apiData.id_fiche}`, {
        method: 'POST', // Méthode POST pour la suppression.
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression de la fiche');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fiche supprimée avec succès:', data);
        onBack(); // Appel de la fonction onBack après une suppression réussie.
      })
      .catch(error => {
        console.error('Erreur lors de la suppression:', error);
      });
    }
  };

  return (
    // JSX pour le rendu du composant.
    <div className='pageContainer'>
      <div className='cardContainer'>
        {/* Affichage des données de la fiche, si disponibles */}
        {apiData && (
          <>
            <h1>{apiData.nom_fiche}</h1>
            <p>{apiData.objectif}</p>
          </>
        )}

        {/* Boutons pour les actions de l'utilisateur */}
        <div className='actionsContainer'>
          <button onClick={() => console.log('Modifier la fiche')}>Modifier la fiche</button>
          <button onClick={handleDelete}>Supprimer la fiche</button>
          <button onClick={onBack}>Revenir à la sélection</button>
        </div>
      </div>

      <div className='sidePanel'></div>
    </div>
  );
};

export default EditFiche; // Exportation du composant pour une utilisation ailleurs.

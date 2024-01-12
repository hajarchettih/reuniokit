"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

// Définition d'une interface pour les données renvoyées par l'API.
interface ApiData {
  id_fiche: ApiData | string | number; // Il semble y avoir une erreur ici. `id_fiche` devrait probablement être de type 'number' ou 'string'.
  nom_fiche: string; // Nom de la fiche.
  objectif: string; // Objectif de la fiche.
}

// Définition des props attendues par le composant.
interface EditFicheProps {
  onBack: () => void; // Une fonction de rappel pour gérer l'action "retour".
}

export default function Fiche({
  params: { id_fiche },
}: {
  params: { id_fiche: string };
}) {
  const [apiData, setApiData] = useState<ApiData | null>(null);
  // État pour stocker les données de l'API. Initialement nul, sera mis à jour une fois les données chargées.

  useEffect(() => {
    // Hook useEffect pour charger les données lors du montage du composant.
    //const urlParams = new URLSearchParams(window.location.search); // Extraction des paramètres de l'URL.
    //const ficheId = urlParams.get('fiche'); // Obtention de l'ID de la fiche à partir des paramètres de l'URL.

    if (id_fiche) {
      // Si un ID de fiche est présent, effectuer une requête à l'API.
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/fiche/${id_fiche}`) // Requête à l'API.
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Erreur lors de la récupération des données de l'API"
            );
          }
          return response.json();
        })
        .then((data) => {
          if (data.length > 0) {
            setApiData(data[0]); // Mise à jour de l'état avec les données de la première fiche.
          } else {
            console.error("Aucune fiche trouvée.");
          }
        })
        .catch((error) => {
          console.error(error); // Gestion des erreurs.
        });
    }
  }, []);

  function TelechargerFiche(idFiche: string | number, idName: string){
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/fiche/pdf/${idFiche}`,
            {
              method: 'GET',
              headers: {
                "Content-Type": "application/pdf",
                "Access-Control-Allow-Origin": "*",
              }
            }
            )
      .then((response) => {
        return new Response(response.body, {
          headers: {
            ...response.headers, // copy the previous headers
            "content-disposition": `attachment; filename="${idName}"`,
          },
        });})
  }


  return (
    <>
      <div className="pageContainer">
        <div className="cardContainer">
          {/* Affichage des données de la fiche, si disponibles */}
          {apiData && (
            <>
              <h1>{apiData.nom_fiche}</h1>
              <p>{apiData.objectif}</p>
            </>
          )}

          {/* Boutons pour les actions de l'utilisateur */}
          {apiData && (
            <>
              <Link href={`${process.env.NEXT_PUBLIC_API_URL}/fiche/pdf/${apiData.id_fiche}`} target="_blank">
                <button>Télécharger la fiche</button></Link>
            </>
          )}
            
        </div>
        <div className="sidePanel"></div>
      </div>
    </>
  );
}

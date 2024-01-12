"use client";
// Importations nécessaires pour le composant
import React, { useState, useEffect } from "react";
import "./list.scss";
import Link from "next/link";

// Définition d'une interface TypeScript pour structurer les données des fiches.
interface Fiche {
  id_fiche: number;
  nom_fiche: string;
  difficulte: string;
  critere_duree_min: string;
  critere_duree_max: string;
}

// Définition des propriétés attendues par le composant List.
interface ListProps {
  isAdmin: boolean;
}

// Déclaration du composant fonctionnel List, avec gestion des propriétés.
const List: React.FC<ListProps> = ({ isAdmin = false }) => {
  // Utilisation du hook useState pour gérer l'état des fiches.
  const [fiches, setFiches] = useState<Fiche[]>([]);
  const [selectedFiche, setSelectedFiche] = useState<number | null>(null);
  const [isButtonClicked, setIsButtonClicked] = useState<{
    [key: number]: boolean;
  }>({});

  const handleFicheClick = (index: number) => {
    setSelectedFiche(selectedFiche === index ? null : index);
    setIsButtonClicked({ ...isButtonClicked, [index]: false });
  };

  const handleButtonClick = (index: number) => {
    setIsButtonClicked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Utilisation du hook useEffect pour charger les données des fiches.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
           process.env.NEXT_PUBLIC_API_URL + "/fiches",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des fiches");
        }

        const data: Fiche[] = await response.json();
        setFiches(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Rendu du composant
  return (
    <div>
      {fiches.map((fiche, index) => (
        

        <div
          key={fiche.id_fiche}
          className={`List ${selectedFiche === index ? "clicked" : ""}`}
          onClick={() => handleFicheClick(index)}
        >
          <Link href={process.env.NEXT_PUBLIC_DEPLOIEMENT+"/Fiche/"+index}>test</Link>
          <div className="title">
            <div className="icon">
              <div className="icon-number">{index + 1}</div>
            </div>
            <p>{fiche.nom_fiche}</p>
          </div>

          <div className="objectif">
            BRISER LA GLACE
            <span className="obj">|</span>
            Objectif de la fiche
          </div>

          {isAdmin === true ? (
            <div className="button">
              <Link href={`List/?fiche=${index + 1}`}>
                <button>
                  <svg
                    width="27"
                    height="26"
                    viewBox="0 0 27 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.7014 5.91531V5.91672L20.6547 11.8714L6.76091 25.7638H0.807617V19.8091L14.7014 5.91531ZM21.647 0.954236L25.6172 4.9245C26.1651 5.47254 26.1651 6.3609 25.6172 6.90893L22.6392 9.88558L16.6859 3.93229L19.6625 0.954236C20.2106 0.406368 21.0989 0.406368 21.647 0.954236Z"
                      fill="#4D1C6B"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          ) : (
            <div
              onClick={() => handleButtonClick(index)}
              className={`border-box ${
                isButtonClicked[index] ? "clicked" : ""
              }`}
            >
              <div className="minute">{fiche.critere_duree_max} MIN</div>
            </div>
          )}
          
        </div>
      
      ))}
    </div>

  );
};

export default List;

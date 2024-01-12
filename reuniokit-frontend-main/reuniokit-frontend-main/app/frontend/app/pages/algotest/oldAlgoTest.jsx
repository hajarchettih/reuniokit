"use client";

import { useEffect, useState } from "react";

export default function Algo() {
  const [reunion, setReunion] = useState(null);
  const [objectifs, setObjectifs] = useState([]);
  const [objectifBriseGlace, setObjectifsBriseGlace] = useState(null);
  const [objectifsPossibles, setObjectifsPossibles] = useState(null);
  const [participants, setParticipant] = useState(null);
  const [duree, setDuree] = useState(null);
  const [contexte, setContexte] = useState(null);
  const [modalite, setModalite] = useState(null);

  // Gérer les boutons radio
  const [selectedTypeReunion, setSelectedTypeReunion] = useState(null);
  const [selectedObjectifBriseGlace, setSelectedObjectifBriseGlace] = useState(null);
  const [selectedModalite, setSelectedModalite] = useState(null);

  const typo_reunion = ["Service", "Information", "Construction", "Décision"];
  const modalites = ["Présentiel", "Distanciel"];

  const [data, setData] = useState(null);

  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);
  
  const resultatQuestionnaire = (resultat) => {
    console.log(typeof resultat["Solution"]["Combinaison"]);
    return (
      <>
        <h4>Informations générales</h4>
        <table>
          <tr>
            <th>Intitulé</th>
            <th>Valeur</th>
          </tr>
          <tr>
            <td>Nombre de participant</td>
            <td>{participants}</td>
          </tr>
          <tr>
            <td>Contexte</td>
            <td>{contexte == null ? "Pas détendu" : contexte}</td>
          </tr>
          <tr>
            <td>Modalité</td>
            <td>{modalite}</td>
          </tr>
          <tr>
            <td>Durée de la réunion</td>
            <td>{duree == null ? "Non renseignée" : duree}</td>
          </tr>
          <tr>
            <td>Durée estimée</td>
            <td>
              entre {resultat["Solution"]["Temps cumule"][0]} et{" "}
              {resultat["Solution"]["Temps cumule"][1]} minutes
            </td>
          </tr>
        </table>
        <h4>Déroulé recommandé</h4>
        {resultat["Solution"]["Combinaison"].map((combi, i) => {
          return (
            <>
            <div key={i}>
              {i + 1} -- objectifs : {objectifs[i]} -- fiche préconisée :{" "}
              {resultat["Solution"]["Nom fiches"][i]} -- Temps estimé cumulé:
              entre{" "}
              {resultat["Solution"]["Temps individuel min"]
                .slice(0, i + 1)
                .reduce(
                  (total, currentValue) => (total = total + currentValue),
                  0
                )}{" "}
              et{" "}
              {resultat["Solution"]["Temps individuel max"]
                .slice(0, i + 1)
                .reduce(
                  (total, currentValue) => (total = total + currentValue),
                  0
                )}
            </div>
            </>
          );
        })}
      </>
    );
  };

  function getObjectifs(type_reunion) {
    try {
      fetch(process.env.NEXT_PUBLIC_API_URL + "/objectifs/" + type_reunion, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }, 
      })
        .then((res) => res.json())
        .then((jsonData) => {
          console.log(jsonData);
          console.log(typeof jsonData);
          setObjectifsPossibles(jsonData);
        });
    } catch (error) {
      console.error("Erreur lors de la requête à l'API :", error);
    }
  }

  function getProposition(
    type_reunion,
    type_objectifs,
    duree_reunion,
    nb_participant,
    contexte_detendu,
    modalite_reunion
  ) {
    if (contexte_detendu == null) {
      contexte_detendu = "";
    }
    if (duree_reunion == null) {
      duree_reunion = "";
    }
    const query =
      "/fiches/proposition?" +
      "type_reunion=" +
      type_reunion +
      "&type_objectifs=" +
      JSON.stringify(type_objectifs) +
      "&objectif_brise_glace=" +
      objectifBriseGlace +
      "&duree_reunion=" +
      duree_reunion +
      "&nb_participant=" +
      nb_participant +
      "&contexte_detendu=" +
      contexte_detendu +
      "&modalite_reunion=" +
      modalite_reunion;
    console.log(query);
    try {
      fetch(process.env.NEXT_PUBLIC_API_URL + query, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((jsonData) => setData(jsonData));
    } catch (error) {
      console.error("Erreur lors de la requête à l'API :", error);
    }
  }

  return (
    <>
      <h3>Typologie de la réunion</h3>
      <fieldset>
        <legend>Sélectionner le type de réunion:</legend>
        {typo_reunion.map((typo) => (
          <div key={typo}>
            <input
              type="radio"
              id={typo}
              name={typo}
              value={typo}
              checked={selectedTypeReunion === typo}
              onChange={(e) => {
                setReunion(e.target.value);
                setSelectedTypeReunion(e.target.value);
                getObjectifs(e.target.value);
              }}
            />
            <label htmlFor={typo}>{typo}</label>
          </div>
        ))}
      </fieldset>

      <h3>Objectifs de votre réunion</h3>

      <fieldset>
        <legend>Sélectionner les objectifs de votre réunion:</legend>
        {objectifsPossibles == null ? (
          <div>Veuillez renseigner un type de réunion</div>
        ) : (
          objectifsPossibles["objectifs"].map((objectif) => (
            <>
              <div key={objectif}>
                <input
                  type="checkbox"
                  id={objectif}
                  name={objectif}
                  onChange={(e) => {
                    const selectedValue = e.target.name;
                    setObjectifs((prevObjectifs) => {
                      if (prevObjectifs.includes(selectedValue)) {
                        // Si la valeur existe déjà, la retirer
                        return prevObjectifs.filter(
                          (value) => value !== selectedValue
                        );
                      } else {
                        // Sinon, l'ajouter
                        return [...prevObjectifs, selectedValue];
                      }
                    });
                  }}
                />
                <label htmlFor={objectif}>{objectif}</label>
              </div>
              {objectif === "Briser la glace" ? (
                <>
                  <fieldset>
                  {objectifsPossibles["objectifs_brise_glace"].map(
                    (objectif_brise_glace) => (
                          <div key={objectif_brise_glace}>
                            <input
                              type="radio"
                              id={objectif_brise_glace}
                              name={objectif_brise_glace}
                              value={objectif_brise_glace}
                              checked={selectedObjectifBriseGlace === objectif_brise_glace}
                              onChange={(e) => {
                                setSelectedObjectifBriseGlace(e.target.value);
                                setObjectifsBriseGlace(e.target.value);
                              }}
                            />
                            <label htmlFor={objectif_brise_glace}>{objectif_brise_glace}</label>
                          </div>
                    )
                  )}
                  </fieldset>
                </>
              ) : null}
            </>
          ))
        )}
      </fieldset>
      <h3>Temps de la réunion (en minutes) - Optionnel</h3>
      <input
        type="number"
        id="temps_reunion"
        name="temps_reunion"
        onChange={(e) => {
          setDuree(e.target.value);
        }}
      />
      <h3>Nombre de participants</h3>
      <input
        type="number"
        id="nb_participant"
        name="nb_participant"
        onChange={(e) => {
          setParticipant(e.target.value);
        }}
      />
      <h3>Modalité de la réunion</h3>
      <fieldset>
        <legend>Sélectionner la modalité de votre réunion:</legend>
        {modalites.map((uneModalite) => (
          <div key={uneModalite}>
            <input
              type="radio"
              id={uneModalite}
              name={uneModalite}
              value={uneModalite}
              checked={selectedModalite === uneModalite}
              onChange={(e) => {
                setModalite(e.target.id);
                setSelectedModalite(e.target.value);
              }}
            />
            <label htmlFor={uneModalite}>{uneModalite}</label>
          </div>
        ))}
      </fieldset>
      <h3>Contexte de la réunion</h3>
      <fieldset>
        <legend>Sélectionner le contexte de votre réunion:</legend>
        <input
          type="checkbox"
          id="Détendu"
          name="Détendu"
          onChange={(e) => {
            contexte == null ? setContexte("Détendu") : setContexte(null);
          }}
        />
        <label>Détendu</label>
      </fieldset>
      <input
        type="submit"
        onClick={() =>
          getProposition(
            reunion,
            objectifs,
            duree,
            participants,
            contexte,
            modalite
          )
        }
        value="Générer une proposition"
      />
      <input
        type="submit"
        onClick={() => window.location.reload(false)}
        value="Réinitialiser"
      />
      {data ? resultatQuestionnaire(data) : null}
      <h3>Mises à jour apportées :</h3>
      <div>V0 - base de la page</div>
      <div>
        V0.1 - Ajout de la possibilité de ne pas renseigner le temps de la
        réunion + le contexte de la réunion -- fait
      </div>
      <div>
        V0.2 - Liste des objectifs en fonction de la typologie de la réunion --
        fait
      </div>
      <div>
        V0.3 - Boutons radio unchecked quand on en sélectionne un autre -- fait
      </div>
      <div>V0.35 - Objectifs dans l'ordre -- fait</div>
      <div>V0.4 - Ajout sous objectif 'Briser la glace' -- fait</div>
    </>
  );
}

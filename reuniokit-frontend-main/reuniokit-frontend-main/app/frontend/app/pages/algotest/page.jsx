"use client";

import { useEffect, useState } from "react";
import Step1 from '../../(components)/(Algo)/StepOne/StepOne';
import Step2 from '../../(components)/(Algo)/StepTwo/StepTwo';
import Step3 from '../../(components)/(Algo)/StepThree/StepThree';
import Step4 from '../../(components)/(Algo)/StepFour/StepFour';
import Step5 from '../../(components)/(Algo)/StepFive/StepFive';
import Step6 from '../../(components)/(Algo)/StepSix/StepSix';

export default function Algo() {
  const [step, setStep] = useState(1);

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

//Gestion des erreurs
const [error, setError] = useState(null);



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
        setError(null); // Réinitialiser l'erreur en cas de succès
    } catch (error) {
      console.error("Erreur lors de la requête à l'API :", error);
      setError("Pas de fiche disponible avec les critères sélectionnés");
    }
  }

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            selectedTypeReunion={selectedTypeReunion}
            setSelectedTypeReunion={setSelectedTypeReunion}
            setReunion={setReunion}
            getObjectifs={getObjectifs}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Step2
            objectifsPossibles={objectifsPossibles}
            setObjectifs={setObjectifs}
            selectedObjectifBriseGlace={selectedObjectifBriseGlace}
            setSelectedObjectifBriseGlace={setSelectedObjectifBriseGlace}
            setObjectifsBriseGlace={setObjectifsBriseGlace}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <Step3
            duree={duree}
            setDuree={setDuree}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 4:
        return (
          <Step4
            participants={participants}
            setParticipant={setParticipant}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 5:
        return (
          <Step5
          modalite={modalite}
          setModalite={setModalite}
          contexte={contexte}
          setContexte={setContexte}
          prevStep={prevStep}
          setStep={setStep}
          getProposition={getProposition}
          reunion={reunion}
          objectifs={objectifs}
          duree={duree}
          participants={participants}
          />
        );
      case 6:
        return (
          <Step6
          data={data}
          error={error}
          participants={participants}
          contexte={contexte}
          modalite={modalite}
          duree={duree}
        />
        );
      default:
        return null;
    }
  };

  return (
    <>
     <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          text-decoration:none;
        }
      `}</style>
      {renderStep()}
    </>
  );
}

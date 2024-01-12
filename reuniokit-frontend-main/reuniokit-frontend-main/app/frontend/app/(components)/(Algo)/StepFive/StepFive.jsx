'use client'
import React from 'react';
import styles from './StepFive.module.scss'
import Button from '../../Button/Button';
import Link from 'next/link';

// Importation des images (vérifiez les chemins)
const home__icon = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/home__icon.svg';
const faq__icon = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/faq__icon.svg';
const womenGroup__img = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/Group(4).svg';
const levelBarCompleted__img = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/levelbar__completed.svg';
const levelBarNot__img = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/levelbar__not.svg';

const StepFive = ({ modalite, setModalite, contexte, setContexte, prevStep, setStep, getProposition, reunion, objectifs, duree, participants }) => {
  const modalites = ["Présentiel", "Distanciel"];

  const handleGenerateProposition = () => {
    getProposition(reunion, objectifs, duree, participants, contexte, modalite);
    setStep(6);
  };

  const handleContextChange = (isChecked) => {
    setContexte(isChecked ? "Détendu" : "Pas détendu");
  };

  return (
    <div className={styles['globalContainer']}>
      <div className={styles['header']}>
        <div className={styles['header__logo']}>
          <img src={process.env.NEXT_PUBLIC_ASSETS +"/algo/img/reuniokit__logo.svg"} alt="Réunio'kit" />
          <img src={process.env.NEXT_PUBLIC_ASSETS +"/algo/img/bercylab__logo.svg"} alt="BercyLab" />
        </div>
        <div className={styles['header__button']}>
          <Link href={`${process.env.NEXT_PUBLIC_DEPLOIEMENT}/pages/Home`}>
            <Button icon={home__icon} className={styles['buttonHome']} buttonType='primary' ></Button>
          </Link>
          <Button icon={faq__icon} text='J’ai besoin d’aide' className={styles['buttonFaq']} buttonType='primary'></Button>
        </div>
      </div>
      <main>
        <h1>Choisissons ensemble l’activité idéale pour votre réunion</h1>

        <div className={styles['main__container']}>
          <div className={styles['main__container__image']}>
            <img src={womenGroup__img} alt="groupe de femme" />
          </div>
          <div className={styles['main__container__option']}>
            <p>Étape 5 sur 5</p>
            <h3>Modalités de la réunion</h3>
            <div className={styles['levelBar']}>
              <img src={levelBarCompleted__img} alt="" />
              <img src={levelBarCompleted__img} alt="" />
              <img src={levelBarCompleted__img} alt="" />
              <img src={levelBarCompleted__img} alt="" />
              <img src={levelBarCompleted__img} alt="" />
            </div>
            <p>Étape suivante : Objectifs de votre réunion</p>

            <h3>Modalité de la réunion</h3>
            <fieldset>
              <legend>Sélectionner la modalité de votre réunion:</legend>
              {modalites.map((uneModalite) => (
                <div key={uneModalite}>
                  <input
                    type="radio"
                    id={uneModalite}
                    name="modalite_reunion"
                    value={uneModalite}
                    checked={modalite === uneModalite}
                    onChange={(e) => setModalite(e.target.value)}
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
                checked={contexte === "Détendu"}
                onChange={(e) => handleContextChange(e.target.checked)}
              />
              <label htmlFor="Détendu">Détendu</label>
            </fieldset>

            <div className={styles['buttonContainer']}>
              <Button className={styles['buttonBack']} text="Précédent" onClick={prevStep} buttonType='primary'></Button>
              <Button className={styles['buttonNext']} text='Valider et continuer' onClick={handleGenerateProposition} buttonType='primary'></Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StepFive;

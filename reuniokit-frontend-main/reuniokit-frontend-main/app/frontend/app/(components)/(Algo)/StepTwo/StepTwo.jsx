'use client'
import React from 'react';
import Link from 'next/link';
import Button from '../../Button/Button';
import styles from './StepTwo.module.scss';

const home__icon = process.env.NEXT_PUBLIC_ASSETS +'/algo/img/home__icon.svg'
const faq__icon = process.env.NEXT_PUBLIC_ASSETS +'/algo/img/faq__icon.svg'
const womenGroup__img = process.env.NEXT_PUBLIC_ASSETS +'/algo/img/womengroup__img.svg'
const robot__img = process.env.NEXT_PUBLIC_ASSETS +'/algo/img/robot__img.svg'
const levelBarCompleted__img = process.env.NEXT_PUBLIC_ASSETS +'/algo/img/levelbar__completed.svg'
const levelBarNot__img = process.env.NEXT_PUBLIC_ASSETS +'/algo/img/levelbar__not.svg'

const Step2 = ({
  objectifsPossibles,
  setObjectifs,
  selectedObjectifBriseGlace,
  setSelectedObjectifBriseGlace,
  setObjectifsBriseGlace,
  prevStep,
  nextStep
}) => {
  return (
    <>
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
              <img src={robot__img} alt="robot" />
            </div>
            <div className={styles['main__container__option']}>
              <p>Étape 2 sur 5</p>
              <h3>Objectifs de votre réunion</h3>
              <div className={styles['levelBar']}>
                <img src={process.env.NEXT_PUBLIC_ASSETS +"/algo/img/levelbar__completed.svg"} alt="" />
                <img src={process.env.NEXT_PUBLIC_ASSETS +"/algo/img/levelbar__completed.svg"} alt="" />
                <img src={process.env.NEXT_PUBLIC_ASSETS +"/algo/img/levelbar__not.svg"} alt="" />
                <img src={process.env.NEXT_PUBLIC_ASSETS +"/algo/img/levelbar__not.svg"} alt="" />
                <img src={process.env.NEXT_PUBLIC_ASSETS +"/algo/img/levelbar__not.svg"} alt="" />
              </div>
              <p>Étape suivante : Objectifs de votre réunion</p>
              <fieldset>
                <legend>Sélectionner les objectifs de votre réunion:</legend>
                {objectifsPossibles == null ? (
                  <div>Veuillez renseigner un type de réunion</div>
                ) : (
                  objectifsPossibles["objectifs"].map((objectif) => (
                    <div key={objectif}>
                      <input
                        type="checkbox"
                        id={objectif}
                        name={objectif}
                        onChange={(e) => {
                          const selectedValue = e.target.name;
                          setObjectifs((prevObjectifs) => {
                            if (prevObjectifs.includes(selectedValue)) {
                              return prevObjectifs.filter((value) => value !== selectedValue);
                            } else {
                              return [...prevObjectifs, selectedValue];
                            }
                          });
                        }}
                      />
                      <label htmlFor={objectif}>{objectif}</label>

                      {objectif === "Briser la glace" && (
                        <fieldset>
                          {objectifsPossibles["objectifs_brise_glace"].map((objectif_brise_glace) => (
                            <div key={objectif_brise_glace}>
                              <input
                                type="radio"
                                id={objectif_brise_glace}
                                name="objectif_brise_glace"
                                value={objectif_brise_glace}
                                checked={selectedObjectifBriseGlace === objectif_brise_glace}
                                onChange={(e) => {
                                  setSelectedObjectifBriseGlace(e.target.value);
                                  setObjectifsBriseGlace(e.target.value);
                                }}
                              />
                              <label htmlFor={objectif_brise_glace}>{objectif_brise_glace}</label>
                            </div>
                          ))}
                        </fieldset>
                      )}
                    </div>
                  ))
                )}
              </fieldset>
              <div className={styles['buttonContainer']}>
                <Button className={styles['buttonBack']} text="Précédent" onClick={prevStep} buttonType='primary'></Button>
                <Button className={styles['buttonNext']} text='Valider et continuer' onClick={nextStep} buttonType='primary'></Button>
              </div>
            </div>

          </div>
        </main>

      </div>
    </>
  );
};

export default Step2;

'use client'
import React from 'react';
import styles from './StepOne.module.scss'
import Button from '../../Button/Button';
import Link from 'next/link';
import { gsap } from 'gsap';

const home__icon = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/home__icon.svg'
const faq__icon = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/faq__icon.svg'
const womenGroup__img = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/womengroup__img.svg'
const levelBarCompleted__img = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/levelbar__completed.svg'
const levelBarNot__img = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/levelbar__not.svg'

const Step1 = ({ selectedTypeReunion, setSelectedTypeReunion, setReunion, getObjectifs, nextStep }) => {
  const typo_reunion = ["Service", "Information", "Construction", "Décision"];

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
              <img src={womenGroup__img} alt="groupe de femme" />
            </div>
            <div className={styles['main__container__option']}>
              <p>Étape 1 sur 5</p>
              <h3>Typologie de la réunion</h3>
              <div className={styles['levelBar']}>
                <img src={process.env.NEXT_PUBLIC_ASSETS +"/algo/img/levelbar__completed.svg"} alt="" />
                <img src={process.env.NEXT_PUBLIC_ASSETS +"/algo/img/levelbar__not.svg"} alt="" />
                <img src={process.env.NEXT_PUBLIC_ASSETS +"/algo/img/levelbar__not.svg"} alt="" />
                <img src={process.env.NEXT_PUBLIC_ASSETS +"/algo/img/levelbar__not.svg"} alt="" />
                <img src={process.env.NEXT_PUBLIC_ASSETS +"/algo/img/levelbar__not.svg"} alt="" />
              </div>
              <p>Étape suivante : Objectifs de votre réunion</p>
              <fieldset>
                <legend>Sélectionner le type de réunion:</legend>
                <div className={styles['radio-group']}>
                  {typo_reunion.map((typo) => (
                    <div key={typo} className={styles['radio-item']}>
                      <input
                        type="radio"
                        id={typo}
                        name="typo_reunion"
                        value={typo}
                        checked={selectedTypeReunion === typo}
                        onChange={(e) => {
                          setSelectedTypeReunion(e.target.value);
                          setReunion(e.target.value);
                          getObjectifs(e.target.value);
                        }}
                      />
                      <label htmlFor={typo}>{typo}</label>
                    </div>
                  ))}
                </div>

              </fieldset>
              <div className={styles['buttonContainer']}>
                <Link href={`${process.env.NEXT_PUBLIC_DEPLOIEMENT}/pages/Home`}>
                  <Button className={styles['buttonBack']} text="Revenir à l'accueil" buttonType='primary'></Button>
                </Link>
                <Button className={styles['buttonNext']} text='Valider et continuer' onClick={nextStep} buttonType='primary'></Button>
              </div>
            </div>
          </div>
        </main>

      </div>

    </>
  );
};

export default Step1;
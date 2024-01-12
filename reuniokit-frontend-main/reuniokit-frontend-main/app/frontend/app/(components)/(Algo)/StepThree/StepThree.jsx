'use client'
import React from 'react';
import Link from 'next/link';
import Button from '../../Button/Button';
import styles from './StepThree.module.scss';

const home__icon = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/home__icon.svg'
const faq__icon = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/faq__icon.svg'
const menGroup__img = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/mengroup__img.svg'
const robot__img = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/robot__img.svg'
const levelBarCompleted__img = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/levelbar__completed.svg'
const levelBarNot__img = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/levelbar__not.svg'

const Step3 = ({ duree, setDuree, prevStep, nextStep }) => {
  return (
    <>
      <div className={styles['globalContainer']}>
        <div className={styles['header']}>
          <div className={styles['header__logo']}>
            <img src={process.env.NEXT_PUBLIC_ASSETS + "/algo/img/reuniokit__logo.svg"} alt="Réunio'kit" />
            <img src={ process.env.NEXT_PUBLIC_ASSETS +"/algo/img/bercylab__logo.svg"} alt="BercyLab" />
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
              <img src={menGroup__img} alt="groupe de femme" />
            </div>
            <div className={styles['main__container__option']}>
              <p>Étape 3 sur 5</p>
              <h3>Temps de la réunion</h3>
              <div className={styles['levelBar']}>
                <img src={process.env.NEXT_PUBLIC_ASSETS + "/algo/img/levelbar__completed.svg"} alt="" />
                <img src={process.env.NEXT_PUBLIC_ASSETS + "/algo/img/levelbar__completed.svg"} alt="" />
                <img src={process.env.NEXT_PUBLIC_ASSETS + "/algo/img/levelbar__completed.svg"} alt="" />
                <img src={process.env.NEXT_PUBLIC_ASSETS + "/algo/img/levelbar__not.svg"} alt="" />
                <img src={process.env.NEXT_PUBLIC_ASSETS + "/algo/img/levelbar__not.svg"} alt="" />
              </div>
              <p>Étape suivante : Nombre de participants</p>
              <h3>Temps de la réunion (en minutes) - Optionnel</h3>
              <input
                type="number"
                id="temps_reunion"
                name="temps_reunion"
                placeholder="Durée en minutes"
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
              />
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

export default Step3;

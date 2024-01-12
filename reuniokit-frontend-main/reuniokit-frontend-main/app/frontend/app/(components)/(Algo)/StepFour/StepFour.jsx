'use client'
import React from 'react';
import Link from 'next/link';
import Button from '../../Button/Button';
import styles from './StepFour.module.scss';

const home__icon = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/home__icon.svg'
const faq__icon = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/faq__icon.svg'
const menGroup__img = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/Group(3).svg'
const robot__img = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/robot__img.svg'
const levelBarCompleted__img = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/levelbar__completed.svg'
const levelBarNot__img = process.env.NEXT_PUBLIC_ASSETS + '/algo/img/levelbar__not.svg'

const Step4 = ({ participants, setParticipant, prevStep, nextStep }) => {
  return (
    <>
      <div className={styles['globalContainer']}>
        <div className={styles['header']}>
          <div className={styles['header__logo']}>
            <img src={process.env.NEXT_PUBLIC_ASSETS + "/algo/img/reuniokit__logo.svg"} alt="Réunio'kit" />
            <img src={process.env.NEXT_PUBLIC_ASSETS + "/algo/img/bercylab__logo.svg"} alt="BercyLab" />
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
              <p>Étape 4 sur 5</p>
              <h3>Nombre de participants</h3>
              <div className={styles['levelBar']}>
                <img src={process.env.NEXT_PUBLIC_ASSETS + "/algo/img/levelbar__completed.svg"} alt="" />
                <img src={process.env.NEXT_PUBLIC_ASSETS + "/algo/img/levelbar__completed.svg"} alt="" />
                <img src={process.env.NEXT_PUBLIC_ASSETS + "/algo/img/levelbar__completed.svg"} alt="" />
                <img src={process.env.NEXT_PUBLIC_ASSETS + "/algo/img/levelbar__completed.svg"} alt="" />
                <img src={process.env.NEXT_PUBLIC_ASSETS + "/algo/img/levelbar__not.svg"} alt="" />
              </div>
              <h3>Modalité de la réunion</h3>
              <input
                type="number"
                id="nb_participant"
                name="nb_participant"
                placeholder="Nombre de participants"
                value={participants}
                onChange={(e) => setParticipant(e.target.value)}
              />
              <p>4 personnes minimum. Pour plus de 30, contactez BercyLab à bercylab@finances.gouv.fr</p>
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

export default Step4;

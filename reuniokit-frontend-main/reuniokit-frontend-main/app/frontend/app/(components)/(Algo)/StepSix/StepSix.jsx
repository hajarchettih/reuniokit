"use client";
import React from "react";
import Link from "next/link";
import Button from "../../Button/Button";
import styles from "./StepSix.module.scss";

const home__icon = process.env.NEXT_PUBLIC_ASSETS + "/algo/img/home__icon.svg";
const faq__icon = process.env.NEXT_PUBLIC_ASSETS + "/algo/img/faq__icon.svg";
const card__button = process.env.NEXT_PUBLIC_ASSETS + "/algo/img/card__button.svg";


const Step6 = ({ data, participants, contexte, modalite, duree, error }) => {
  /*   if (error) {
    return <div>{error}</div>;
  } */

  const date = new Date();
  const dateNow = date.toISOString().split('T')[0];

  if (!data) {
    return <div>Chargement des résultats...</div>;
  }
  const hasObjectifs = data.objectifs && Array.isArray(data.objectifs);

  return (
    <>
      <div className={styles["globalContainer"]}>
        <div className={styles["header"]}>
          <div className={styles["header__logo"]}>
            <img
              src={
                process.env.NEXT_PUBLIC_ASSETS + "/algo/img/reuniokit__logo.svg"
              }
              alt="Réunio'kit"
            />
            <img
              src={
                process.env.NEXT_PUBLIC_ASSETS + "/algo/img/bercylab__logo.svg"
              }
              alt="BercyLab"
            />
          </div>
          <div className={styles["header__button"]}>
            <Link href={`${process.env.NEXT_PUBLIC_DEPLOIEMENT}/pages/Home`}>
              <Button
                icon={home__icon}
                className={styles["buttonHome"]}
                buttonType="primary"
              ></Button>
            </Link>
            <Button
              icon={faq__icon}
              text="J’ai besoin d’aide"
              className={styles["buttonFaq"]}
              buttonType="primary"
            ></Button>
          </div>
        </div>
        <main>
          <h1>Choisissons ensemble l’activité idéale pour votre réunion</h1>

          <div className={styles["main__container"]}>

            <div className={styles['card-container']}>
              <div className={styles['card-container__top']}>
                <div className={styles['top__data']}>
                  <p className={styles['top__data--title']}>Voici un résumé de vos activités du :</p>
                  <p className={styles['top__data--data']}>"{dateNow}"</p>
                </div>
                <div className={styles['top__participants']}>
                  <p className={styles['top__participants--title']}>Nombre de participants</p>
                  <p className={styles['top__participants--data']}>{participants || "Non spécifié"}</p>
                </div>
                <div className={styles['top__context']}>
                  <p className={styles['top__context--title']}>Contexte</p>
                  <p className={styles['top__context--data']}>{contexte || "Non spécifié"}</p>
                </div>
                <div className={styles['top__modality']}>
                  <p className={styles['top__modality--title']}>Modalité</p>
                  <p className={styles['top__modality--data']}>{modalite || "Non spécifié"}</p>
                </div>
              </div>

              <div className={styles['card-container__main']}>
                {data["Solution"]["Combinaison"].map((combi, i) => (
                  <div className={styles['main__cards']} key={i}>
                    <div className={styles['main__cards--left']}>
                      <div className={styles['left-subcontainer']}>
                        <img src={card__button} alt="" />
                        <p>{data["Solution"]["Nom fiches"][i]}</p>
                      </div>
                      <div className={styles['right-subcontainer']}>
                        <p>OUVERTURE</p>
                        <p>|</p>
                      </div>
                    </div>
                    <div className={styles['main__cards--right']}>
                      <div className={styles['left-subcontainer']}>
                        <p>{hasObjectifs ? `${i + 1}. Objectif : ${data.objectifs[i]}` : "Objectif non spécifié"}</p>
                      </div>
                      <div className={styles['right-subcontainer']}>
                        <p>{`Entre ${data["Solution"]["Temps individuel min"]
                          .slice(0, i + 1)
                          .reduce((total, currentValue) => total + currentValue, 0)
                          } et ${data["Solution"]["Temps individuel max"]
                            .slice(0, i + 1)
                            .reduce((total, currentValue) => total + currentValue, 0)
                          } minutes`}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles['card-container__bottom']}>
                <div className={styles['bottom__total']}>
                  <p>TOTAL : Entre {
                    data["Solution"]["Temps individuel min"].reduce((total, currentValue) => total + currentValue, 0)
                  } et {
                      data["Solution"]["Temps individuel max"].reduce((total, currentValue) => total + currentValue, 0)
                    } minutes</p>
                </div>
                <div className={styles['bottom__sheets']}>
                  <button>Valider la sélection des fiches</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Step6;


'use client'
import Button from '@/app/(components)/Button/Button';
import React from 'react';
import './home.scss';
import Link from 'next/link';

const document__icon = `${process.env.NEXT_PUBLIC_ASSETS}/home/img/file-text.svg`
const calendar__icon = `${process.env.NEXT_PUBLIC_ASSETS}/home/img/calendar-event.svg`
const admin__icon = `${process.env.NEXT_PUBLIC_ASSETS}/home/img/logout-box-r.svg`

export const Home = () => { 
    const isAdmin = false;
  return (
    <div className="home-container">
      <img src='/static/ReunioKit.svg' alt='logo reuniokit' />
      <Link href={`${process.env.NEXT_PUBLIC_DEPLOIEMENT}/pages/List`}>
      <Button icon={document__icon} text={"Je consulte les fiches d'animation de réunion"} buttonType={"primary"} />
      </Link>
      
      <Link href={`${process.env.NEXT_PUBLIC_DEPLOIEMENT}/pages/algotest`}>
        <Button icon={calendar__icon} text={"J'organise une réunion"} buttonType={"secondary"} />
      </Link>
      <Link href={`${process.env.NEXT_PUBLIC_DEPLOIEMENT}/pages/Connexion`}>
  <Button icon={admin__icon} className='button-pink' text={"Espace administrateur"} buttonType={"tertiary"} />
</Link>


      <img className="frame" src='/static/Frame251.svg' alt='groupe de travail' />
      <img src={process.env.NEXT_PUBLIC_ASSETS +"/home/img/bercylab__logo.svg"} alt="reuniokit-frontend/app/frontend/public/app/filtre/img/bercylab__logo.svgercyLab" />
    </div>
  );
};

export default Home;

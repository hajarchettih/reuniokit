'use client'

// Importation des dépendances nécessaires
import React, { useState, useEffect } from 'react'; // Importation de React, useState et useEffect depuis la bibliothèque React
import Link from 'next/link'; // Importation du composant Link de Next.js
import Filtre from '@/app/(components)/Filtre/Filtre'; // Importation d'un composant Filtre personnalisé
import './list.scss'; // Importation des styles CSS spécifiques à ce composant
import HomeIcon from '@/app/(components)/HomeIcon/HomeIcon';
import ReinitFiltre from '@/app/(components)/ReinitFiltre/ReinitFiltre';

// Définition de l'interface pour les fiches
interface Fiche {
  id_fiche: number;
  nom_fiche: string;
  objectif: string;
  difficulte: string;
  critere_duree_min: string;
  critere_duree_max: string;
}

// Définition de l'interface pour les propriétés du composant List
interface ListProps {
  isAdmin: boolean;
}


// Définition du composant fonctionnel List
const List: React.FC<ListProps> = ({ isAdmin = false }) => {
  // Déclaration de plusieurs états pour gérer les données et les interactions
  const [fiches, setFiches] = useState<Fiche[]>([]); // État pour stocker les fiches
  const [selectedFiche, setSelectedFiche] = useState<number | null>(null); // État pour suivre la fiche sélectionnée
  const [isButtonClicked, setIsButtonClicked] = useState<{ [key: number]: boolean }>({}); // État pour suivre les boutons cliqués
  const [searchTerm, setSearchTerm] = useState<string>(''); // État pour le terme de recherche
  const [activeFilter, setActiveFilter] = useState<string | null>(null); // État pour le filtre actif
  const [searchResults, setSearchResults] = useState<Fiche[]>([]); // État pour les résultats de recherche

  // Fonction pour gérer le clic sur une fiche
  const handleFicheClick = (index: number) => {
    setSelectedFiche(selectedFiche === index ? null : index);
  };

  // Fonction pour gérer le clic sur un bouton
  const handleButtonClick = (index: number) => {
    setIsButtonClicked(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  // Utilisation de useEffect pour effectuer une requête au serveur au chargement du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fiches`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des fiches');
        }

        const data: Fiche[] = await response.json();
        setFiches(data);
        setSearchResults(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Appel de la fonction fetchData pour récupérer les fiches
  }, []); // Le tableau vide signifie que cela ne s'exécutera qu'une fois, au montage du composant

  // Utilisation de useEffect pour filtrer les résultats en fonction du terme de recherche et des fiches
  useEffect(() => {
    const filteredResults = fiches.filter(fiche =>
      fiche.nom_fiche.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [searchTerm, fiches]); // Le tableau de dépendances indique que cela doit être réexécuté lorsque searchTerm ou fiches change

  // Fonction pour gérer le changement de terme de recherche
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Fonction pour gérer le changement de filtre
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  // Définition des groupes de filtres
  const filterGroups = [
    {
      label: 'Typologie',
      options: [
        { label: 'Typlogie', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
      ],
    },
    {
      label: 'Objectifs',
      options: [
        { label: 'Option A', value: 'optionA' },
        { label: 'Option B', value: 'optionB' },
      ],
    },
    {
      label: 'Chronologie/Phase',
      options: [
        { label: 'Option A', value: 'optionA' },
        { label: 'Option B', value: 'optionB' },
      ],
    },
    {
      label: 'Difficulté',
      options: [
        { label: 'Option A', value: 'optionA' },
        { label: 'Option B', value: 'optionB' },
      ],
    },
    {
      label: 'Durée',
      options: [
        { label: 'Option A', value: 'optionA' },
        { label: 'Option B', value: 'optionB' },
      ],
    },
    {
      label: 'Modalité',
      options: [
        { label: 'Option A', value: 'optionA' },
        { label: 'Option B', value: 'optionB' },
      ],
    },
  ];

  // Rendu du composant
  return (
    <>
    {/* conteneur principal */}
    <div className="container">
    {/* section gauche avec les logos */}
      <div className="left-section">
        <img className='reuniokit' src={process.env.NEXT_PUBLIC_ASSETS + "/list/img/reuniokit__logo.svg"} alt="reuniokit" />
        <img className='bercylab' src={process.env.NEXT_PUBLIC_ASSETS + "/list/img/bercylab__logo.svg"} alt="reuniokit" />
      </div>
      {/* section du milieu avec le titre */}
      <div className='middle-section'>
        <h1>Fiches d’animation de réunion</h1>
      </div>
      {/* section droite avec les icon */}
      <div className='right-section'>
        <HomeIcon></HomeIcon>
        <ReinitFiltre></ReinitFiltre>
      </div>
    </div>
    {/* conteneur de liste */}
    <div className="list-container">

        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={handleSearchChange} />
          <img className='search' src={process.env.NEXT_PUBLIC_ASSETS + "/filtre/img/search.svg"} alt="rechercher" />
        </div>
        </div>
      
        {/* conteneur de filtres */}
        <div className='filtre-container'>
          Filtres
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8431 3.93701V5.44343H15.0898L11.3238 11.0925V17.4948H6.80454V11.0925L3.03849 5.44343H2.28528V3.93701H15.8431ZM4.8492 5.44343L8.31096 10.6361V15.9884H9.81738V10.6361L13.2791 5.44343H4.84920Z" fill="#4D1C6B" />
          </svg>
          {/* composant pour gérer les filtres */}
          <Filtre filterGroups={filterGroups} onFilterChange={handleFilterChange} />
        </div>
        {/* conteneur des éléments de la liste */}
        <div className="list-items-container"> 
        {/* boucle sur les résultats de la recherche pour afficher chaque élément */}
          {searchResults.map((fiche, index) => (
            <Link key={fiche.id_fiche} href={`${process.env.NEXT_PUBLIC_DEPLOIEMENT}/pages/Fiche/${fiche.id_fiche}`}>
              {/* élément individuel de la liste */}
              <div
                className={`List ${selectedFiche === index ? 'clicked' : ''}`}
                onClick={() => handleFicheClick(index)}
              >
                <div className='title'>
                  <div className='icon'>
                    <div className='icon-number'>{index + 1}</div>
                  </div>
                  <p>{fiche.nom_fiche}</p>
                </div>

                <div className='objectif'>
                  {fiche.objectif}
                  </div>
                  <span className='obj'>|</span>
                <div className='description'>
               
                  Objectif de la fiche
                </div>
                 {/* rendu conditionnel en fonction du rôle de l'utilisateur */}
                {isAdmin ? (
                  <div className="button">
                    <Link href={`List/?fiche=${index + 1}`}>
                      <button>
                        <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M14.7014 5.91531V5.91672L20.6547 11.8714L6.76091 25.7638H0.807617V19.8091L14.7014 5.91531ZM21.647 0.954236L25.6172 4.9245C26.1651 5.47254 26.1651 6.3609 25.6172 6.90893L22.6392 9.88558L16.6859 3.93229L19.6625 0.954236C20.2106 0.406368 21.0989 0.406368 21.647 0.954236Z" fill="#4D1C6B" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                ) : (
                  
                  <div
                    onClick={() => handleButtonClick(index)}
                    className={`border-box ${isButtonClicked[index] ? 'clicked' : ''}`}
                  >
                    <div className='minute'>
                      {fiche.critere_duree_max} MIN
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
  
        
        </>) }

        export default List;

    
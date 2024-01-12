"use client"

import React from 'react';
import './Switch.scss';

interface NavigationProps {
  onPreviousClick: () => void;
  onValidateClick: () => void;
}

const NavigationButtons: React.FC<NavigationProps> = ({ onPreviousClick, onValidateClick }) => {
  return (
    <div>
      <button className='Previous' onClick={onPreviousClick}>Précédent</button>
      <button className='Validate' onClick={onValidateClick}>Valider</button>
    </div>
  );
};

const App: React.FC = () => {
  const handlePreviousClick = () => {
  
    console.log('Bouton Précédent cliqué');
  };

  const handleValidateClick = () => {
    
    console.log('Bouton Valider cliqué');
  };

  return (
    <div>
      
      <NavigationButtons
        onPreviousClick={handlePreviousClick}
        onValidateClick={handleValidateClick}
      />
    </div>
  );
};

export default App;



"use client"

import React from 'react';
import './filtre.scss';

// interface pour définir la structure d'une option de filtre
interface Option {
  label: string;
  value: string;
}

// interface pour définir la structure d'un groupe de filtres
interface FilterGroup {
  label: string; // label pour le groupe de filtres
  options: Option[]; // options spécifiques à chaque filtre
}

// interface pour définir les propriétés
interface FiltreProps {
  filterGroups: FilterGroup[]; // tableau des groupes de filtres
  onFilterChange: (filter: string, groupIndex: number) => void; // fonction de gestion du changement de filtre
}


const Filtre: React.FC<FiltreProps> = ({ filterGroups, onFilterChange }) => {

  if (!filterGroups || filterGroups.length === 0) {
    return null;
  }
  // fonction de gestion du changement de filtre pour un groupe donné
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>, groupIndex: number) => {
    onFilterChange(event.target.value, groupIndex);
  };

  // fonction pour rendre un groupe de filtres
  const renderFilterGroup = (group: FilterGroup, groupIndex: number) => (
    <div key={group.label} className="filtre-group">
      <select onChange={(e) => handleFilterChange(e, groupIndex)}>
        
        <option value="">{group.label}</option>
        {/* map des options de filtre */}
        {group.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  // rendu du composant Filtre
  return (
    <div className="filtre-container">
   
      {filterGroups.map((group, index) => renderFilterGroup(group, index))}
    </div>
  );
};

export default Filtre;

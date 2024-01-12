'use client'

import React from "react";
import './ReinitFiltre.scss';

const ReinitFiltre = () => {
    return (
        <div className="TimeIcon">
            <svg
                width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <g id="time">
                    <path
                        id="Ic&#195;&#180;ne" fill-rule="evenodd" clip-rule="evenodd" d="M6.72756 1.81006C9.80708 1.81006 12.3034 4.30635 12.3034 7.38588C12.3034 10.4654 9.80708 12.9617 6.72756 12.9617C3.64803 12.9617 1.15173 10.4654 1.15173 7.38588C1.15173 4.30635 3.64803 1.81006 6.72756 1.81006ZM6.72756 2.92522C4.264 2.92522 2.2669 4.92233 2.2669 7.38588C2.2669 9.84943 4.264 11.8465 6.72756 11.8465C9.19111 11.8465 11.1882 9.84943 11.1882 7.38588C11.1882 4.92233 9.19111 2.92522 6.72756 2.92522ZM7.28514 4.59797V7.38588H9.51547V8.50105H6.16997V4.59797H7.28514Z" fill="white"/>
                </g>
            </svg>
           <span>Réinitialiser les filtres</span>
        </div>
    );
}

export default ReinitFiltre;

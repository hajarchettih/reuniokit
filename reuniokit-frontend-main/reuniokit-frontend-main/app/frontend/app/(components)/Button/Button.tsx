
'use client'
import React from 'react';
import './button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  buttonType: 'primary' | 'secondary' | 'tertiary';
  icon?: string;
  className?: string | undefined;
}

function generateButtonStyles(prefix: 'primary' | 'secondary' | 'tertiary') {
  let buttonType = 'button-secondary';

  if (prefix === 'primary') {
    buttonType = 'button-primary';
  } else if (prefix === 'secondary') {
    buttonType = 'button-secondary';
  } else if (prefix === 'tertiary') {
    buttonType = 'button-tertiary';
  }

  return buttonType;
}

const Button: React.FC<ButtonProps> = ({ text, buttonType, icon, className, ...props }) => {
  const styles = generateButtonStyles(buttonType);

  return (
    <div className={styles} >
      {buttonType === 'primary' && (
          <button className={`Button ${className || ''}`} {...props}>
            {icon && <img src={icon} alt="Icon" />}
            {text}
          </button>
      )}
      {buttonType === 'secondary' && (
          <button className={`Button ${className || ''}`} {...props}>
            {icon && <img src={icon} alt="Icon" />}
            {text}
          </button>
      )}
      {buttonType === 'tertiary' && (
        <button className={`LoginButton ${className || ''}`} {...props}>
          {icon && <img src={process.env.NEXT_PUBLIC_DEPLOIEMENT + icon} alt="Icon" />}
          {text}
        </button> 
      )

      }
    </div>
  );
}

export default Button;

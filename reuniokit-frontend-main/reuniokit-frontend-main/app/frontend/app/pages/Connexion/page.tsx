"use client"

import React, { useState } from 'react';
import './connexion.scss';


const Connexion: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Login submitted:', formData);
        setFormData({
            email: '',
            password: '',
        });
    };

    return (
        <div className="login-page">
            <h1 className="h1">Connexion</h1>
            <h3 className="h3">Rentrez vos identifiants pour vous connecter</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Adresse électronique
                    <input
                        className="log"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Mot de passe
                    <input
                        className="log"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <div className="mdp">Mot de passe oublié ?</div>
                </label>
                <br />
            </form>
        </div>
    );
};

export default Connexion; // Ajout de cette ligne si vous en avez besoin dans le reste de votre application

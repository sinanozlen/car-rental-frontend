// src/pages/Error404.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Error404.module.css';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Oops!!</h1>
      <p className={classes.subtitle}>Bazı Şeyler Yolunda Gitmedi</p>
      <button className={classes.button} onClick={() => navigate('/')}>
        Anasayfa'ya Dön
      </button>
    </div>
  );
};

export default Error404;

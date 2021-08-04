import { Container } from '@material-ui/core';
import React from 'react';
import style from '../Tools/Style';
import Image from '../../assets/triste.png';

const Prohibido = () => {
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <br />
        <img style={{width:200,height:200}} src={Image} alt="Desautorizado" />
        <br />
        <h2>Lo sentimos no tienes autorizacion para visualizar este contenido, </h2>
          
        <h2> comunicate con el administrador del sistema</h2>
      </div>
    </Container>
  );
};

export default Prohibido;

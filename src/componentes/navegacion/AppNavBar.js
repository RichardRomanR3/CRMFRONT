import React from 'react';
import { AppBar } from '@material-ui/core';
import BarSesion from './bar/BarSesion';
import { useStateValue } from '../../contexto/store';
const AppNavBar = () => {
  const [{ sesionUsuario }] = useStateValue();
  return sesionUsuario ? (
    sesionUsuario.autenticado === true ? (
      <AppBar position="static">
        <BarSesion />
      </AppBar>
    ) : null
  ) : null;
};

export default AppNavBar;

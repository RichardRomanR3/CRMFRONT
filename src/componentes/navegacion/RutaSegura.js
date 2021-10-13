import React from 'react';
import { useStateValue } from '../../contexto/store';
import { Route, Redirect } from 'react-router-dom';

function RutaSegura({ component: Component, ...rest }) {
  const [{ sesionUsuario }] = useStateValue();
  const rutaActual = rest.location.pathname;
  var arrRolPuedeVer = null;
  if (sesionUsuario) {
    const pantallasRol =
      sesionUsuario.usuario.pantallasUsuario.listaPantallasRol;
    arrRolPuedeVer = pantallasRol.filter(
      (pantallazo) => pantallazo.path === rutaActual
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        sesionUsuario ? (
          sesionUsuario.autenticado === true ? (
            arrRolPuedeVer.length > 0 ? (
              <Component {...props} {...rest} />
            ) : (
              <Redirect to="/prohibido" />
            )
          ) : (
            <Redirect to="/login" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
export default RutaSegura;

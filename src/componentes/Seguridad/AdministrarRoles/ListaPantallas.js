import {
  Grid,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ObtenerListaPantallas,
  ObtenerPantallasRol,
} from '../../actions/PantallasAction';

const ListaPantallas = (props) => {
  const codigoRol = props.codigoRol;

  const [pantallas, setPantallas] = useState([]);
  const [pantallasRol, setPantallasRol] = useState([]);
  const [pantallasMostrar, setPantallasMostrar] = useState([]);
  const [auxiliar, setAuxiliar] = useState(0);

  useEffect(() => {
    //FERNANDO COLUCCI
    //aqui obtendremos la lista de pantallas, y las que puede ver el rol

    ObtenerListaPantallas()
      .then((response) => {
        setPantallas(response.data);
      })
      .catch((error) => {
        console.log('Ocurrio un error al obtener las pantallas ', error);
      });

    ObtenerPantallasRol(codigoRol)
      .then((response) => {
        setPantallasRol(response.data.listaPantallasRol);
      })
      .catch((error) => {
        console.log('Ocurrio un error al obtener las pantallas', error);
      });
  }, []);

  useEffect(() => {
    //FERNANDO COLUCCI
    //aqui actualizo los switch y el array de las pantallas que podra ver este rol
    AsignarSwitchs(pantallas, pantallasRol);
    props.cambiarPermitidas(pantallasRol);
  }, [auxiliar, pantallas, pantallasRol]);

  const manejadorSwitchs = (event, pantallaw) => {
    var pantRolManejador = pantallasRol;
    let index = pantRolManejador.map((p) => p.path).indexOf(pantallaw.path);
    //FERNANDO COLUCCI
    //Por alguna razon el event.target.checked devuelve al reves el resultado
    if (event.target.checked === false) {
      pantRolManejador.splice(index, 1);
    } else {
      pantRolManejador.push(pantallaw);
    }

    setPantallasRol(pantRolManejador);

    if (auxiliar === 0) {
      setAuxiliar(1);
    } else {
      setAuxiliar(0);
    }
  };

  function AsignarSwitchs(array1, array2) {
    //FERNANDO COLUCCI
    //array1 es el array de TODAS las pantallas
    //array2 contiene las pantallas que tiene permitidas el Rol

    var pantallasx = [];

    for (let i = 0; i < array1.length; i++) {
      let idx = array1[i].pantallA_Id;
      let nombrex = array1[i].nombrepantalla;
      let pathx = array1[i].path;
      let checkedx = false;
      let existe = array2.filter(
        (pantallazo) => pantallazo.path === array1[i].path
      );

      if (existe.length > 0) {
        checkedx = true;
      }

      let pantalla = {
        pantallA_Id: idx,
        nombrepantalla: nombrex,
        path: pathx,
        checked: checkedx,
      };
      pantallasx.push(pantalla);
    }
    setPantallasMostrar(pantallasx);
  }

  return (
    <Grid item xs={12} md={12}>
      <TableContainer component={Paper} align="center">
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Pantalla</TableCell>
              <TableCell align="center">Permitir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pantallasMostrar.length > 0
              ? pantallasMostrar.map((pantalla) => (
                  <TableRow key={pantalla.pantallA_Id}>
                    <TableCell align="left">
                      {pantalla.nombrepantalla}
                    </TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={pantalla.checked}
                        color="primary"
                        onClick={(e) => manejadorSwitchs(e, pantalla)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default ListaPantallas;

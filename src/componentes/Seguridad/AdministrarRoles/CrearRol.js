import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import style from '../../../componentes/Tools/Style';
import { AddPantallasRol, crearRol } from '../../../actions/RolesAction';
import { useStateValue } from '../../../contexto/store';
import { Link } from 'react-router-dom';
import PanelRoles from './PanelRoles';
import { ObtenerPantallasRol2 } from '../../../actions/PantallasAction';
const CrearRol = () => {
  const mounted = useRef(true);
  //eslint-disable-next-line
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [error, setError] = useState(false);
  const [arrManejadorPermisos, setArrManejadorPermisos] = useState([]);
  const [rol, setRol] = useState({
    NOMBRE: '',
  });

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setRol((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  let rolCreadoId;

  const actualizarPermisos = (permisos) => {
    setArrManejadorPermisos(permisos);
  };

  const guardarRol = (e) => {
    e.preventDefault();
    if (rol.NOMBRE === '') {
      dispatch({
        type: 'OPEN_SNACKBAR',
        openMensaje: {
          open: true,
          mensaje: 'Debe especificar un nombre',
        },
      });
    } else {
      const rolNuevo = {
        Nombre: rol.NOMBRE,
      };
      crearRol(rolNuevo).then((response) => {
        if (response.status === 500) {
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje: 'Ya existe un Rol con ese nombre',
            },
          });
        } else if (response.status === 200) {
          asignarPermisosRol();
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje: 'Rol guardado exitosamente',
            },
          });
          setRol({
            NOMBRE: '',
          });
        } else {
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje: 'Errores al intentar guardar el nombre del rol',
            },
          });
        }
      });
    }
  };

  const asignarPermisosRol = () => {
    ObtenerPantallasRol2({ nombrerol: rol.NOMBRE }).then((response) => {
      rolCreadoId = response.data.id;
      var arrHabilitar = [];
      var arrDenegar = [];

      for (let i = 0; i < arrManejadorPermisos.length; i++) {
        const pantalla_c = {
          id: arrManejadorPermisos[i].categoriaId,
          nombre: arrManejadorPermisos[i].nombre,
          ruta: arrManejadorPermisos[i].ruta,
        };
        if (arrManejadorPermisos[i].checked === true) {
          arrHabilitar.push(pantalla_c);
        } else {
          arrDenegar.push(pantalla_c);
        }

        for (
          let j = 0;
          j < arrManejadorPermisos[i].subcategoriasLista.length;
          j++
        ) {
          const pantalla_sc = {
            id: arrManejadorPermisos[i].subcategoriasLista[j].subcategoriaId,
            nombre: arrManejadorPermisos[i].subcategoriasLista[j].nombre,
            ruta: arrManejadorPermisos[i].subcategoriasLista[j].ruta,
          };
          if (arrManejadorPermisos[i].subcategoriasLista[j].checked === true) {
            arrHabilitar.push(pantalla_sc);
          } else {
            arrDenegar.push(pantalla_sc);
          }

          for (
            let k = 0;
            k <
            arrManejadorPermisos[i].subcategoriasLista[j].pantallasLista.length;
            k++
          ) {
            const pantalla_p = {
              id:
                arrManejadorPermisos[i].subcategoriasLista[j].pantallasLista[k]
                  .pantallA_Id,
              nombre:
                arrManejadorPermisos[i].subcategoriasLista[j].pantallasLista[k]
                  .nombrepantalla,
              ruta:
                arrManejadorPermisos[i].subcategoriasLista[j].pantallasLista[k]
                  .path,
            };
            if (
              arrManejadorPermisos[i].subcategoriasLista[j].pantallasLista[k]
                .checked === true
            ) {
              arrHabilitar.push(pantalla_p);
            } else {
              arrDenegar.push(pantalla_p);
            }
          }
        }
      }

      AgregarPantallasAlRol(arrHabilitar);
      if (error) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje:
              'Ocurrieron algunos errores al actualizar, verifique el rol',
          },
        });
      } else {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'GUARDADO CON ÉXITO!!!',
          },
        });
      }
    });
  };

  const AgregarPantallasAlRol = (arrPermitidas) => {
    for (let i = 0; i < arrPermitidas.length; i++) {
      const objRolPantalla = {
        ROL_Id: rolCreadoId,
        PANTALLA_Id: arrPermitidas[i].id,
      };
      AddPantallasRol(objRolPantalla).then((response) => {
        if (response.status === 200) {
        } else {
          setError(true);
        }
      });
    }
  };
  useEffect(() => {
    if (mounted.current) {
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, []);

  return (
    <Container component="main" maxWidth="lg" justify="center">
      <br />
      <Typography align="center" component="h1" variant="h6">
        Crear Rol
      </Typography>
      <br />
      <Grid container spacing={4} justify="center">
        <Grid item xs={12} md={12} lg={8}>
          <TextField
            name="NOMBRE"
            value={rol.NOMBRE}
            fullWidth
            onChange={ingresarValoresMemoria}
            variant="outlined"
            label="Nombre"
          />
        </Grid>
      </Grid>

      <br />
      <br />
      <Grid item lg={12}>
        <PanelRoles
          codigoRol=""
          actualizarPermisos={actualizarPermisos}
          procedencia="rolNuevo"
        />
      </Grid>

      <br />
      <br />
      <Grid container justify="center" spacing={6}>
        <Grid item xs={4} md={4}>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/rol"
            style={style.submit}
          >
            Volver
          </Button>
        </Grid>

        <Grid item xs={6} md={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => guardarRol(e)}
            style={style.submit}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CrearRol;

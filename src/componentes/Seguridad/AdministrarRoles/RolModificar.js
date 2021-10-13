import {
  Button,
  Container,
  Fab,
  Grid,
  makeStyles,
  TextField,
  Typography,
  useScrollTrigger,
  Zoom,
} from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react';
import style from '../../../componentes/Tools/Style';
import {
  AddPantallasRol,
  DeletePantallasRol,
  modificarRol,
} from '../../../actions/RolesAction';
import { useStateValue } from '../../../contexto/store';
import { Link } from 'react-router-dom';
import PanelRoles from './PanelRoles';
import { obtenerUsuarioActual } from '../../../actions/UsuariosAction';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

//FERNANDO COLUCCI

const RolModificar = (props) => {
  const mounted = useRef(true);
  const rolprops = props.location.state;
  const [error, setError] = useState(false);
  //eslint-disable-next-line
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [rol, setRol] = useState({
    Id: rolprops.Id,
    NOMBRE: '',
  });

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setRol((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const [arrManejadorPermisos, setArrManejadorPermisos] = useState([]);

  const actualizarPermisos = (permisos) => {
    setArrManejadorPermisos(permisos);
  };

  const actualizarRol = (e) => {
    e.preventDefault();
    const rolmodificado = {
      Id: rolprops.id,
      Nombre: rol.NOMBRE,
    };

    if (rol.NOMBRE !== '') {
      modificarRol(rolmodificado).then((response) => {
        if (response.status === 200) {
          //nombre del rol se actualizó bien
        } else {
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje:
                'Ese nombre de Rol ya está siendo utilizado, por lo que no se actualizó',
            },
          });
        }
      });
    }

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
    QuitarPantallasAlRol(arrDenegar);

    if (error) {
      dispatch({
        type: 'OPEN_SNACKBAR',
        openMensaje: {
          open: true,
          mensaje: 'Ocurrieron algunos errores al actualizar, verifique el rol',
        },
      });
    } else {
      dispatch({
        type: 'OPEN_SNACKBAR',
        openMensaje: {
          open: true,
          mensaje: 'ACTUALIZADO CON ÉXITO!!!',
        },
      });
      obtenerUsuarioActual(dispatch);
      props.history.goBack();
      //window.location.reload();
    }
  };

  const AgregarPantallasAlRol = (arrPermitidas) => {
    for (let i = 0; i < arrPermitidas.length; i++) {
      const objRolPantalla = {
        ROL_Id: rolprops.id,
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

  const QuitarPantallasAlRol = (arrDenegadas) => {
    for (let i = 0; i < arrDenegadas.length; i++) {
      DeletePantallasRol(rolprops.id, arrDenegadas[i].id).then((response) => {
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

  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));

  function ScrollTop(propsx) {
    const { children } = propsx;
    const classes = useStyles();
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100,
    });

    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        '#back-to-top-anchor'
      );

      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.root}>
          {children}
        </div>
      </Zoom>
    );
  }

  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg" justify="center">
        <br />
        <Typography
          align="center"
          component="h1"
          variant="h6"
          id="back-to-top-anchor"
        >
          Modificar Rol: {rolprops.name}
        </Typography>
        <br />
        <br />
        <Grid container justify="center">
          <Grid item xs={8} md={8}>
            <TextField
              name="NOMBRE"
              value={rol.NOMBRE}
              fullWidth
              onChange={ingresarValoresMemoria}
              variant="outlined"
              label="Nuevo nombre de Rol"
            />
          </Grid>
        </Grid>

        <br />
        <br />
        <Grid item lg={12}>
          <PanelRoles
            codigoRol={rolprops.id}
            actualizarPermisos={actualizarPermisos}
            procedencia="rolModificar"
          />
        </Grid>

        <br />
        <br />

        <Grid container justify="center" spacing={6}>
          <Grid item xs={4} md={4}>
            <Button
              variant="contained"
              color="primary"
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
              onClick={(e) => actualizarRol(e)}
              style={style.submit}
            >
              Actualizar
            </Button>
          </Grid>
        </Grid>
      </Container>

      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
};

export default RolModificar;

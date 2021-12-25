import React, { useState, useEffect, useRef } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStateValue } from '../../contexto/store';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import style from '../Tools/Style';
import {
  ObtenerRolUsuario,
  ObtenerListaRoles,
  agregarRol,
  eliminarRolUsuario,
} from '../../actions/RolesAction';
export default function GestionUsuario(props) {
  const [usuarioEliminar, setUsuarioEliminar] = useState([]);
  const [openDialogAlerta, setOpenDialogAlerta] = useState(false);
  //eslint-disable-next-line
  const [{ openSnackBar }, dispatch] = useStateValue();
  const mounted = useRef(true);
  const [nuevoRol, setNuevoRol] = useState('');
  const [DataRoles, setDataRoles] = useState([]);
  const [notiene, setNoTiene] = useState('');
  const [rol, setRol] = useState([]);
  const [usuario, setUsuario] = useState({
    userName: '',
    nombrecompleto: '',
    email: '',
  });

  const dialogAlertaHandleClose = () => {
    setOpenDialogAlerta(false);
  };
  const abrirDialogLimpiar = (usuario) => {
    setUsuarioEliminar(usuario);
    ObtenerRolUsuario(usuario.userName).then((response) => {
      if (response.status === 200) {
        setRol(response.data);
      } else {
        console.log('NINGUNO');
      }
    });
    setOpenDialogAlerta(true);
    setRol([]);
  };
  const eliminarRol = () => {
    eliminarRolUsuario(usuarioEliminar.userName).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se Elimino el rol',
          },
        });
        setUsuarioEliminar([]);
        ObtenerRolUsuario(usuario.userName).then((response) => {
          if (response.status === 200) {
            setRol(response.data);
          } else {
            setNoTiene('NO TIENE');
          }
        });
        dialogAlertaHandleClose();
      } else {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Errores al intentar eliminar',
          },
        });
        setUsuarioEliminar([]);

        dialogAlertaHandleClose();
      }
    });
  };
  const selectRolhandleChange = (event) => {
    setNuevoRol(event.target.value);
  };
  const agregarRolAUsuario = () => {
    if (nuevoRol !== undefined && nuevoRol !== '') {
      const objetoRol = {
        UserName: usuario.userName,
        RolNombre: nuevoRol,
      };
      agregarRol(objetoRol).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje: 'Se guardo el rol',
            },
          });
          volver();
        }
      });
    } else {
      volver();
    }
  };
  const cancelar = () => {
    setUsuarioEliminar([]);
    dialogAlertaHandleClose();
  };
  const volver = () => {
    props.history.goBack();
  };
  useEffect(() => {
    if (mounted.current) {
      ObtenerListaRoles().then((response) => {
        if (response.status === 200) {
          setDataRoles(response.data);
        } else {
          console.log('erro en axios');
        }
      });
      ObtenerRolUsuario(props.location.state.userName).then((response) => {
        if (response.status === 200) {
          setRol(response.data);
        } else {
          setNoTiene('NO TIENE');
        }
      });
      setUsuario(props.location.state);
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, [props, rol]);
  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <br></br>
        <Typography component="h1" variant="h6">
          Administrar Usuario
        </Typography>
        <br></br>
        <br></br>
        <form style={style.form}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="UserName"
                value={usuario.userName}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Alias(SIN ESPACIOS)"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="NOMBRECOMPLETO"
                value={usuario.nombrecompleto}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Nombre y Apellido"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="Email"
                value={usuario.email}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Email"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                multiline
                disable="true"
                name="Rol"
                fullWidth
                onChange={ingresarValoresMemoria}
                value={rol.length !== 0 ? rol : notiene}
                variant="outlined"
                label="Rol Actual"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" style={style.Select.rol}>
                <InputLabel style={style.Selectrol}>Nuevo Rol</InputLabel>
                <Select
                  value={nuevoRol}
                  onChange={selectRolhandleChange}
                  label="Nuevo Rol"
                >
                  <MenuItem value="">
                    <em>Ninguno</em>
                  </MenuItem>
                  {DataRoles.map((rol) => (
                    <MenuItem key={rol.id} value={rol.name}>
                      {rol.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => abrirDialogLimpiar(usuario)}
                style={style.submit}
              >
                Limpiar Roles
              </Button>
            </Grid>
          </Grid>
          <br></br>
          <br></br>
          <Grid container spacing={4} justify="center">
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={agregarRolAUsuario}
                style={style.submit}
              >
                Guardar
              </Button>
            </Grid>
            <br />
            <br />
            <br />
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="secondary"
                onClick={volver}
                style={style.submit}
              >
                Volver
              </Button>
            </Grid>
          </Grid>
        </form>
        <Dialog
          open={openDialogAlerta}
          onClose={dialogAlertaHandleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Desea Eliminar el Rol?
          </DialogTitle>
          <DialogActions>
            <Button color="secondary" onClick={eliminarRol}>
              Eliminar
            </Button>
            <Button onClick={cancelar} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  );
}

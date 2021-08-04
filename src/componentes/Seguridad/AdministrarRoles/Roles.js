import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import style from '../../Tools/Style';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import { eliminarRol, ObtenerListaRoles } from '../../../actions/RolesAction';
import { useStateValue } from '../../../contexto/store';
const Roles = (props) => {
  const mounted = useRef(true);
  const [Datar, setDatar] = useState([]);
  const [term, setTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [rolElimId, setRolElimId] = useState('');
  const [rolElimNombre, setRolElimNombre] = useState('');
  const [datosCargados, setDatosCargados] = useState(false);
  const [boolNuevoRol, setBoolNuevoRol] = useState(false);
  const [boolEditarRol, setBoolEditarRol] = useState(false);
  const [boolEliminarRol, setBoolEliminarRol] = useState(false);

  //eslint-disable-next-line
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const nuevoRol = () => {
    props.history.push('/rol/nuevo');
  };

  const searchingTerm = (term) => {
    return function (x) {
      return x.name.toUpperCase().includes(term.toUpperCase()) || !term;
    };
  };

  const modificarRol = (rolmod) => {
    props.history.push({ pathname: '/rol/modificar', state: rolmod });
  };

  const mostrarDialogEliminar = (roleliminar) => {
    setOpenDialog(true);
    setRolElimId(roleliminar.id);
    setRolElimNombre(roleliminar.name);
  };

  useEffect(() => {
    if (mounted.current) {
      ObtenerListaRoles().then((response) => {
        const Data = response.data;
        setDatar(Data);
        setDatosCargados(true);
      });
    }
  }, []);
  const dialogHandleCloseX = (e) => {
    setOpenDialog(false);
  };

  const deleteRol = () => {
    eliminarRol(rolElimId).then((response) => {
      if (response.status === 200) {
        window.location.reload();
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Rol eliminado',
          },
        });
      } else {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Hubo un inconveniente al intentar eliminar',
          },
        });
      }
    });
    setOpenDialog(false);
  };
  //FERNANDO COLUCCI
  //SEGURIDAD
  useEffect(() => {
    const VerificarPermisos = (arrPermisos) => {
      setBoolNuevoRol(evaluarPermiso(arrPermisos, '/rol/nuevo'));
      setBoolEditarRol(evaluarPermiso(arrPermisos, '/rol/modificar'));
      setBoolEliminarRol(evaluarPermiso(arrPermisos, '/rol/eliminar'));
    };

    VerificarPermisos(sesionUsuario.usuario.pantallasUsuario.listaPantallasRol);
  }, [sesionUsuario]);

  const evaluarPermiso = (arrayrevisar, ruta) => {
    var boolEvaluacion = false;

    let existe = arrayrevisar.filter((pantallazo) => pantallazo.path === ruta);

    if (existe.length > 0) {
      boolEvaluacion = true;
    }

    return boolEvaluacion;
  };

  return (
    <Container component="main" justify="center">
      <br></br>
      <Typography align="center" component="h1" variant="h6">
        Lista de Roles
      </Typography>
      <br></br>
      {boolNuevoRol ? (
        <Grid container>
          <Grid item xs={12} md={6}>
            <Button
              style={style.submit.submitnuevo}
              variant="contained"
              color="primary"
              onClick={nuevoRol}
            >
              Nuevo
            </Button>
          </Grid>
        </Grid>
      ) : null}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <br />
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <SearchIcon />
            </Grid>
            <Grid item>
              <TextField
                name="term"
                style={style.TextField}
                onChange={(e) => setTerm(e.target.value)}
                id="input-with-icon-grid"
                label="Buscar"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Grid item xs={12} md={12}>
        {datosCargados ? (
          <TableContainer component={Paper} align="center">
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Nombre</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Datar.filter(searchingTerm(term)).map((rol) => (
                  <TableRow key={rol.id}>
                    <TableCell align="left">{rol.name}</TableCell>
                    <TableCell align="center">
                      {boolEditarRol ? (
                        <Button
                          color="primary"
                          style={style.submit.submitTabla}
                          onClick={() => modificarRol(rol)}
                          label="Editar"
                        >
                          EDITAR
                        </Button>
                      ) : null}
                      {boolEliminarRol ? (
                        <Button
                          color="secondary"
                          style={style.submit.submitTabla}
                          onClick={() => mostrarDialogEliminar(rol)}
                          label="Eliminar"
                        >
                          Eliminar
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Grid container justify="center">
            <CircularProgress />
            <br />
            <Typography>Cargando...</Typography>
          </Grid>
        )}
      </Grid>

      <div notranslate="true">
        <Dialog
          open={openDialog}
          onClose={dialogHandleCloseX}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Alerta</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Desea eliminar el rol: {rolElimNombre}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={dialogHandleCloseX}
              color="secondary"
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={() => deleteRol()}
              color="primary"
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  );
};

export default Roles;

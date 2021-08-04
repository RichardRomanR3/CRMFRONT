import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import style from '../../Tools/Style';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  obtenerTiposActividades,
  eliminarTipoActividad,
} from '../../../actions/ActividadesAction';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { useStateValue } from '../../../contexto/store';

const TipoActividadTb = (props) => {
  //eslint-disable-next-line
  const [{ openSnackar }, dispatch] = useStateValue();
  const [Datar, setDatar] = useState([]);
  const [term, setTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [tipoActividadElimNombre, setTipoActividadElimNombre] = useState('');
  const [tipoActividadElimId, setTipoActividadElimId] = useState(null);
  const [datosCargados, setDatosCargados] = useState(false);

  //TRAER LOS DATOS AL CARGAR EL COMPONENTE
  useEffect(() => {
    obtenerTiposActividades().then((response) => {
      const Data = response.data;
      setDatar(Data);
      setDatosCargados(true);
    });
  }, []);

  //RRR: FUNCION BUSCAR DE TABLA
  function searchingTerm(term) {
    return function (x) {
      let nombre = x.nombre || '';
      let descripcion = x.descripcion || '';

      return (
        nombre.toLowerCase().includes(term) ||
        descripcion.toLowerCase().includes(term) ||
        !term
      );
    };
  }

  //RRR: FUNCION ONCLICK(SELECCIONAR TIPO CAMPANA) DE TABLA
  const seleccionarTipoActividad = (tipoactividad) => {
    props.history.push({
      pathname: '/modificarTipoDeActividad',
      state: tipoactividad,
    });
  };

  //RRR: FUNCION ONCLICK DE BOTON NUEVO
  const nuevoTipoActividad = () => {
    props.history.push('/nuevoTipoDeActividad');
  };

  //MOSTRAR DIALOGO DE CONFIRMACION PARA ELIMINAR
  const mostrarDialogEliminar = (tipoactividadelim) => {
    setTipoActividadElimNombre(tipoactividadelim.nombre);
    setOpenDialog(true);
    setTipoActividadElimId(tipoactividadelim.id);
  };

  const dialogHandleCloseX = (e) => {
    setOpenDialog(false);
  };

  //RRR: FUNCION PARA ELIMINAR TIPO DE CAMPAÑA
  const eliminarTA = () => {
    eliminarTipoActividad(tipoActividadElimId).then((response) => {
      if (response.status === 200) {
        window.location.reload();
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se elimino exitosamente el Tipo de Actividad',
          },
        });
      } else {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje:
              'El Tipo de Actividad ya esta siendo utilizado no se puede eliminar ',
          },
        });
      }
    });
  };

  return (
    <Container component="main" justify="center">
      <br />
      <Typography align="center" component="h1" variant="h6">
        Gestion de Tipos de Actividades
      </Typography>
      <br />
      <Grid container>
        <Grid item xs={12} md={6}>
          <Button
            style={style.submit.submitnuevo}
            variant="contained"
            color="primary"
            onClick={nuevoTipoActividad}
          >
            Nuevo
          </Button>
        </Grid>
      </Grid>
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
      <Grid item xs={12} md={12}>
        {datosCargados ? (
          <TableContainer component={Paper} align="center">
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Nombre</TableCell>
                  <TableCell align="left">Descripcion</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Datar.filter(searchingTerm(term)).map((tipoactividad) => (
                  <TableRow key={tipoactividad.id}>
                    <TableCell align="left">
                      {tipoactividad.nombre}
                    </TableCell>
                    <TableCell align="left">
                      {tipoactividad.descripcion}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="primary"
                        style={style.submit.submitTabla}
                        onClick={() => seleccionarTipoActividad(tipoactividad)}
                        label="Administrar"
                      >
                        EDITAR
                      </Button>
                      <Button
                        color="secondary"
                        style={style.submit.submitTabla}
                        onClick={() => mostrarDialogEliminar(tipoactividad)}
                        label="Eliminar"
                      >
                        Eliminar
                      </Button>
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
              ¿Desea eliminar el Tipo de Actividad: <br /> {tipoActividadElimNombre}?
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
              onClick={eliminarTA}
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

export default TipoActividadTb;

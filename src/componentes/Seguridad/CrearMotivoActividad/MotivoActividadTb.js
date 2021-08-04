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
  obtenerMotivoActividades,
  eliminarMotivoActividad,
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

const MotivoActividadTb = (props) => {
  //eslint-disable-next-line
  const [{ openSnackar }, dispatch] = useStateValue();
  const [Datar, setDatar] = useState([]);
  const [term, setTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [motivoActividadElimNombre, setMotivoActividadElimNombre] = useState('');
  const [motivoActividadElimId, setMotivoActividadElimId] = useState(null);
  const [datosCargados, setDatosCargados] = useState(false);

  //TRAER LOS DATOS AL CARGAR EL COMPONENTE
  useEffect(() => {
    obtenerMotivoActividades().then((response) => {
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
  const seleccionarMotivoActividad = (motivoactividad) => {
    props.history.push({
      pathname: '/modificarMotivoDeActividad',
      state: motivoactividad,
    });
  };

  //RRR: FUNCION ONCLICK DE BOTON NUEVO
  const nuevoMotivoActividad = () => {
    props.history.push('/nuevoMotivoDeActividad');
  };

  //MOSTRAR DIALOGO DE CONFIRMACION PARA ELIMINAR
  const mostrarDialogEliminar = (motivoactividadelim) => {
    setMotivoActividadElimNombre(motivoactividadelim.nombre);
    setOpenDialog(true);
    setMotivoActividadElimId(motivoactividadelim.id);
  };

  const dialogHandleCloseX = (e) => {
    setOpenDialog(false);
  };

  //RRR: FUNCION PARA ELIMINAR TIPO DE CAMPAÑA
  const eliminarMA = () => {
    eliminarMotivoActividad(motivoActividadElimId).then((response) => {
      if (response.status === 200) {
        window.location.reload();
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se elimino exitosamente el Motivo de Actividad',
          },
        });
      } else {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje:
              'El Motivo de Actividad ya esta siendo utilizado no se puede eliminar ',
          },
        });
      }
    });
  };

  return (
    <Container component="main" justify="center">
      <br />
      <Typography align="center" component="h1" variant="h6">
        Gestion de Motivos de Actividades
      </Typography>
      <br />
      <Grid container>
        <Grid item xs={12} md={6}>
          <Button
            style={style.submit.submitnuevo}
            variant="contained"
            color="primary"
            onClick={nuevoMotivoActividad}
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
                {Datar.filter(searchingTerm(term)).map((motivoactividad) => (
                  <TableRow key={motivoactividad.id}>
                    <TableCell align="left">
                      {motivoactividad.nombre}
                    </TableCell>
                    <TableCell align="left">
                      {motivoactividad.descripcion}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="primary"
                        style={style.submit.submitTabla}
                        onClick={() => seleccionarMotivoActividad(motivoactividad)}
                        label="Administrar"
                      >
                        EDITAR
                      </Button>
                      <Button
                        color="secondary"
                        style={style.submit.submitTabla}
                        onClick={() => mostrarDialogEliminar(motivoactividad)}
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
              ¿Desea eliminar el Motivo de Actividad: <br /> {motivoActividadElimNombre}?
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
              onClick={eliminarMA}
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

export default MotivoActividadTb;

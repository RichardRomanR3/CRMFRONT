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
  obtenerTiposCampanas,
  eliminarTc,
} from '../../../actions/CampanasAction';
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

const TipoCampanaTb = (props) => {
  //eslint-disable-next-line
  const [{ openSnackar }, dispatch] = useStateValue();
  const [Datar, setDatar] = useState([]);
  const [term, setTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [campanaElimNombre, setCampanaElimNombre] = useState('');
  const [campanaElimId, setCampanaElimId] = useState(null);
  const [datosCargados, setDatosCargados] = useState(false);

  //TRAER LOS DATOS AL CARGAR EL COMPONENTE
  useEffect(() => {
    obtenerTiposCampanas().then((response) => {
      const Data = response.data;
      setDatar(Data);
      setDatosCargados(true);
    });
  }, []);

  //RRR: FUNCION BUSCAR DE TABLA
  function searchingTerm(term) {
    return function (x) {
      let descritipocampana = x.descritipocampana || '';
      let codtipocampana = x.codtipocampana || 0;

      return (
        descritipocampana.toLowerCase().includes(term) ||
        codtipocampana.toString().toLowerCase().includes(term) ||
        !term
      );
    };
  }

  //RRR: FUNCION ONCLICK(SELECCIONAR TIPO CAMPANA) DE TABLA
  const seleccionarTipoCampana = (tipocampana) => {
    props.history.push({
      pathname: '/tipocampana/modificar',
      state: tipocampana,
    });
  };

  //RRR: FUNCION ONCLICK DE BOTON NUEVO
  const nuevoTipoCampana = () => {
    props.history.push('/tipocampana/nuevo');
  };

  //MOSTRAR DIALOGO DE CONFIRMACION PARA ELIMINAR
  const mostrarDialogEliminar = (tipocampanaelim) => {
    setCampanaElimNombre(tipocampanaelim.descritipocampana);
    setOpenDialog(true);
    setCampanaElimId(tipocampanaelim.tipocampanA_Id);
  };

  const dialogHandleCloseX = (e) => {
    setOpenDialog(false);
  };

  //RRR: FUNCION PARA ELIMINAR TIPO DE CAMPAÑA
  const eliminarTipoCampana = () => {
    eliminarTc(campanaElimId).then((response) => {
      if (response.status === 200) {
        window.location.reload();
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se elimino exitosamente el Tipo de Campana',
          },
        });
      } else {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje:
              'El Tipo de Campana ya esta siendo utilizado no se puede eliminar ',
          },
        });
      }
    });
  };

  return (
    <Container component="main" justify="center">
      <br />
      <Typography align="center" component="h1" variant="h6">
        Gestion de Tipos de Campañas
      </Typography>
      <br />
      <Grid container>
        <Grid item xs={12} md={6}>
          <Button
            style={style.submit.submitnuevo}
            variant="contained"
            color="primary"
            onClick={nuevoTipoCampana}
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
                  <TableCell align="left">Codigo</TableCell>
                  <TableCell align="left">Tipo de Campaña</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Datar.filter(searchingTerm(term)).map((tipocampana) => (
                  <TableRow key={tipocampana.tipocampanA_Id}>
                    <TableCell align="left">
                      {tipocampana.codtipocampana}
                    </TableCell>
                    <TableCell align="left">
                      {tipocampana.descritipocampana}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="primary"
                        style={style.submit.submitTabla}
                        onClick={() => seleccionarTipoCampana(tipocampana)}
                        label="Administrar"
                      >
                        EDITAR
                      </Button>
                      <Button
                        color="secondary"
                        style={style.submit.submitTabla}
                        onClick={() => mostrarDialogEliminar(tipocampana)}
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
              ¿Desea eliminar el Tipo de Campaña: <br /> {campanaElimNombre}?
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
              onClick={eliminarTipoCampana}
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

export default TipoCampanaTb;

import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import style from "../../Tools/Style";
import SearchIcon from "@material-ui/icons/Search";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { obtenerTiposTareas, eliminarTp } from "../../../actions/TareasAction";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { useStateValue } from "../../../contexto/store";

const TiposTareasTb = (props) => {
  //eslint-disable-next-line
  const [{ openSnackar }, dispatch] = useStateValue();
  const [Datar, setDatar] = useState([]);
  const [term, setTerm] = useState("");
  const [tipoTareaElimId, setTipoTareaElimId] = useState("");
  const [tipoTareaElimNombre, setTipoTareaElimNombre] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [datosCargados, setDatosCargados] = useState(false);

  //OBTENER DATOS AL CARGAR EL COMPONENTE
  useEffect(() => {
    obtenerTiposTareas()
      .then((response) => {
        const Data = response.data;
        setDatar(Data);
        setDatosCargados(true);
      })
      .catch((error) => {
        console.log("Ocurrio un error al obtener los tipos tareas", error);
      });
  }, []);

  //RRR: FUNCION BUSCAR DE TABLA
  function searchingTerm(term) {
    return function (x) {
      return (
        x.descritipotarea.toUpperCase().includes(term.toUpperCase()) || !term
      );
    };
  }

  //RRR: FUNCION ONCLICK(SELECCIONAR TIPO TAREA) DE TABLA
  const modificarTipoTarea = (tipotarea) => {
    props.history.push({
      pathname: "/tipostareas/modificar",
      state: tipotarea,
    });
  };

  //RRR: FUNCION ONCLICK DE BOTON NUEVO
  const nuevoTipoTarea = () => {
    props.history.push("/tipostareas/nuevo");
  };

  //RRR: FUNCION PARA ELIMINAR TIPO DE TAREA
  const eliminarTipoTarea = () => {
    eliminarTp(tipoTareaElimId).then((response) => {
      if (response.status === 200) {
        window.location.reload();
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Se Elimino exitosamente el Tipo de Tarea",
          },
        });
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje:
              "El tipo de Tarea ya esta siendo utilizado no se puede eliminar ",
          },
        });
      }
    });
  };
  //FERNANDO COLUCCI
  //MOSTRAR DIALOGO DE CONFIRMACION PARA ELIMINAR
  const mostrarDialogEliminar = (tipotareaelim) => {
    setTipoTareaElimNombre(tipotareaelim.descritipotarea);
    setOpenDialog(true);
    setTipoTareaElimId(tipotareaelim.tipotareA_Id);
  };

  const dialogHandleCloseX = (e) => {
    setOpenDialog(false);
  };

  return (
    <Container component="main" justify="center">
      <br />
      <Typography align="center" component="h1" variant="h6">
        Gestion de Tipos de Tareas
      </Typography>
      <br />
      <Grid container>
        <Grid item xs={12} md={6}>
          <Button
            style={style.submit.submitnuevo}
            variant="contained"
            color="primary"
            onClick={nuevoTipoTarea}
          >
            Nuevo
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <br />

          <Grid container  alignItems="flex-end" direction='row'>
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
                  <TableCell align="left">Tipo de Tarea</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Datar.filter(searchingTerm(term)).map((tipotarea) => (
                  <TableRow key={tipotarea.tipotareA_Id}>
                    <TableCell align="left">{tipotarea.codtipotarea}</TableCell>
                    <TableCell align="left">
                      {tipotarea.descritipotarea}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="primary"
                        style={{ backgroundColor: "blue", marginRight: "5px" }}
                        onClick={() => modificarTipoTarea(tipotarea)}
                        variant="contained"
                      >
                        Modificar
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: "red" }}
                        onClick={() => mostrarDialogEliminar(tipotarea)}
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
              ¿Desea eliminar el Tipo de Campaña: <br /> {tipoTareaElimNombre}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={dialogHandleCloseX}
              color="secondary"
              style={{ backgroundColor: "blue" }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={eliminarTipoTarea}
              color="primary"
              style={{ backgroundColor: "green" }}
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  );
};

export default TiposTareasTb;

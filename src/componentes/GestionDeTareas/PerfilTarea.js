import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  TextareaAutosize,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Paper,
} from "@material-ui/core";
import style from "../Tools/Style.js";
import RichTextEditor from "react-rte";
import moment from "moment";
import {
  editarTarea,
  obtenerDireccionesTareas,
  obtenerTelefonosTareas,
  obtenerTareasNotificacion,
  nuevoComentarioDeTarea,
  obtenerTareasCerradas,
} from "../../actions/TareasAction";
import { useStateValue } from "../../contexto/store";
import { useHistory } from "react-router-dom";
import { RegistrarAccion } from "../../actions/AuditoriaAction.js";
import ComentariosDeTareas from "./ComentariosDeTareas.js";
export default function PerfilTarea(props) {
  const mounted = useRef(true);
  const history = useHistory();
  //eslint-disable-next-line
  const [{ openSnackBar, sesionUsuario }, dispatch] = useStateValue();
  const [openDialog, setOpenDialog] = useState(false);
  const [comentario, setComentario] = useState("");
  const [cierre, setCierre] = useState({
    MOTIVODECIERRE: "",
  });
  const [estadoBotonTelefono, setEstadoBotonTelefono] = useState(true);
  const [Datatel, setDatatel] = useState([]);
  const [Datadir, setDatadir] = useState([]);
  const [estadoBotonDirecciones, setEstadoBotonDirecciones] = useState(true);
  const [tarea, setTarea] = useState({
    TAREA_ID: "",
    CODTAREA: 0,
    USUARIOASIGNADO: "",
    CLIENTE_ID: "",
    FECHACREACION: "",
    FECHAVTO: "",
    TIPOTAREA: "",
    NUMTAREA: "",
    CLIENTE: "",
  });
  const [contenido, setContenido] = useState("");
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createValueFromString(contenido, "html")
  );
  const handleChange = (value) => {
    setEditorValue(value);
    setContenido(value.toString("html"));
  };
  const ingresarValoresMemoria = (e) => {
    const{value}=e.target;
    setComentario(value);
  };
  const mostrarDirecciones = () => {
    if (estadoBotonDirecciones === false) {
      setEstadoBotonDirecciones(true);
    } else {
      setEstadoBotonDirecciones(false);
    }
  };
  const mostrarTelefonos = () => {
    if (estadoBotonTelefono === false) {
      setEstadoBotonTelefono(true);
    } else {
      setEstadoBotonTelefono(false);
    }
  };
  //RR: ABRE EL DIALOG DE MOTIVO DE CIERRE
  const dialogHandleClickOpen = () => {
    setOpenDialog(true);
  };
  //RR: CIERRA EL DIALOG DE MOTIVO DE CIERRE
  const dialogHandleClose = () => {
    setOpenDialog(false);
    setCierre({
      MOTIVODECIERRE: "",
    });
  };
  //RR: FUNCION PARA BOTON CERRAR Y NUEVO
  const cerrarTareaYNueva = (e) => {
    if (contenido !== "") {
      e.preventDefault();
      let fecha = moment().format().toString().substr(0, 16) + ":00";
      const id = tarea.TAREA_ID;
      const objetoCierre = {
        COMPLETADO: fecha,
        MOTIVOCANCELACION: contenido,
      };
      editarTarea(id, objetoCierre).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: true,
              mensaje: "Se cerro exitosamente la Tarea",
            },
          });
          let objetoNoti = {
            USUARIOASIGNADO: sesionUsuario.usuario.id,
            UserName: sesionUsuario.usuario.userName,
          };
          if (
            props.location.state.presupuesto === null ||
            props.location.state.presupuesto === undefined
          ) {
            obtenerTareasNotificacion(objetoNoti);
            obtenerTareasCerradas(objetoNoti);
            dialogHandleClose();
            setTarea({
              TAREA_ID: "",
              CODTAREA: 0,
              USUARIOASIGNADO: "",
              CLIENTE_ID: tarea.CLIENTE_ID,
              FECHACREACION: "",
              FECHAVTO: "",
              TIPOTAREA: "",
              NUMTAREA: "",
              CLIENTE: "",
            });
            setCierre({
              MOTIVODECIERRE: "",
            });
            setContenido("");
            setEditorValue(
              RichTextEditor.createValueFromString(contenido, "html")
            );
            history.push({ pathname: "/nuevaTarea", state: tarea });
          }
        }
      });
    } else {
      dispatch({
        type: "OPEN_SNACKBAR",
        openMensaje: {
          open: true,
          mensaje: "DEBE AGREGAR UN MOTIVO DE CIERRE",
        },
      });
    }
  };
  //RRR: FUNCION PARA CERRAR TAREA
  const cerrarTarea = (e) => {
    if (contenido !== "") {
      e.preventDefault();
      let fecha = moment().format().toString().substr(0, 16) + ":00";
      const id = tarea.TAREA_ID;
      const objetoCierre = {
        COMPLETADO: fecha,
        MOTIVOCANCELACION: contenido,
      };
      editarTarea(id, objetoCierre).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: true,
              mensaje: "Se cerro exitosamente la Tarea",
            },
          });
          let objetoNoti = {
            USUARIOASIGNADO: sesionUsuario.usuario.id,
            UserName: sesionUsuario.usuario.userName,
          };
          obtenerTareasNotificacion(objetoNoti);
          setTarea({
            TAREA_ID: "",
            CODTAREA: 0,
            USUARIOASIGNADO: "",
            CLIENTE_ID: "",
            FECHACREACION: "",
            FECHAVTO: "",
            TIPOTAREA: "",
            NUMTAREA: "",
            CLIENTE: "",
          });
          setCierre({
            MOTIVODECIERRE: "",
          });
          setContenido("");
          setEditorValue(
            RichTextEditor.createValueFromString(contenido, "html")
          );
          let objetoAudi = {
            usuario: sesionUsuario.usuario.nombrecompleto,
            accion: "Modificacion",
            panel: "Gestion de Tareas",
            tabla: "TAREAS",
            filaafectada: props.location.state.TAREA_ID,
            UsuarioId: sesionUsuario.usuario.id,
          };
          RegistrarAccion(objetoAudi);
          dialogHandleClose();
          volver();
        } else {
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: true,
              mensaje: "Errores al intentar guardar ",
            },
          });
        }
      });
    } else {
      dispatch({
        type: "OPEN_SNACKBAR",
        openMensaje: {
          open: true,
          mensaje: "DEBE AGREGAR UN MOTIVO DE CIERRE ",
        },
      });
    }
  };
  const volver = () => {
    props.history.goBack();
  };
  const agregarComentarioATarea =()=>{
    const objetoComentario={
      comentario:comentario,
      TAREA_Id:tarea.TAREA_ID
    }
    nuevoComentarioDeTarea(objetoComentario).then((response)=>{
      if(response.status ===200){
        setComentario('');
      }
    })
  }

  useEffect(() => {
    if (mounted.current) {
      /*RRR: esta es una serie de verificaciones que debe hacer el modulo para 
      identificar si el perfil solicitado es de una tarea con 
      presupuestos o con facturas*/
      setTarea({
        TAREA_ID: props.location.state.tareA_Id,
        CODTAREA: props.location.state.codtarea,
        USUARIOASIGNADO: props.location.state.usuarioasignado,
        CLIENTE_ID:
          props.location.state.cliente !== null
            ? props.location.state.cliente.clientE_Id
            : props.location.state.posiblecliente.posibleclientE_Id,
        FECHACREACION: props.location.state.fechacreacion,
        FECHAVTO: props.location.state.fechavto,
        /*RRR: Este comparador ternario se utiliza por que las tareas que tienen facturas vienen desde una vista 
        no de una consulta directa con entityframework por lo tanto algunos items son string planos y no 
        objetos como devuelve entity a las tablas relacionadas*/
        TIPOTAREA: props.location.state.tipotarea.descritipotarea
          ? props.location.state.tipotarea.descritipotarea
          : props.location.state.tipotarea,
        NUMTAREA: props.location.state.numtarea,
        CLIENTE:
          props.location.state.cliente === null
            ? props.location.state.posiblecliente.nombre +
              " " +
              props.location.state.posiblecliente.apellido
            : props.location.state.cliente.nombre
            ? props.location.state.cliente.nombre +
              " " +
              props.location.state.cliente.apellido
            : props.location.state.cliente,
        CODPRESUPUESTO: props.location.state.presupuesto
          ? props.location.state.presupuesto.codpresupuesto
          : "",
      });
      /*RRR: verifica si la tarea ya esta cerrada para mostrar el motivo de cancelacion
      y ocultarlo en caso de que aun este pendiente de cierre*/
      if (props.location.state.motivocancelacion !== null) {
        setCierre({
          MOTIVODECIERRE: props.location.state.motivocancelacion,
        });
      } else {
        console.log("NO CUMPLIO");
      }

      obtenerTelefonosTareas(props.location.state.tareA_Id).then((response) => {
        const Data = response.data;
        setDatatel(Data);
      });
      obtenerDireccionesTareas(props.location.state.tareA_Id).then(
        (response) => {
          const Data = response.data;
          setDatadir(Data);
        }
      );
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, [props, sesionUsuario]);
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <br></br>
        <Typography component="h1" variant="h6">
          PERFIL DE TAREA
        </Typography>
        <br></br>
        <br></br>
        <form style={style.form}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="CODTAREA"
                value={tarea.CODTAREA}
                fullWidth
                variant="outlined"
                label="CODIGO"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="USUARIOASIGNADO"
                value={tarea.USUARIOASIGNADO}
                fullWidth
                variant="outlined"
                label="USUARIO ASIGNADO"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="FECHACREACION"
                value={tarea.FECHACREACION.substr(-20, 10)}
                fullWidth
                variant="outlined"
                label="FECHA DE CREACION"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="FECHAVTO"
                value={tarea.FECHAVTO.substr(-20, 10)}
                fullWidth
                variant="outlined"
                label="FECHA DE VENCIMIENTO"
              />
            </Grid>
            <Grid item style={style.textarea}>
              <TextField
                multiline
                name="FECHAVTO"
                value={tarea.FECHAVTO.substr(-8, 5)}
                fullWidth
                variant="outlined"
                label="HORA PACTADA"
              />
            </Grid>
            <Grid item style={style.textarea}>
              <TextField
                multiline
                name="CLIENTE"
                value={tarea.CLIENTE}
                fullWidth
                variant="outlined"
                label="CLIENTE"
              />
            </Grid>
            <Grid item style={style.textarea}>
              <TextField
                multiline
                name="TIPOTAREA"
                value={tarea.TIPOTAREA}
                fullWidth
                variant="outlined"
                label="TIPO DE TAREA"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <br />
            <Typography>Detalles:</Typography>
            <br />
            <TextareaAutosize
              name="NUMTAREA"
              value={tarea.NUMTAREA}
              style={style.textarea}
              variant="outlined"
              aria-label="minimum height"
              rowsMin={4}
              placeholder="Detalles"
              label="Detalles"
            />
          </Grid>
          <br></br>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={mostrarTelefonos}
          >
            Telefonos
          </Button>
          <br />
          {estadoBotonTelefono === true ? (
            <TableContainer component={Paper} align="center">
              <Table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Telefonos</TableCell>
                    <TableCell align="left">Detalles</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Datatel.map((telefono) => (
                    <TableRow key={telefono.telefonotareA_Id}>
                      <TableCell align="left">
                        {telefono.descritelefonotarea}
                      </TableCell>
                      <TableCell align="left">
                        {telefono.detallestelefonotarea}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
          <br />
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={mostrarDirecciones}
            style={style.notifications}
          >
            Direcciones
          </Button>
          <br />
          {estadoBotonDirecciones === true ? (
            <TableContainer component={Paper} align="center">
              <Table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Direcciones</TableCell>
                    <TableCell align="left">Detalles</TableCell>
                    <TableCell align="left">Barrios</TableCell>
                    <TableCell align="left">Ciudades</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Datadir.map((direccion) => (
                    <TableRow key={direccion.direccioN_Id}>
                      <TableCell align="left">
                        {direccion.descridireccion}
                      </TableCell>
                      <TableCell align="left">
                        {direccion.detallesdireccion}
                      </TableCell>
                      <TableCell align="left">
                        {direccion.barrio.describarrio}
                      </TableCell>
                      <TableCell align="left">
                        {direccion.ciudad.descriciudad}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
          <br />
          {props.location.state.motivocancelacion ? (
            <Grid container>
              <Grid item xs={12} md={12}>
                <Typography>Motivo de Cierre:</Typography>
                <br />
                <RichTextEditor
                  placeholder="Escribir aqui..."
                  value={RichTextEditor.createValueFromString(
                    cierre.MOTIVODECIERRE,
                    "html"
                  )}
                  id="body-text"
                  name="bodyText"
                  type="string"
                  rootStyle={{ width: "100%" }}
                  editorStyle={{ height: 200 }}
                  readOnly={true}
                />
              </Grid>
              <br />
            </Grid>
          ) : null}
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Grid item xs={12} md={12}>
                <Typography>Comentarios:</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <ComentariosDeTareas tareaId={tarea.TAREA_ID} comentario={comentario} />
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="comentario"
                value={comentario}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Agregar un comentario"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button color="primary" variant="contained" onClick={agregarComentarioATarea}>
                Comentar
              </Button>
            </Grid>
          </Grid>
          {/*RRR: se verifica si la persona que entra al perfil es el creador de la tarea
          puesto a que el unico que puede cerrar una tarea es el propietaro(asignado)
          y nadie mas
          */}
          {props.location.state.TipoVisitante === "Propietario" &&
          props.location.state.completado === null ? (
            <Grid container spacing={4} justify="center">
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  style={style.submit}
                  onClick={dialogHandleClickOpen}
                >
                  Cerrar Tarea
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  onClick={volver}
                  variant="contained"
                  color="primary"
                  style={style.submit}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container justify="center">
              <Grid item xs={12} md={12}>
                <br />
                <Button
                  onClick={volver}
                  variant="contained"
                  color="primary"
                  style={style.submit}
                >
                  Volver
                </Button>
              </Grid>
            </Grid>
          )}
        </form>
      </div>
      <div notranslate="true">
        <Dialog
          open={openDialog}
          onClose={dialogHandleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Alerta</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Debe agregar un motivo del cierre.
            </DialogContentText>
            <RichTextEditor
              placeholder="Escribir aqui..."
              value={editorValue}
              onChange={handleChange}
              id="body-text"
              name="bodyText"
              type="string"
              rootStyle={{ width: 500 }}
              editorStyle={{ height: 200 }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={dialogHandleClose}
              variant="contained"
              color="secondary"
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={cerrarTareaYNueva}
              color="primary"
            >
              Cerrar y Crear Nueva Tarea
            </Button>
            <Button variant="contained" onClick={cerrarTarea} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  );
}

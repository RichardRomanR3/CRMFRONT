import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  IconButton,
  InputLabel,
  Select,
  Button,
  FormControl,
  MenuItem,
  TextareaAutosize,
  Radio,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import style from '../Tools/Style.js';
import ModalClientes from '../GestionDeClientes/ModalClientes.js';
import DateFnsUtils from '@date-io/date-fns';
import { produce } from 'immer';
import { generate } from 'shortid';
import esLocale from 'date-fns/locale/es';
import {
  obtenerTareasNotificacion,
  obtenerTiposTareas,
  registrarTarea,
} from '../../actions/TareasAction.js';
import { useStateValue } from '../../contexto/store.js';
import SearchIcon from '@material-ui/icons/Search.js';
import {
  obtenerClientes,
  obtenerDireccionesCliente,
  obtenerPosiblesClientes,
  obtenerTelefonosCliente,
} from '../../actions/ClientesAction.js';
import { RegistrarAccion } from '../../actions/AuditoriaAction.js';
export default function NuevaTarea(props) {
  const mounted = useRef(true);
  const [datosCargados,setDatosCargados]=useState(false);
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [tarea, setTarea] = useState({
    TAREA_ID: '',
    CODTAREA: 0,
    USUARIOASIGNADO: '',
    CLIENTE_ID: '',
    FECHACREACION: '',
    FECHAVTO: '',
    TIPOTAREA: '',
    NUMTAREA: '',
    CLIENTE: '',
  });
  const [usuario, setUsuario] = useState('');
  const [userNameUsuarioAsignado, setUserNameUsuarioAsignado] = useState('');
  const [fechaSeleccionadaFc, setFechaSeleccionadaFc] = useState(new Date());
  const [fechaSeleccionadaFv, setFechaSeleccionadaFv] = useState(new Date());
  const [horaSeleccionadaHi, setHoraSeleccionadaHi] = useState(new Date());
  const [modalBuscar, setModalBuscar] = useState(false);
  const [tipotarea, setTipoTarea] = useState('');
  const [Datatt, setDatatt] = useState([]);
  const [Datacl, setDatacl] = useState([]);
  const [telefonosTareas, setTelefonosTareas] = useState([]);
  const [DataTelCli, setDataTelCli] = useState([]);
  const [direccionesTareas, setDireccionesTareas] = useState([]);
  const [descris, setDescris] = useState([]);
  const [Datadire, setDatadire] = useState([]);
  const [tareaSinDatos, setTareaSinDatos] = useState(false);
  const [radioValor, setRadioValor] = useState('clientes');
  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setTarea((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };
  const abrirModal = () => {
    setModalBuscar(true);
  };
  const selectTipoTareahandleChange = (event) => {
    setTipoTarea(event.target.value);
  };

  const cerrarModal = () => {
    setModalBuscar(false);
  };
  const crearTarea = (e) => {
    e.preventDefault();
    if (usuario === '') {
      dispatch({
        type: 'OPEN_SNACKBAR',
        openMensaje: {
          open: true,
          mensaje: 'Debe Seleccionar el Usuario A quien va a asignar la tarea ',
        },
      });
    } else {
      let fechac =
        fechaSeleccionadaFc.getFullYear() +
        '-' +
        (fechaSeleccionadaFc.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        fechaSeleccionadaFc.getDate().toString().padStart(2, '0') +
        'T' +
        fechaSeleccionadaFc.getHours().toString().padStart(2, '0') +
        ':' +
        fechaSeleccionadaFc.getMinutes().toString().padStart(2, '0') +
        ':00';
      let fechav =
        fechaSeleccionadaFv.getFullYear() +
        '-' +
        (fechaSeleccionadaFv.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        fechaSeleccionadaFv.getDate().toString().padStart(2, '0') +
        'T' +
        horaSeleccionadaHi.getHours().toString().padStart(2, '0') +
        ':' +
        horaSeleccionadaHi.getMinutes().toString().padStart(2, '0') +
        ':00';
      let objetoTarea = {};
      if (
        telefonosTareas[0] === undefined &&
        direccionesTareas[0] === undefined
      ) {
        objetoTarea = {
          CODTAREA: parseInt(tarea.CODTAREA),
          ASIGNADOPOR: sesionUsuario.usuario.nombrecompleto,
          USUARIOASIGNADO: usuario,
          FECHACREACION: fechac,
          FECHAVTO: fechav,
          CLIENTE_ID: tarea.CLIENTE_ID,
          TIPOTAREA_ID: tipotarea,
          NUMTAREA: tarea.NUMTAREA,
          UserName: userNameUsuarioAsignado,
        };
      } else if (
        telefonosTareas[0] !== undefined &&
        direccionesTareas[0] === undefined
      ) {
        if (
          telefonosTareas[0].DESCRITELEFONO !== '' ||
          telefonosTareas[0].DETALLESTELEFONO !== ''
        ) {
          objetoTarea = {
            CODTAREA: parseInt(tarea.CODTAREA),
            ASIGNADOPOR: sesionUsuario.usuario.nombrecompleto,
            USUARIOASIGNADO: usuario,
            FECHACREACION: fechac,
            FECHAVTO: fechav,
            CLIENTE_ID: tarea.CLIENTE_ID,
            TIPOTAREA_ID: tipotarea,
            NUMTAREA: tarea.NUMTAREA,
            TELEFONOSTAREAS: telefonosTareas,
            UserName: userNameUsuarioAsignado,
          };
        } else {
          objetoTarea = {
            CODTAREA: parseInt(tarea.CODTAREA),
            ASIGNADOPOR: sesionUsuario.usuario.nombrecompleto,
            USUARIOASIGNADO: usuario,
            FECHACREACION: fechac,
            FECHAVTO: fechav,
            CLIENTE_ID: tarea.CLIENTE_ID,
            TIPOTAREA_ID: tipotarea,
            NUMTAREA: tarea.NUMTAREA,
            UserName: userNameUsuarioAsignado,
          };
        }
      } else if (
        telefonosTareas[0] === undefined &&
        direccionesTareas[0] !== undefined
      ) {
        if (
          direccionesTareas[0].DESCRIDIRECCION !== '' ||
          direccionesTareas[0].DETALLESDIRECCION !== ''
        ) {
          objetoTarea = {
            CODTAREA: parseInt(tarea.CODTAREA),
            ASIGNADOPOR: sesionUsuario.usuario.nombrecompleto,
            USUARIOASIGNADO: usuario,
            FECHACREACION: fechac,
            FECHAVTO: fechav,
            CLIENTE_ID: tarea.CLIENTE_ID,
            TIPOTAREA_ID: tipotarea,
            NUMTAREA: tarea.NUMTAREA,
            DIRECCIONESTAREAS: direccionesTareas,
            UserName: userNameUsuarioAsignado,
          };
        } else {
          objetoTarea = {
            CODTAREA: parseInt(tarea.CODTAREA),
            ASIGNADOPOR: sesionUsuario.usuario.nombrecompleto,
            USUARIOASIGNADO: usuario,
            FECHACREACION: fechac,
            FECHAVTO: fechav,
            CLIENTE_ID: tarea.CLIENTE_ID,
            TIPOTAREA_ID: tipotarea,
            NUMTAREA: tarea.NUMTAREA,
            UserName: userNameUsuarioAsignado,
          };
        }
      } else {
        objetoTarea = {
          CODTAREA: parseInt(tarea.CODTAREA),
          ASIGNADOPOR: sesionUsuario.usuario.nombrecompleto,
          USUARIOASIGNADO: usuario,
          FECHACREACION: fechac,
          FECHAVTO: fechav,
          CLIENTE_ID: tarea.CLIENTE_ID,
          TIPOTAREA_ID: tipotarea,
          NUMTAREA: tarea.NUMTAREA,
          TELEFONOSTAREAS: telefonosTareas,
          DIRECCIONESTAREAS: direccionesTareas,
          UserName: userNameUsuarioAsignado,
        };
      }
     if (radioValor === 'posiblesclientes') {
        objetoTarea['POSIBLECLIENTEId'] = tarea.CLIENTE_ID;
        delete tarea['CLIENTE_ID'];
      }
      //FORMA ALTERNATIVA DE CARGAR DATOS DENTRO DE UN OBJETO, PUEDE SER UTILIZADA PARA NO REPETIR LAS CARGAS DE DATOS EN UN OBJETO
      objetoTarea['AsignadorId'] = sesionUsuario.usuario.id;
      registrarTarea(objetoTarea).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje: 'Se creo exitosamente la Tarea',
            },
          });
          let objetoNoti;
          //eslint-disable-next-line
          {
            props.location === 'asignarTarea' ||
            (props.location.state !== undefined &&
              props.location.state.Modal === true)
              ? (objetoNoti = {
                  USUARIOASIGNADO: sesionUsuario.usuario.id,
                  UserName: userNameUsuarioAsignado,
                })
              : (objetoNoti = {
                  USUARIOASIGNADO: sesionUsuario.usuario.id,
                  UserName: sesionUsuario.usuario.userName,
                });
          }
          obtenerTareasNotificacion(objetoNoti);
          setTarea({
            TAREA_ID: '',
            CODTAREA: 0,
            USUARIOASIGNADO: '',
            CLIENTE_ID: '',
            FECHACREACION: '',
            FECHAVTO: '',
            TIPOTAREA: '',
            NUMTAREA: '',
            CLIENTE: '',
          });
          setTelefonosTareas([]);
          setDireccionesTareas([]);
          setUserNameUsuarioAsignado('');
          setUsuario(sesionUsuario.usuario.nombrecompleto);
          let objetoAudi = {
            usuario: sesionUsuario.usuario.nombrecompleto,
            accion: 'Registro',
            panel: 'Gestion de Tareas',
            tabla: 'TAREAS',
            filaafectada: 'NUEVO REGISTRO',
            UsuarioId: sesionUsuario.usuario.id,
          };
          RegistrarAccion(objetoAudi);
        } else if (response.status === 400) {
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje:
                'Todos los campos son obligatorios asegurese de llenarlos ',
            },
          });
        } else {
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje: 'Errores al intentar guardar ',
            },
          });
        }
      });
    }
  };

  const volver = () => {
    setTarea({
      TAREA_ID: '',
      CODTAREA: 0,
      USUARIOASIGNADO: '',
      CLIENTE_ID: '',
      FECHACREACION: '',
      FECHAVTO: '',
      TIPOTAREA: '',
      NUMTAREA: '',
      CLIENTE: '',
    });
    setHoraSeleccionadaHi(new Date());
    setTelefonosTareas([]);
    setDireccionesTareas([]);
    if (props.history !== undefined) {
      props.history.goBack();
    }
  };
  const seleccionarCliente = (cliente) => {
    const id = cliente.clientE_Id;
    setTarea({
      TAREA_ID: tarea.TAREA_ID,
      CODTAREA: tarea.CODTAREA,
      NUMTAREA: tarea.NUMTAREA,
      CLIENTE_ID: cliente.clientE_Id
        ? cliente.clientE_Id
        : cliente.posibleclientE_Id,
      USUARIOASIGNADO: tarea.USUARIOASIGNADO,
      FECHACREACION: tarea.FECHACREACION,
      FECHAVTO: tarea.FECHAVTO,
      TIPOTAREA: tarea.TIPOTAREA,
      CLIENTE: cliente.nombre + ' ' + cliente.apellido,
    });
    obtenerTelefonosCliente(id).then((response) => {
      const Data = response.data;
      setDataTelCli(Data);
    });
    obtenerDireccionesCliente(id).then((response) => {
      const Data = response.data;
      setDatadire(Data);
    });
    setModalBuscar(false);
  };

  const radioValorHandleChange = (event) => {
    setRadioValor(event.target.value);
  };

  useEffect(() => {
    /*RRR: Verifica si se esta llamando al componente desde otro o si se le esta enviando datos desde el history
      para luego habilitar el textfiel de seleccionar usuario para adignar tarea*/
    if (props.location !== 'asignarTarea') {
      setUsuario(sesionUsuario.usuario.nombrecompleto);
      setUserNameUsuarioAsignado(sesionUsuario.usuario.userName);
    }
    switch (radioValor) {
      case 'clientes':
        setDatosCargados(false);
        obtenerClientes().then((response) => {
          const Data = response.data;
          setDatacl(Data);
          setDatosCargados(true);
        });
        break;
      case 'posiblesclientes':
        setDatosCargados(false);
        obtenerPosiblesClientes(sesionUsuario.usuario.id).then((response) => {
          const Data = response.data;
          setDatacl(Data);
          setDatosCargados(true);
        });

        break;
      default:
        console.log('ERROR EN RADIO');
    }
    if (mounted.current) {
      if (props.location.state === undefined) {
        setTareaSinDatos(true);
        /*RRR:PRESUPUESTOS/TAREA-02 verifica si la solicitud de nueva tarea viene desde presupuestos
             para mostrar los datos del presupuesto y del cliente en la tarea a aser creada*/
      } else {
        /*RRR:si no, significa que la solicitud viene desde una tarea cerrada sin facturas y
            se quiere crear otra y recoge los datos*/
        setTarea({
          TAREA_ID: tarea.TAREA_ID,
          CODTAREA: tarea.CODTAREA,
          NUMTAREA: tarea.NUMTAREA,
          CLIENTE_ID: props.location.state.CLIENTE_ID,
          USUARIOASIGNADO: props.location.state.USUARIOASIGNADO,
          FECHACREACION: tarea.FECHACREACION,
          FECHAVTO: tarea.FECHAVTO,
          TIPOTAREA: tarea.TIPOTAREA,
          CLIENTE: props.location.state.CLIENTE
        });
      }
      obtenerTiposTareas().then((response) => {
        const Data = response.data;
        setDatatt(Data);
      });
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, [sesionUsuario, tarea, props, radioValor]);
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <br></br>
          <Typography component="h1" variant="h6">
            NUEVA TAREA
          </Typography>
        <br></br>
        <br></br>
        <form style={style.form}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                name="CODTAREA"
                multiline
                value={tarea.CODTAREA}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Codigo"
              />
            </Grid>

            {props.location === 'asignarTarea' ||
            (props.location.state !== undefined &&
              props.location.state.Modal === true) ? (
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="combo-box-demo"
                  options={
                    props.DataUsu ? props.DataUsu : props.location.state.DataUsu
                  }
                  getOptionLabel={(DataUsu) => DataUsu.nombrecompleto}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Buscar Usuarios"
                      variant="outlined"
                    />
                  )}
                  onChange={(e, value) => {
                    if (value === null) {
                      setUsuario('');
                    } else {
                      setUsuario(value.nombrecompleto);
                      setUserNameUsuarioAsignado(value.userName);
                    }
                  }}
                />
              </Grid>
            ) : (
              <Grid item xs={12} md={6}>
                <TextField
                  name="usuario"
                  value={usuario}
                  fullWidth
                  variant="outlined"
                  multiline
                  label="Usuario"
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disabled={true}
                  value={fechaSeleccionadaFc}
                  onChange={setFechaSeleccionadaFc}
                  margin="normal"
                  id="fecha-creacion-id"
                  label="Fecha de Creacion"
                  format="dd/MM/yyyy"
                  fullWidth
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                <KeyboardDatePicker
                  value={fechaSeleccionadaFv}
                  onChange={setFechaSeleccionadaFv}
                  margin="normal"
                  id="fecha-vencimiento-id"
                  label="Fecha de Vencimiento"
                  format="dd/MM/yyyy"
                  fullWidth
                  multiline
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid style={style.timer}>
              <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                <KeyboardTimePicker
                  fullWidth
                  ampm={false}
                  id="time-picker1"
                  label="Hora de Alerta"
                  value={horaSeleccionadaHi}
                  multiline
                  onChange={setHoraSeleccionadaHi}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            {tareaSinDatos ? (
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography>Tarea Para :</Typography>
                <Typography component={'div'}>
                  Cliente:
                  <Radio
                    checked={radioValor === 'clientes'}
                    onChange={radioValorHandleChange}
                    value="clientes"
                    color="primary"
                  />
                  Posible Cliente :
                  <Radio
                    checked={radioValor === 'posiblesclientes'}
                    onChange={radioValorHandleChange}
                    value="posiblesclientes"
                    color="primary"
                  />
                </Typography>
              </Grid>
            ) : null}
            <IconButton
              onClick={abrirModal}
              style={style.iconbutton}
              aria-label="buscar"
            >
              <SearchIcon />
            </IconButton>
            <Grid style={style.textTarea}>
              <TextField
                disabled={true}
                name="CLIENTE"
                value={tarea.CLIENTE}
                multiline
                fullWidth
                variant="outlined"
                label="CLIENTE"
              />
            </Grid>
            <FormControl variant="outlined" style={style.Select.tareatipotarea}>
              <InputLabel style={style.Select}>Tipo Tarea</InputLabel>
              <Select
                value={tipotarea}
                onChange={selectTipoTareahandleChange}
                label="Tipo Tarea"
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {Datatt.map((tipotarea) => (
                  <MenuItem
                    key={tipotarea.tipotareA_Id}
                    value={tipotarea.tipotareA_Id}
                  >
                    {tipotarea.descritipotarea}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <br></br>
          <Grid item xs={12} md={6}>
            <Typography>Telefonos:</Typography>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setTelefonosTareas((telefonoActual) => [
                    ...telefonoActual,
                    {
                      CODTELEFONOTAREA: generate(),
                      DESCRITELEFONOTAREA: '',
                      DETALLESTELEFONOTAREA: '',
                    },
                  ]);
                }}
                style={style.submit}
              >
                +
              </Button>
            </Grid>
          </Grid>
          <br></br>
          {telefonosTareas.map((t, index) => {
            return (
              <div key={t.CODTELEFONOTAREA}>
                <FormControl variant="outlined" style={style.Selecttel}>
                  <InputLabel>Telefonos</InputLabel>
                  <Select
                    onChange={(e) => {
                      const DESCRITELEFONOTAREA = e.target.value;
                      setTelefonosTareas((telefonoActual) =>
                        produce(telefonoActual, (v) => {
                          v[index].DESCRITELEFONOTAREA = DESCRITELEFONOTAREA;
                        })
                      );
                    }}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={t.DESCRITELEFONOTAREA}
                    label="Telefonos"
                  >
                    <MenuItem value="">
                      <em>Ninguna</em>
                    </MenuItem>
                    {DataTelCli.map((telefono) => (
                      <MenuItem
                        key={telefono.telefonO_Id}
                        value={telefono.descritelefono}
                      >
                        {telefono.descritelefono +
                          ' (' +
                          telefono.detallestelefono +
                          ')'}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  name="DETALLESTELEFONOTAREA"
                  value={t.DETALLESTELEFONOTAREA}
                  fullWidth
                  onChange={(e) => {
                    const DETALLESTELEFONOTAREA = e.target.value;
                    setTelefonosTareas((telefonoActual) =>
                      produce(telefonoActual, (v) => {
                        v[index].DETALLESTELEFONOTAREA = DETALLESTELEFONOTAREA;
                      })
                    );
                  }}
                  variant="outlined"
                  label="Detalles"
                  style={style.textDet}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  style={style.btnTel}
                  onClick={() => {
                    setTelefonosTareas((telefonoActual) =>
                      telefonoActual.filter(
                        (x) => x.CODTELEFONOTAREA !== t.CODTELEFONOTAREA
                      )
                    );
                  }}
                >
                  X
                </Button>
              </div>
            );
          })}
          <Grid item xs={12} md={6}>
            <Typography>Direcciones:</Typography>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setDireccionesTareas((direccionActual) => [
                    ...direccionActual,
                    {
                      CODDIRECCION: generate(),
                      DETALLESDIRECCION: '',
                      DESCRIDIRECCION: '',
                      CIUDAD: {
                        CIUDAD_Id: '',
                      },
                      BARRIO: {
                        BARRIO_Id: '',
                      },
                    },
                  ]);
                  setDescris((descriActual) => [
                    ...descriActual,
                    {
                      BARRIOS: '',
                      CIUDADES: '',
                    },
                  ]);
                }}
                style={style.submit}
              >
                +
              </Button>
            </Grid>
          </Grid>
          <br></br>
          {
            (descris,
            direccionesTareas.map((d, index) => {
              return (
                <div key={d.CODDIRECCION}>
                  <Grid item>
                    <FormControl variant="outlined" style={style.SelectDi}>
                      <InputLabel>Direcciones</InputLabel>
                      <Select
                        onChange={(e) => {
                          const DESCRIDIRECCION = e.target.value;
                          setDireccionesTareas((direccionActual) =>
                            produce(direccionActual, (v) => {
                              v[index].DESCRIDIRECCION =
                                DESCRIDIRECCION.descridireccion;
                              v[index].CIUDAD.CIUDAD_Id =
                                DESCRIDIRECCION.ciudad.ciudaD_Id;
                              v[index].BARRIO.BARRIO_Id =
                                DESCRIDIRECCION.barrio.barriO_Id;
                            })
                          );

                          setDescris((descriActual) =>
                            produce(descriActual, (v) => {
                              v[index].CIUDADES =
                                DESCRIDIRECCION.ciudad.descriciudad;
                              v[index].BARRIOS =
                                DESCRIDIRECCION.barrio.describarrio;
                            })
                          );
                        }}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={d.DESCRIDIRECCION.descridireccion}
                        label="Direcciones"
                      >
                        {Datadire.map((direccion) => (
                          <MenuItem
                            key={direccion.direccioN_Id}
                            value={direccion}
                          >
                            {direccion.descridireccion}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <br />
                  <TextField
                    label="Barrio"
                    variant="outlined"
                    value={descris[index].BARRIOS}
                  />
                  <TextField
                    label="Ciudad"
                    variant="outlined"
                    value={descris[index].CIUDADES}
                  />
                  <Grid item>
                    <TextField
                      name="DETALLESDIRECCION"
                      value={d.DETALLESDIRECCION}
                      fullWidth
                      onChange={(e) => {
                        const DETALLESDIRECCION = e.target.value;
                        setDireccionesTareas((direccionActual) =>
                          produce(direccionActual, (v) => {
                            v[index].DETALLESDIRECCION = DETALLESDIRECCION;
                          })
                        );
                      }}
                      variant="outlined"
                      label="Detalles"
                      style={style.textDir}
                    />
                  </Grid>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={style.btnTel}
                    onClick={() => {
                      setDireccionesTareas((direccionActual) =>
                        direccionActual.filter(
                          (x) => x.CODDIRECCION !== d.CODDIRECCION
                        )
                      );
                      setDescris((direccionActual) =>
                        direccionActual.filter(
                          (x) => x.CIUDADES !== descris.CIUDADES,
                          (y) => y.BARRIOS !== descris.BARRIOS
                        )
                      );
                    }}
                  >
                    X
                  </Button>
                </div>
              );
            }))
          }
          <br></br>
          <Grid>
            <TextareaAutosize
              name="NUMTAREA"
              value={tarea.NUMTAREA}
              onChange={ingresarValoresMemoria}
              style={style.textarea}
              variant="outlined"
              rowsMin={4}
              placeholder="Detalles"
            />
          </Grid>
          <br></br>
          <Grid container spacing={4} justify="center">
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={crearTarea}
                style={style.submit}
              >
                Crear Tarea
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
          <Grid container direction="row" justify="center" alignItems="center">
            <ModalClientes
              data={Datacl}
              open={modalBuscar}
              handleClose={cerrarModal}
              seleccionarCliente={seleccionarCliente}
              datosCargados={datosCargados}
            />
          </Grid>
        </form>
      </div>
    </Container>
  );
}

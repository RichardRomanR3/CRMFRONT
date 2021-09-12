import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  TablePagination,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import style from '../../Tools/Style';
import { useStateValue } from '../../../contexto/store';
import { withRouter } from 'react-router-dom';
import {
  actualizarCliente,
  obtenerTelefonosCliente,
  obtenerDireccionesCliente,
  deleteTelefono,
  deleteDireccion,
  obtenerBarrios,
  obtenerCiudades,
  ObtenerTareasRelacionadasAlCliente,
  deleteRed,
  obtenerRedesCliente,
} from '../../../actions/ClientesAction';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { produce } from 'immer';
import { generate } from 'shortid';
import moment from 'moment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import { obtenerSugerencias } from '../../../actions/SugerenciasAction';
import { useHistory } from 'react-router-dom';
import { RegistrarAccion } from '../../../actions/AuditoriaAction';
import { obtenerCampanas } from '../../../actions/CampanasAction';
// FERNADO COLUCCI
const PerfilCliente = (props) => {
  const [valorSelect, setValorSelect] = useState('');
  const [campana, setCampana] = useState('');
  const classes = useStyles();
  const [barrioCiu, setBarrioCiu] = useState('');
  const [estadoBotonRedes, setEstadoBotonRedes] = useState(true);
  const [redes, setRedes] = useState([]);
  const [DataCiu, setDataCiu] = useState([]);
  const [DataBa, setDataBa] = useState([]);
  const [listaTareasCliente, setListaTareasCliente] = useState([]);
  const [listaSugerenciasCliente, setListaSugerenciasCliente] = useState([]);
  const [telefonos, setTelefonos] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const datosCliente = props.location.state;
  const [cliente, setCliente] = useState({
    apellido: '',
    ci: '',
    ruc: '',
    nombre: '',
    profesionorubro: '',
    hobby: '',
    observaciones: '',
  });
  const [estadoBotonTelefono, setEstadoBotonTelefono] = useState(true);
  const [estadoBotonDirecciones, setEstadoBotonDirecciones] = useState(true);
  const [estadoBotonTareas, setEstadoBotonTareas] = useState(false);
  const [estadoBotonSugerencias, setEstadoBotonSugerencias] = useState(false);
  const [Datatel, setDatatel] = useState([]);
  const [Datadir, setDatadir] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const history = useHistory();
  const [DataRedes, setDataRedes] = useState([]);
  const [Datar, setDatar] = useState([]);
  const eliminarRed = (red) => {
    const id = red.reD_Id;
    deleteRed(id).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Red Social eliminada',
          },
        });
        const id = datosCliente.cliente.clientE_Id;
        obtenerRedesCliente(id).then((response) => {
          const Data = response.data;
          setDataRedes(Data);
        });
      } else {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Errores al intentar eliminar ',
          },
        });
      }
    });
  };
  const eliminarTelefono = (telefono) => {
    const id = telefono.telefonO_Id;
    deleteTelefono(id).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Telefono eliminado',
          },
        });
        const id = datosCliente.clientE_Id;
        obtenerTelefonosCliente(id).then((response) => {
          const Data = response.data;
          setDatatel(Data);
        });
      } else {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Errores al intentar eliminar ',
          },
        });
      }
    });
  };

  const eliminarDireccion = (direccion) => {
    const id = direccion.direccioN_Id;
    deleteDireccion(id).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Direccion eliminada',
          },
        });
        const id = datosCliente.clientE_Id;
        obtenerDireccionesCliente(id).then((response) => {
          const Data = response.data;
          setDatadir(Data);
        });
      } else {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Errores al intentar eliminar ',
          },
        });
      }
    });
  };

  const mostrarTelefonos = () => {
    if (estadoBotonTelefono === false) {
      setEstadoBotonTelefono(true);
    } else {
      setEstadoBotonTelefono(false);
    }
  };

  const mostrarDirecciones = () => {
    if (estadoBotonDirecciones === false) {
      setEstadoBotonDirecciones(true);
    } else {
      setEstadoBotonDirecciones(false);
    }
  };

  const mostrarTareas = () => {
    if (estadoBotonTareas === false) {
      setEstadoBotonTareas(true);
    } else {
      setEstadoBotonTareas(false);
    }
  };
  const mostrarSugerencias = () => {
    if (estadoBotonSugerencias === false) {
      setEstadoBotonSugerencias(true);
    } else {
      setEstadoBotonSugerencias(false);
    }
  };

  const mostrarRedes = () => {
    if (estadoBotonRedes === false) {
      setEstadoBotonRedes(true);
    } else {
      setEstadoBotonRedes(false);
    }
  };
  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setCliente((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };
  const selectCampanahandleChange = (event) => {
    setValorSelect(event.target.value);
    setCampana(event.target.value);
  };

  const ActualizarCliente = (e) => {
    e.preventDefault();
    const id = datosCliente.clientE_Id;
    let objetoClienteModificado = {};
    if (
      telefonos[0] === undefined &&
      direcciones[0] === undefined &&
      redes[0] === undefined
    ) {
      objetoClienteModificado = {
        NOMBRE: cliente.nombre,
        APELLIDO: cliente.apellido,
        CI: cliente.ci,
        RUC: cliente.ruc,
        PROFESIONORUBRO: cliente.profesionorubro,
        HOBBY: cliente.hobby,
        FECHULTMOD: moment().format(),
        OBSERVACIONES: cliente.observaciones,
      };
    } else if (
      telefonos[0] !== undefined &&
      direcciones[0] === undefined &&
      redes[0] === undefined
    ) {
      if (
        telefonos[0].DESCRITELEFONO !== '' ||
        telefonos[0].DETALLESTELEFONO !== ''
      ) {
        objetoClienteModificado = {
          NOMBRE: cliente.nombre,
          APELLIDO: cliente.apellido,
          CI: cliente.ci,
          RUC: cliente.ruc,
          PROFESIONORUBRO: cliente.profesionorubro,
          HOBBY: cliente.hobby,
          FECHULTMOD: moment().format(),
          TELEFONOS: telefonos,
          OBSERVACIONES: cliente.observaciones,
        };
      } else {
        objetoClienteModificado = {
          NOMBRE: cliente.nombre,
          APELLIDO: cliente.apellido,
          CI: cliente.ci,
          RUC: cliente.ruc,
          PROFESIONORUBRO: cliente.profesionorubro,
          HOBBY: cliente.hobby,
          FECHULTMOD: moment().format(),
          OBSERVACIONES: cliente.observaciones,
        };
      }
    } else if (
      telefonos[0] === undefined &&
      direcciones[0] !== undefined &&
      redes[0] === undefined
    ) {
      if (
        direcciones[0].DESCRIDIRECCION !== '' ||
        direcciones[0].DETALLESDIRECCION !== ''
      ) {
        objetoClienteModificado = {
          NOMBRE: cliente.nombre,
          APELLIDO: cliente.apellido,
          CI: cliente.ci,
          RUC: cliente.ruc,
          PROFESIONORUBRO: cliente.profesionorubro,
          HOBBY: cliente.hobby,
          FECHULTMOD: moment().format(),
          DIRECCIONES: direcciones,
          OBSERVACIONES: cliente.observaciones,
        };
      } else {
        objetoClienteModificado = {
          NOMBRE: cliente.nombre,
          APELLIDO: cliente.apellido,
          CI: cliente.ci,
          RUC: cliente.ruc,
          PROFESIONORUBRO: cliente.profesionorubro,
          HOBBY: cliente.hobby,
          FECHULTMOD: moment().format(),
          OBSERVACIONES: cliente.observaciones,
        };
      }
    } else if (
      telefonos[0] === undefined &&
      direcciones[0] !== undefined &&
      redes[0] !== undefined
    ) {
      if (
        (direcciones[0].DESCRIDIRECCION !== '' ||
          direcciones[0].DETALLESDIRECCION !== '') &&
        (redes[0].Nick === '' || redes[0].RedSocial === '')
      ) {
        objetoClienteModificado = {
          NOMBRE: cliente.nombre,
          APELLIDO: cliente.apellido,
          CI: cliente.ci,
          RUC: cliente.ruc,
          PROFESIONORUBRO: cliente.profesionorubro,
          HOBBY: cliente.hobby,
          FECHULTMOD: moment().format(),
          DIRECCIONES: direcciones,
          OBSERVACIONES: cliente.observaciones,
        };
      } else if (
        (redes[0].Nick !== '' || redes[0].RedSocial !== '') &&
        (direcciones[0].DESCRIDIRECCION === '' ||
          direcciones[0].DETALLESDIRECCION === '')
      ) {
        objetoClienteModificado = {
          NOMBRE: cliente.nombre,
          APELLIDO: cliente.apellido,
          CI: cliente.ci,
          RUC: cliente.ruc,
          PROFECIONORUBRO: cliente.profesionorubro,
          HOBBY: cliente.hobby,
          FECHULTMOD: moment().format(),
          REDES: redes,
          OBSERVACIONES: cliente.observaciones,
        };
      } else {
        objetoClienteModificado = {
          NOMBRE: cliente.nombre,
          APELLIDO: cliente.apellido,
          CI: cliente.ci,
          RUC: cliente.ruc,
          PROFESIONORUBRO: cliente.profesionorubro,
          HOBBY: cliente.hobby,
          FECHULTMOD: moment().format(),
          DIRECCIONES: direcciones,
          REDES: redes,
          OBSERVACIONES: cliente.observaciones,
        };
      }
    } else if (
      telefonos[0] !== undefined &&
      direcciones[0] === undefined &&
      redes[0] !== undefined
    ) {
      if (
        (telefonos[0].DESCRITELEFONO !== '' ||
          telefonos[0].DETALLESTELEFONO !== '') &&
        (redes[0].Nick === '' || redes[0].RedSocial === '')
      ) {
        objetoClienteModificado = {
          NOMBRE: cliente.nombre,
          APELLIDO: cliente.apellido,
          CI: cliente.ci,
          RUC: cliente.ruc,
          PROFESIONORUBRO: cliente.profesionorubro,
          HOBBY: cliente.hobby,
          FECHULTMOD: moment().format(),
          TELEFONOS: telefonos,
          OBSERVACIONES: cliente.observaciones,
        };
      } else if (
        (redes[0].Nick !== '' || redes[0].RedSocial !== '') &&
        (telefonos[0].DESCRITELEFONO === '' ||
          telefonos[0].DETALLESTELEFONO === '')
      ) {
        objetoClienteModificado = {
          NOMBRE: cliente.nombre,
          APELLIDO: cliente.apellido,
          CI: cliente.ci,
          RUC: cliente.ruc,
          PROFESIONORUBRO: cliente.profesionorubro,
          HOBBY: cliente.hobby,
          FECHULTMOD: moment().format(),
          REDES: redes,
          OBSERVACIONES: cliente.observaciones,
        };
      } else {
        objetoClienteModificado = {
          NOMBRE: cliente.nombre,
          APELLIDO: cliente.apellido,
          CI: cliente.ci,
          RUC: cliente.ruc,
          PROFESIONORUBRO: cliente.profesionorubro,
          HOBBY: cliente.hobby,
          FECHULTMOD: moment().format(),
          TELEFONOS: telefonos,
          REDES: redes,
          OBSERVACIONES: cliente.observaciones,
        };
      }
    } else if (
      telefonos[0] !== undefined &&
      direcciones[0] !== undefined &&
      redes[0] === undefined
    ) {
      if (
        (telefonos[0].DESCRITELEFONO !== '' ||
          telefonos[0].DETALLESTELEFONO !== '') &&
        (direcciones[0].DESCRIDIRECCION === '' ||
          direcciones[0].DETALLESDIRECCION === '')
      ) {
        objetoClienteModificado = {
          NOMBRE: cliente.nombre,
          APELLIDO: cliente.apellido,
          CI: cliente.ci,
          RUC: cliente.ruc,
          PROFESIONORUBRO: cliente.profesionorubro,
          HOBBY: cliente.hobby,
          FECHULTMOD: moment().format(),
          TELEFONOS: telefonos,
          OBSERVACIONES: cliente.observaciones,
        };
      } else if (
        (direcciones[0].DESCRIDIRECCION !== '' ||
          direcciones[0].DETALLESDIRECCION !== '') &&
        (telefonos[0].DESCRITELEFONO === '' ||
          telefonos[0].DETALLESTELEFONO === '')
      ) {
        objetoClienteModificado = {
          NOMBRE: cliente.nombre,
          APELLIDO: cliente.apellido,
          CI: cliente.ci,
          RUC: cliente.ruc,
          PROFESIONORUBRO: cliente.profesionorubro,
          HOBBY: cliente.hobby,
          FECHULTMOD: moment().format(),
          DIRECCIONES: direcciones,
          OBSERVACIONES: cliente.observaciones,
        };
      } else {
        objetoClienteModificado = {
          NOMBRE: cliente.nombre,
          APELLIDO: cliente.apellido,
          CI: cliente.ci,
          RUC: cliente.ruc,
          PROFESIONORUBRO: cliente.profesionorubro,
          HOBBY: cliente.hobby,
          FECHULTMOD: moment().format(),
          TELEFONOS: telefonos,
          DIRECCIONES: direcciones,
          OBSERVACIONES: cliente.observaciones,
        };
      }
    } else if (
      telefonos[0] === undefined &&
      direcciones[0] === undefined &&
      redes[0] !== undefined
    ) {
      if (redes[0].Nick !== '' || redes[0].RedSocial !== '') {
        objetoClienteModificado = {
          NOMBRE: cliente.nombre,
          APELLIDO: cliente.apellido,
          CI: cliente.ci,
          RUC: cliente.ruc,
          PROFESIONORUBRO: cliente.profesionorubro,
          HOBBY: cliente.hobby,
          FECHULTMOD: moment().format(),
          REDES: redes,
          OBSERVACIONES: cliente.observaciones,
        };
      } else {
        objetoClienteModificado = {
          NOMBRE: cliente.nombre,
          APELLIDO: cliente.apellido,
          CI: cliente.ci,
          RUC: cliente.ruc,
          PROFESIONORUBRO: cliente.profesionorubro,
          HOBBY: cliente.hobby,
          FECHULTMOD: moment().format(),
          OBSERVACIONES: cliente.observaciones,
        };
      }
    } else {
      objetoClienteModificado = {
        NOMBRE: cliente.nombre,
        APELLIDO: cliente.apellido,
        CI: cliente.ci,
        RUC: cliente.ruc,
        PROFESIONORUBRO: cliente.profesionorubro,
        HOBBY: cliente.hobby,
        FECHULTMOD: moment().format(),
        TELEFONOS: telefonos,
        DIRECCIONES: direcciones,
        REDES: redes,
        OBSERVACIONES: cliente.observaciones,
      };
    }
    if (campana !== '') {
      objetoClienteModificado['CAMPANA_Id'] = campana;
    }
    actualizarCliente(id, objetoClienteModificado).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se guardo exitosamente el Cliente',
          },
        });
        const id = datosCliente.clientE_Id;
        obtenerTelefonosCliente(id).then((response) => {
          const Data = response.data;
          setDatatel(Data);
        });
        obtenerDireccionesCliente(id).then((response) => {
          const Data = response.data;
          setDatadir(Data);
        });
        setTelefonos([]);
        setDirecciones([]);
        let objetoAudi = {
          usuario: sesionUsuario.usuario.nombrecompleto,
          accion: 'Modificacion',
          panel: 'Gestion de Clientes',
          tabla: 'CLIENTES',
          filaafectada: props.location.state.clientE_Id,
          UsuarioId: sesionUsuario.usuario.id,
        };
        RegistrarAccion(objetoAudi);
        props.history.goBack();
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
  };
  const cerrarClientesPerfil = () => {
    setCliente({
      apellido: '',
      ci: '',
      ruc: '',
      nombre: '',
    });
    props.history.goBack();
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const mostrarPerfilTarea = (tarea) => {
    tarea['TipoVisitante'] = props.id;
    history.push({ pathname: '/perfilTarea', state: tarea });
  };
  useEffect(() => {
    const id = datosCliente.clientE_Id;
    if (id !== undefined) {
      obtenerRedesCliente(id).then((response) => {
        const Data = response.data;
        setDataRedes(Data);
      });
      obtenerTelefonosCliente(id).then((response) => {
        const Data = response.data;
        setDatatel(Data);
      });
      obtenerDireccionesCliente(id).then((response) => {
        const Data = response.data;
        setDatadir(Data);
      });
      ObtenerTareasRelacionadasAlCliente(id).then((response) => {
        setListaTareasCliente(response.data);
      });
      obtenerSugerencias(id).then((response) => {
        setListaSugerenciasCliente(response.data);
      });
    }
    if (
      datosCliente.nombre !== '' ||
      datosCliente.apellido !== '' ||
      datosCliente.ci !== '' ||
      datosCliente.ruc !== ''
    ) {
      if (props.location.state.campana !== null) {
        setValorSelect(props.location.state.campana.campanA_Id);
      }
      setCliente({
        nombre: datosCliente.nombre,
        apellido: datosCliente.apellido,
        ci: datosCliente.ci,
        ruc: datosCliente.ruc,
        profesionorubro: datosCliente.profesionorubro,
        hobby: datosCliente.hobby,
        observaciones: datosCliente.observaciones,
      });
    } else if (
      datosCliente.nombre === '' &&
      datosCliente.apellido === '' &&
      datosCliente.ci === '' &&
      datosCliente.ruc === ''
    ) {
      props.history.push('/clientesPrincipal');
    }
    obtenerCiudades().then((response) => {
      const Data = response.data;
      setDataCiu(Data);
    });
    if (barrioCiu !== '') {
      obtenerBarrios(barrioCiu).then((response) => {
        const Data = response.data;
        setDataBa(Data);
      });
    }
    obtenerCampanas().then((response) => {
      const Data = response.data;
      setDatar(Data);
    });
  }, [sesionUsuario, props, datosCliente, barrioCiu]);
  return (
    <Container component="main" justify="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h6">
          Perfil del Cliente
        </Typography>
        <br></br>
        <br></br>
        <form style={style.form}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                name="nombre"
                value={cliente.nombre}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Nombre"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="apellido"
                value={cliente.apellido}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Apellido/Razon Social"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="ci"
                value={cliente.ci}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Nro. de Cedula"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="ruc"
                value={cliente.ruc}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="RUC "
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="profesionorubro"
                value={cliente.profesionorubro}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Profesion/Rubro"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="hobby"
                value={cliente.hobby}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Hobby?"
              />
            </Grid>
            
              <FormControl variant="outlined" style={{width:380}}>
                <InputLabel style={{width:380}}>Campaña</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={valorSelect}
                  onChange={selectCampanahandleChange}
                  label="Campaña"
                >
                  {Datar.map((campana) => (
                    <MenuItem
                      key={campana.campanA_Id}
                      value={campana.campanA_Id}
                    >
                      {campana.descricampana}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
           

            <Grid item xs={12} md={6}>
              <TextareaAutosize
                name="observaciones"
                value={cliente.observaciones}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                style={style.textarea}
                aria-label="minimum height"
                rowsMin={4}
                placeholder="Observaciones"
              />
            </Grid>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={mostrarTelefonos}
            >
              Telefonos
            </Button>

            {estadoBotonTelefono === true ? (
              <TableContainer component={Paper} align="center">
                <Table size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Telefonos</TableCell>
                      <TableCell align="left">Detalles</TableCell>
                      <TableCell align="left">Nivel de Prioridad</TableCell>
                      <TableCell align="left">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Datatel.map((telefono) => (
                      <TableRow key={telefono.telefonO_Id}>
                        <TableCell align="left">
                          {telefono.descritelefono}
                        </TableCell>
                        <TableCell align="left">
                          {telefono.detallestelefono}
                        </TableCell>
                        <TableCell align="left">{telefono.prioridad}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => eliminarTelefono(telefono)}
                            color="error"
                            style={style.submit.submitTabla}
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
            ) : null}
            <Grid item xs={12} md={6}>
              <Typography>Nuevos Telefonos:</Typography>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setTelefonos((telefonoActual) => [
                      ...telefonoActual,
                      {
                        CODTELEFONO: generate(),
                        DESCRITELEFONO: '',
                        DETALLESTELEFONO: '',
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
            {telefonos.map((t, index) => {
              return (
                <div key={t.CODTELEFONO}>
                  <TextField
                    name="TELEFONO"
                    value={t.DESCRITELEFONO}
                    onChange={(e) => {
                      const DESCRITELEFONO = e.target.value;
                      setTelefonos((telefonoActual) =>
                        produce(telefonoActual, (v) => {
                          v[index].DESCRITELEFONO = DESCRITELEFONO;
                        })
                      );
                    }}
                    variant="outlined"
                    label="Nro.Telefono"
                    style={style.textTel}
                  />
                  <TextField
                    name="DETALLESTELEFONO"
                    value={t.DETALLESTELEFONO}
                    fullWidth
                    onChange={(e) => {
                      const DETALLESTELEFONO = e.target.value;
                      setTelefonos((telefonoActual) =>
                        produce(telefonoActual, (v) => {
                          v[index].DETALLESTELEFONO = DETALLESTELEFONO;
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
                      setTelefonos((telefonoActual) =>
                        telefonoActual.filter(
                          (x) => x.CODTELEFONO !== t.CODTELEFONO
                        )
                      );
                    }}
                  >
                    x
                  </Button>
                </div>
              );
            })}

            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={mostrarDirecciones}
              style={style.notifications}
            >
              Direcciones
            </Button>

            {estadoBotonDirecciones === true ? (
              <TableContainer component={Paper} align="center">
                <Table size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Direcciones</TableCell>
                      <TableCell align="left">Detalles</TableCell>
                      <TableCell align="left">Barrios</TableCell>
                      <TableCell align="left">Ciudades</TableCell>
                      <TableCell align="left">Acciones</TableCell>
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
                        <TableCell>
                          <Button
                            onClick={() => eliminarDireccion(direccion)}
                            color="error"
                            style={style.submit.submitTabla}
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
            ) : null}
          </Grid>
          <br></br>
          <Grid item xs={12} md={6}>
            <Typography>Nuevas Direcciones:</Typography>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setDirecciones((direccionActual) => [
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
                }}
                style={style.submit}
              >
                +
              </Button>
            </Grid>
          </Grid>
          <br></br>
          {direcciones.map((d, index) => {
            return (
              <div key={d.CODDIRECCION}>
                <TextField
                  multiline
                  name="DIRECCION"
                  value={d.DESCRIDIRECCION}
                  onChange={(e) => {
                    const DESCRIDIRECCION = e.target.value;
                    setDirecciones((direccionActual) =>
                      produce(direccionActual, (v) => {
                        v[index].DESCRIDIRECCION = DESCRIDIRECCION;
                      })
                    );
                  }}
                  variant="outlined"
                  label="Direccion"
                  style={style.textDir}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  style={style.btnTel}
                  onClick={() => {
                    setDirecciones((direccionActual) =>
                      direccionActual.filter(
                        (x) => x.CODDIRECCION !== d.CODDIRECCION
                      )
                    );
                  }}
                >
                  X
                </Button>
                <Grid item>
                  <br></br>
                  <TextField
                    multiline
                    name="DETALLESDIRECCION"
                    value={d.DETALLESDIRECCION}
                    fullWidth
                    onChange={(e) => {
                      const DETALLESDIRECCION = e.target.value;
                      setDirecciones((direccionActual) =>
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
                <br />
                <br />
                <Grid item>
                  <Autocomplete
                    id="combo-box-demo"
                    options={DataCiu}
                    getOptionLabel={(DataCiu) => DataCiu.descriciudad}
                    getOptionSelected={(option, value) =>
                      option.ciudaD_Id === value.ciudaD_Id
                    }
                    style={style.SelectDi}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Buscar Ciudades"
                        variant="outlined"
                      />
                    )}
                    onChange={(e, value) => {
                      setDirecciones((direccionActual) =>
                        produce(direccionActual, (v) => {
                          v[index].CIUDAD.CIUDAD_Id = value.ciudaD_Id;
                        })
                      );
                      setBarrioCiu(value.ciudaD_Id);
                    }}
                  />
                  <Autocomplete
                    id="combo-box-demo2"
                    options={DataBa}
                    getOptionLabel={(DataBa) => DataBa.describarrio}
                    style={style.SelectDi}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Buscar Barrios"
                        variant="outlined"
                      />
                    )}
                    onChange={(e, value) => {
                      setDirecciones((direccionActual) =>
                        produce(direccionActual, (v) => {
                          v[index].BARRIO.BARRIO_Id = value.barriO_Id;
                        })
                      );
                    }}
                  />
                </Grid>
              </div>
            );
          })}
          <br />
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={mostrarRedes}
          >
            Redes
          </Button>
          {estadoBotonRedes === true ? (
            <TableContainer component={Paper} align="center">
              <Table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      Nombre de Usuario en la red
                    </TableCell>
                    <TableCell align="left">Red Social</TableCell>
                    <TableCell align="left">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {DataRedes.map((red) => (
                    <TableRow key={red.reD_Id}>
                      <TableCell align="left">{red.nick}</TableCell>
                      <TableCell align="left">{red.redsocial}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => eliminarRed(red)}
                          color="error"
                          style={style.submit.submitTabla}
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
          ) : null}
          <br />
          <Grid item xs={12} md={6}>
            <Typography>Nuevas Redes Sociales:</Typography>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setRedes((redActual) => [
                    ...redActual,
                    {
                      CODRED: generate(),
                      Nick: '',
                      RedSocial: '',
                    },
                  ]);
                }}
                style={style.submit}
              >
                +
              </Button>
            </Grid>
          </Grid>
          {redes.map((t, index) => {
            return (
              <div key={t.CODRED}>
                <TextField
                  multiline
                  name="Nick"
                  value={t.Nick}
                  onChange={(e) => {
                    const Nick = e.target.value;
                    setRedes((redActual) =>
                      produce(redActual, (v) => {
                        v[index].Nick = Nick;
                      })
                    );
                  }}
                  variant="outlined"
                  label="Nombre de usuario en la Red Social"
                  style={style.textDet}
                />
                <TextField
                  multiline
                  name="RedSocial"
                  value={t.RedSocial}
                  fullWidth
                  onChange={(e) => {
                    const RedSocial = e.target.value;
                    setRedes((redActual) =>
                      produce(redActual, (v) => {
                        v[index].RedSocial = RedSocial;
                      })
                    );
                  }}
                  variant="outlined"
                  label="Red Social"
                  style={style.textTel}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  style={style.btnTel}
                  onClick={() => {
                    setRedes((redActual) =>
                      redActual.filter((x) => x.CODRED !== t.CODRED)
                    );
                  }}
                >
                  X
                </Button>
              </div>
            );
          })}
          <br />
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={mostrarSugerencias}
            style={style.notifications}
          >
            Sugerencias
          </Button>
          {estadoBotonSugerencias === true ? (
            <Paper className={classes.root}>
              <TableContainer component={Paper} align="center">
                <Table size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Fecha de la Sugerencia</TableCell>
                      <TableCell align="left">
                        Sugerencias Del Cliente
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listaSugerenciasCliente
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((sugerencia) => (
                        <TableRow key={sugerencia.id}>
                          <TableCell align="left">
                            {sugerencia.fecgra.substr(-20, 10)}
                          </TableCell>
                          <TableCell align="left">
                            {sugerencia.sugerencia}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={listaSugerenciasCliente.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          ) : null}
          <br />
          <br />
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={mostrarTareas}
            style={style.notifications}
          >
            Tareas
          </Button>
          {estadoBotonTareas === true ? (
            <Paper className={classes.root}>
              <TableContainer component={Paper} align="center">
                <Table size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Asignado por</TableCell>
                      <TableCell align="left">Asignado a</TableCell>
                      <TableCell align="left">Detalles</TableCell>
                      <TableCell align="left">Fecha de Vto.</TableCell>
                      <TableCell align="left">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listaTareasCliente
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((tarea) => (
                        <TableRow key={tarea.tareA_Id}>
                          <TableCell align="left">
                            {tarea.fechacreacion.substr(-20, 10)}
                          </TableCell>
                          <TableCell align="left">
                            {tarea.usuarioasignado}
                          </TableCell>
                          <TableCell align="left">{tarea.numtarea}</TableCell>
                          <TableCell align="left">
                            {tarea.fechavto.substr(-20, 10)}
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => mostrarPerfilTarea(tarea)}
                              color="secondary"
                              style={style.submit.submitTabla}
                            >
                              Perfil
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={listaTareasCliente.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          ) : null}
          <br /> <br /> <br /> <br />
          <Grid container spacing={4} justify="center">
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={ActualizarCliente}
                style={style.submit}
                type="submit"
              >
                Guardar
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={cerrarClientesPerfil}
                style={style.submit}
              >
                Volver
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default withRouter(PerfilCliente);

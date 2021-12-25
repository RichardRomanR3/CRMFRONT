import React, { useState, useEffect, useRef } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import style from '../../Tools/Style';
import { useStateValue } from '../../../contexto/store';
import {
  insertarContacto,
  obtenerClientes,
} from '../../../actions/ClientesAction';
import ModalClientes from '../../GestionDeClientes/ModalClientes.js';
import { RegistrarAccion } from '../../../actions/AuditoriaAction';

const NuevoContacto = (props) => {
  const [clientes, setClientes] = useState('');
  const mounted = useRef(true);
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [Datacl, setDatacl] = useState([]);
  const seleccionarCliente = (cliente) => {
    setClientes(cliente.nombre + ' ' + cliente.apellido);
    setClienteId(cliente.clientE_Id);
    setModalBuscar(false);
  };
  const [contacto, setContacto] = useState({
    NOMBRE: '',
    APELLIDO: '',
    TELEFONO: '',
    DIRECCION: '',
    EMAIL: '',
    USUARIO: '',
    OBSERVACIONES: '',
  });
  const [modalBuscar, setModalBuscar] = useState(false);
  const [clienteId, setClienteId] = useState('');
  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setContacto((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };
  const abrirModal = () => {
    setModalBuscar(true);
  };
  const cerrarModal = () => {
    setModalBuscar(false);
  };
  const registrarContacto = () => {
    if (contacto.APELLIDO !== '' || contacto.CI !== '') {
      const usuario = sesionUsuario.usuario.nombrecompleto;
      let objetoNuevo = {};
      if (clienteId === '' || clienteId === undefined) {
        objetoNuevo = {
          NOMBRE: contacto.NOMBRE,
          APELLIDO: contacto.APELLIDO,
          TELEFONO: contacto.TELEFONO,
          DIRECCION: contacto.DIRECCION,
          EMAIL: contacto.EMAIL,
          OBSERVACIONES: contacto.OBSERVACIONES,
          USUARIO: usuario,
          UsuarioId: sesionUsuario.usuario.id,
        };
      } else {
        objetoNuevo = {
          NOMBRE: contacto.NOMBRE,
          APELLIDO: contacto.APELLIDO,
          TELEFONO: contacto.TELEFONO,
          DIRECCION: contacto.DIRECCION,
          EMAIL: contacto.EMAIL,
          OBSERVACIONES: contacto.OBSERVACIONES,
          USUARIO: usuario,
          CLIENTE_Id: clienteId,
          UsuarioId: sesionUsuario.usuario.id,
        };
      }
      insertarContacto(objetoNuevo).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje: 'Se guardo con exito el contacto ',
            },
          });
          setContacto({
            NOMBRE: '',
            APELLIDO: '',
            TELEFONO: '',
            DIRECCION: '',
            EMAIL: '',
            USUARIO: '',
            OBSERVACIONES: '',
          });
          setClienteId('');
          let objetoAudi = {
            usuario: sesionUsuario.usuario.nombrecompleto,
            accion: 'Registro',
            panel: 'Gestion de Clientes',
            tabla: 'CONTACTOS',
            filaafectada: 'NUEVO REGISTRO',
            UsuarioId: sesionUsuario.usuario.id,
          };
          RegistrarAccion(objetoAudi);
          volver();
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
    } else {
      dispatch({
        type: 'OPEN_SNACKBAR',
        openMensaje: {
          open: true,
          mensaje:
            'Los Campos Apellido y Ci son obligatorios Asegurese de llenarlos',
        },
      });
    }
  };
  const volver = () => {
    props.history.goBack();
  };
  useEffect(() => {
    if (mounted.current) {
      obtenerClientes().then((response) => {
        const Data = response.data;
        setDatacl(Data);
      });
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, []);
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <br></br>
        <br></br>
        <Typography component="h1" variant="h6">
          Registro de Contactos
        </Typography>
        <br></br>
        <br></br>
        <form style={style.form}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="NOMBRE"
                value={contacto.NOMBRE}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Nombre"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="APELLIDO"
                value={contacto.APELLIDO}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Apellido/Razon Social"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="TELEFONO"
                value={contacto.TELEFONO}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Telefono"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="DIRECCION"
                value={contacto.DIRECCION}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Direccion"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="EMAIL"
                value={contacto.EMAIL}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Email"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextareaAutosize
                name="OBSERVACIONES"
                value={contacto.OBSERVACIONES}
                onChange={ingresarValoresMemoria}
                style={style.textarea}
                variant="outlined"
                aria-label="minimum height"
                rowsMin={4}
                placeholder="Observaciones"
              />
            </Grid>
          </Grid>
          <IconButton
            onClick={abrirModal}
            style={style.iconbutton}
            aria-label="buscar"
          >
            <SearchIcon />
            <Typography>Relacionar a un Cliente</Typography>
          </IconButton>

          <Grid>
            <TextField
              multiline
              name="CLIENTE"
              value={clientes}
              fullWidth
              onChange={ingresarValoresMemoria}
              variant="outlined"
              label="CLIENTE"
            />
          </Grid>
          <br></br>
          <br></br>
          <Grid container spacing={4} justify="center">
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={registrarContacto}
                style={style.submit}
              >
                Registrar
              </Button>
            </Grid>
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
          <Grid container direction="row" justify="center" alignItems="center">
            <ModalClientes
              data={Datacl}
              open={modalBuscar}
              handleClose={cerrarModal}
              seleccionarCliente={seleccionarCliente}
            />
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default NuevoContacto;

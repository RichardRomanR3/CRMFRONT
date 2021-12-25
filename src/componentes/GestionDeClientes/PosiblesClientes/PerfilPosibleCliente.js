import React, { useState, useEffect, useRef } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
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
  ModificarPosibleCliente,
  eliminarDePosiblesClientes,
  registrarCliente,
} from '../../../actions/ClientesAction';
import { withRouter } from 'react-router-dom';
import { RegistrarAccion } from '../../../actions/AuditoriaAction';
const PerfilPosibleCliente = (props) => {
  const mounted = useRef(true);
  const posiblecliente = props.location.state;
  //eslint-disable-next-line
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [idp, setId] = useState('');
  const [cliente, setCliente] = useState({
    NOMBRE: '',
    APELLIDO: '',
    CI: '',
    RUC: '',
    TELEFONO: '',
    DIRECCION: '',
    EMAIL: '',
    USUARIO: '',
    OBSERVACIONES: '',
  });
  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setCliente((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };
  const EditarPosibleCliente = () => {
    const objetoNuevo = {
      NOMBRE: cliente.NOMBRE,
      APELLIDO: cliente.APELLIDO,
      CI: cliente.CI,
      RUC: cliente.RUC,
      TELEFONO: cliente.TELEFONO,
      DIRECCION: cliente.DIRECCION,
      EMAIL: cliente.EMAIL,
      OBSERVACIONES: cliente.OBSERVACIONES,
    };
    ModificarPosibleCliente(objetoNuevo, idp).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se modifico con exito el posible cliente ',
          },
        });
        setCliente({
          NOMBRE: '',
          APELLIDO: '',
          CI: '',
          RUC: '',
          TELEFONO: '',
          DIRECCION: '',
          EMAIL: '',
          USUARIO: '',
          OBSERVACIONES: '',
        });
        let objetoAudi = {
          usuario: sesionUsuario.usuario.nombrecompleto,
          accion: 'Modificacion',
          panel: 'Gestion de Clientes',
          tabla: 'POSIBLESCLIENTES',
          filaafectada: props.location.state.posibleclientE_Id,
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
  };
  const volver = () => {
    props.history.goBack();
  };
  const NuevoClienteRegular = () => {
    let objetoClienteNuevo = {
      NOMBRE: cliente.NOMBRE,
      APELLIDO: cliente.APELLIDO,
      CI: cliente.CI,
      RUC: cliente.RUC,
      PROFESIONORUBRO: cliente.PROFESIONORUBRO,
      HOBBY: cliente.HOBBY,
      OBSERVACIONES: cliente.OBSERVACIONES,
      ENTROCOMOPC: cliente.FECGRA,
    };
    registrarCliente(objetoClienteNuevo).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se guardo exitosamente el Cliente',
          },
        });
        setCliente({
          NOMBRE: '',
          APELLIDO: '',
          CI: '',
          RUC: '',
          TELEFONO: '',
          DIRECCION: '',
          EMAIL: '',
          USUARIO: '',
          OBSERVACIONES: '',
          PROFESIONORUBRO: '',
          HOBBY: '',
        });
        volver();
        eliminarDePosiblesClientes(idp).then((response) => {
          if (response.status === 200) {
            console.log('ELIMINO POSIBLE CLIENTE');
          } else {
            console.log('NO ELIMINO');
          }
        });
      } else {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje:
              'Errores al intentar guardar Asegurese de llenar todos los campos ',
          },
        });
      }
    });
  };
  useEffect(() => {
    if (mounted.current) {
      setId(posiblecliente.posibleclientE_Id);
      setCliente({
        NOMBRE: posiblecliente.nombre,
        APELLIDO: posiblecliente.apellido,
        CI: posiblecliente.ci,
        RUC: posiblecliente.ruc,
        TELEFONO: posiblecliente.telefono,
        DIRECCION: posiblecliente.direccion,
        EMAIL: posiblecliente.email,
        PROFESIONORUBRO: posiblecliente.profesionorubro,
        HOBBY: posiblecliente.hobby,
        OBSERVACIONES: posiblecliente.observaciones,
        USUARIO: posiblecliente.usuario,
        FECGRA: posiblecliente.fecgra,
      });
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, [posiblecliente]);
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <br></br>
        <br></br>
        <Typography component="h1" variant="h6">
          Modificar Posible Cliente
        </Typography>
        <br></br>
        <br></br>
        <form style={style.form}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                name="NOMBRE"
                value={cliente.NOMBRE}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Nombre"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="APELLIDO"
                value={cliente.APELLIDO}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Apellido/Razon Social"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="CI"
                value={cliente.CI}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Nro. Cedula"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="RUC"
                value={cliente.RUC}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="RUC"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="TELEFONO"
                value={cliente.TELEFONO}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Telefono"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="DIRECCION"
                value={cliente.DIRECCION}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Direccion"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="EMAIL"
                value={cliente.EMAIL}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Email"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextareaAutosize
                name="OBSERVACIONES"
                value={cliente.OBSERVACIONES}
                onChange={ingresarValoresMemoria}
                style={style.textarea}
                variant="outlined"
                aria-label="minimum height"
                rowsMin={4}
                placeholder="Observaciones"
              />
            </Grid>
          </Grid>
          <br></br>
          <br></br>
          <Grid container spacing={4} justify="center">
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={EditarPosibleCliente}
                style={style.submit}
              >
                Guardar
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
            <Grid item xs={12} md={6}>
              <Button
                onClick={NuevoClienteRegular}
                style={{
                  width: '100%',
                  color: '#ffffff',
                  backgroundColor: '#1b5e20',
                }}
              >
                Pasar a Cliente Regular
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default withRouter(PerfilPosibleCliente);

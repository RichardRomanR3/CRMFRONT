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
import { ModificarContacto } from '../../../actions/ClientesAction';
import { RegistrarAccion } from '../../../actions/AuditoriaAction';

const PerfilContactos = (props) => {
  const mounted = useRef(true);
  const contactop = props.location.state;
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [id, setId] = useState('');
  const [contacto, setContacto] = useState({
    NOMBRE: '',
    APELLIDO: '',
    TELEFONO: '',
    DIRECCION: '',
    EMAIL: '',
    USUARIO: '',
    OBSERVACIONES: '',
  });
  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setContacto((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };
  const EditarContacto = () => {
    const usuario = sesionUsuario.usuario.nombrecompleto;
    const objetoNuevo = {
      NOMBRE: contacto.NOMBRE,
      APELLIDO: contacto.APELLIDO,
      TELEFONO: contacto.TELEFONO,
      DIRECCION: contacto.DIRECCION,
      EMAIL: contacto.EMAIL,
      OBSERVACIONES: contacto.OBSERVACIONES,
      USUARIO: usuario,
    };
    ModificarContacto(objetoNuevo, id).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se modifico con exito el contacto',
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
        let objetoAudi = {
          usuario: sesionUsuario.usuario.nombrecompleto,
          accion: 'Modificacion',
          panel: 'Gestion de Clientes',
          tabla: 'CONTACTOS',
          filaafectada: props.location.state.contactO_Id,
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
  useEffect(() => {
    if (mounted.current) {
      setId(contactop.contactO_Id);
      setContacto({
        NOMBRE: contactop.nombre,
        APELLIDO: contactop.apellido,
        TELEFONO: contactop.telefono,
        DIRECCION: contactop.direccion,
        EMAIL: contactop.email,
        OBSERVACIONES: contactop.observaciones,
        USUARIO: contactop.usuario,
      });
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, [contactop, id]);
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <br></br>
        <br></br>
        <Typography component="h1" variant="h6">
          Modificar Contacto
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
          <br></br>
          <br></br>
          <Grid container spacing={4} justify="center">
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={EditarContacto}
                style={style.submit}
              >
                Guardar
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={volver}
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
export default PerfilContactos;

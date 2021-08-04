import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import style from '../../Tools/Style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { registrarMotivoActividad } from '../../../actions/ActividadesAction';
import { Typography } from '@material-ui/core';
import { useStateValue } from '../../../contexto/store';
import { RegistrarAccion } from '../../../actions/AuditoriaAction';

const NuevoMotivoActividad = (props) => {
  //eslint-disable-next-line
  const [{ openSnackar, sesionUsuario }, dispatch] = useStateValue();

  const [motivoActividad, setMotivoActividad] = useState({
    id: '',
    nombre: '',
    descripcion: '',
  });

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setMotivoActividad((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  //RRR: FUNCION PARA GUARDAR NUEVO TIPO DE CAMPAÑA
  const guardarMotivoActividad = (e) => {
    e.preventDefault();
    const objetomotivoActividad = {
      nombre: motivoActividad.nombre,
      descripcion: motivoActividad.descripcion,
    };
    registrarMotivoActividad(objetomotivoActividad).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se guardo exitosamente el Motivo de Actividad',
          },
        });
        setMotivoActividad({
          id: '',
          nombre: '',
          descripcion: '',
        });
        let objetoAudi = {
          usuario: sesionUsuario.usuario.nombrecompleto,
          accion: 'Registro',
          panel: 'Seguridad',
          tabla: 'MOTIVOACTIVIDAD',
          filaafectada: 'NUEVO REGISTRO',
          UsuarioId: sesionUsuario.usuario.id,
        };
        RegistrarAccion(objetoAudi);
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

  const volverTabla = (e) => {
    props.history.push('/motivosdeactividades');
  };

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <br />
        <br />
        <Typography component="h1" variant="h6">
          Nuevo Motivo de Actividad
        </Typography>
        <br />
        <br />
        <form style={style.form}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                name="nombre"
                value={motivoActividad.nombre}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Nombre"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="descripcion"
                value={motivoActividad.descripcion}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Descripcion"
              />
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid container spacing={4} justify="center">
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={guardarMotivoActividad}
                style={style.submit}
              >
                Guardar
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={volverTabla}
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

export default NuevoMotivoActividad;

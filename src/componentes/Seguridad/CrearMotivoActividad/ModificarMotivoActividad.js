import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import style from '../../Tools/Style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { editarMotivoActividad } from '../../../actions/ActividadesAction';
import { Typography } from '@material-ui/core';
import { useStateValue } from '../../../contexto/store';
import { RegistrarAccion } from '../../../actions/AuditoriaAction';

const ModificarMotivoActividad = (props) => {
  const motivoActividadAModificar = props.location.state;
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

  const volverTabla = (e) => {
    props.history.push('/motivosdeactividades');
  };

  //RRR: FUNCION PARA ACTUALIZAR TIPO DE CAMPAÑA
  const actualizarMotivoActividad = (e) => {
    e.preventDefault();
    const objetoModMotivoActividad = {
      nombre: motivoActividad.nombre,
      descripcion: motivoActividad.descripcion,
    };
    editarMotivoActividad(
      motivoActividadAModificar.id,
      objetoModMotivoActividad
    ).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se Modifico exitosamente el Motivo de Actividad',
          },
        });
        setMotivoActividad({
          id: '',
          nombre: '',
          descripcion: '',
        });
        let objetoAudi = {
          usuario: sesionUsuario.usuario.nombrecompleto,
          accion: 'Modificacion',
          panel: 'Seguridad',
          tabla: 'MOTIVOACTIVIDAD',
          filaafectada: props.location.state.id,
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

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <br />
        <br />
        <Typography component="h1" variant="h6">
          Modificar Motivo Actividad: <br />{' '}
          {motivoActividadAModificar.nombre}
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
                onClick={actualizarMotivoActividad}
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

export default ModificarMotivoActividad;

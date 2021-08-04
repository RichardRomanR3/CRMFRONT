import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import style from '../../Tools/Style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { editarTipoActividad } from '../../../actions/ActividadesAction';
import { Typography } from '@material-ui/core';
import { useStateValue } from '../../../contexto/store';
import { RegistrarAccion } from '../../../actions/AuditoriaAction';

const ModificarTipoActividad = (props) => {
  const tipoActividadAModificar = props.location.state;
  //eslint-disable-next-line
  const [{ openSnackar, sesionUsuario }, dispatch] = useStateValue();

  const [tipoActividad, setTipoActividad] = useState({
    id: '',
    nombre: '',
    descripcion: '',
  });

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setTipoActividad((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const volverTabla = (e) => {
    props.history.push('/tiposdeactividades');
  };

  //RRR: FUNCION PARA ACTUALIZAR TIPO DE CAMPAÑA
  const actualizarTipoActividad = (e) => {
    e.preventDefault();
    const objetoModTipoActividad = {
      nombre: tipoActividad.nombre,
      descripcion: tipoActividad.descripcion,
    };
    editarTipoActividad(
      tipoActividadAModificar.id,
      objetoModTipoActividad
    ).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se Modifico exitosamente el Tipo de Actividad',
          },
        });
        setTipoActividad({
          id: '',
          nombre: '',
          descripcion: '',
        });
        let objetoAudi = {
          usuario: sesionUsuario.usuario.nombrecompleto,
          accion: 'Modificacion',
          panel: 'Seguridad',
          tabla: 'TIPOACTIVIDAD',
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
          Modificar Tipo Actividad: <br />{' '}
          {tipoActividadAModificar.nombre}
        </Typography>
        <br />
        <br />
        <form style={style.form}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                name="nombre"
                value={tipoActividad.nombre}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Nombre"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="descripcion"
                value={tipoActividad.descripcion}
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
                onClick={actualizarTipoActividad}
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

export default ModificarTipoActividad;

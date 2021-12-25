import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import style from '../../Tools/Style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { registrarTipoTarea } from '../../../actions/TareasAction';
import { Typography } from '@material-ui/core';
import { useStateValue } from '../../../contexto/store';
import { RegistrarAccion } from '../../../actions/AuditoriaAction';

const NuevoTipoTarea = (props) => {
  //eslint-disable-next-line
  const [{ openSnackar, sesionUsuario }, dispatch] = useStateValue();

  const [tipoTarea, setTipoTarea] = useState({
    id: '',
    CODTIPOTAREA: 0,
    DESCRITIPOTAREA: '',
  });

  //RRR: CAMBIA EL ESTADO DE LA VARIABLE tipoTarea
  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setTipoTarea((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  //RRR: FUNCION PARA GUARDAR NUEVO TIPO DE TAREA
  const guardarTipoTarea = (e) => {
    e.preventDefault();

    const objetotipoTarea = {
      CODTIPOTAREA: parseInt(tipoTarea.CODTIPOTAREA),
      DESCRITIPOTAREA: tipoTarea.DESCRITIPOTAREA,
    };

    registrarTipoTarea(objetotipoTarea).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se guardo exitosamente el Tipo de Tarea',
          },
        });
        setTipoTarea({
          id: '',
          CODTIPOTAREA: 0,
          DESCRITIPOTAREA: '',
        });
        let objetoAudi = {
          usuario: sesionUsuario.usuario.nombrecompleto,
          accion: 'Registro',
          panel: 'Seguridad',
          tabla: 'TIPOTAREA',
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

  const volverTabla = () => {
    props.history.push('/tipostareas');
  };

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <br />
        <br />
        <Typography component="h1" variant="h6">
          Nuevo Tipo de Tarea
        </Typography>
        <br />
        <br />
        <form style={style.form}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                name="CODTIPOTAREA"
                value={tipoTarea.CODTIPOTAREA}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Codigo"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="DESCRITIPOTAREA"
                value={tipoTarea.DESCRITIPOTAREA}
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
                onClick={guardarTipoTarea}
                style={style.submit}
                type="submit"
              >
                Guardar
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="secondary"
                onClick={volverTabla}
                style={style.submit}
                type="submit"
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

export default NuevoTipoTarea;

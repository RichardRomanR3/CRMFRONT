import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import style from '../../Tools/Style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { useStateValue } from '../../../contexto/store';
import { editarTipoTarea } from '../../../actions/TareasAction';
import { RegistrarAccion } from '../../../actions/AuditoriaAction';

const ModificarTipoTarea = (props) => {
  const idTipoTareaModificar = props.location.state.tipotareA_Id;

  //eslint-disable-next-line
  const [{ openSnackbar, sesionUsuario }, dispatch] = useStateValue();

  const [tipoTarea, setTipoTarea] = useState({
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

  //RRR: FUNCION PARA MODIFICAR TIPO DE TAREA
  const actualizarTipoTarea = (e) => {
    e.preventDefault();
    const objetoModTipoTarea = {
      CODTIPOTAREA: parseInt(tipoTarea.CODTIPOTAREA),
      DESCRITIPOTAREA: tipoTarea.DESCRITIPOTAREA,
    };
    editarTipoTarea(idTipoTareaModificar, objetoModTipoTarea).then(
      (response) => {
        if (response.status === 200) {
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje: 'Se Modifico exitosamente el Tipo de Tarea',
            },
          });
          setTipoTarea({
            id: '',
            CODTIPOTAREA: 0,
            DESCRITIPOTAREA: '',
          });
          let objetoAudi = {
            usuario: sesionUsuario.usuario.nombrecompleto,
            accion: 'Modificacion',
            panel: 'Marketing',
            tabla: 'CAMPAÑAS',
            filaafectada: props.location.state.clientE_Id,
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
      }
    );
  };

  const volverTabla = () => {
    props.history.push('/tipostareas');
  };

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <br />
        <br />
        <Typography component="h1" variant="h6" align="center">
          Modificar Tipo de Tarea: <br /> {props.location.state.descritipotarea}
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
                onClick={actualizarTipoTarea}
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

export default ModificarTipoTarea;

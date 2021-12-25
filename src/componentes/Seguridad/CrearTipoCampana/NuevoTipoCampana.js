import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import style from '../../Tools/Style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { registrarTipoCampana } from '../../../actions/CampanasAction';
import { Typography } from '@material-ui/core';
import { useStateValue } from '../../../contexto/store';
import { RegistrarAccion } from '../../../actions/AuditoriaAction';

const NuevoTipoCampana = (props) => {
  //eslint-disable-next-line
  const [{ openSnackar, sesionUsuario }, dispatch] = useStateValue();

  const [tipoCampana, setTipoCampana] = useState({
    id: '',
    CODTIPOCAMPANA: 0,
    DESCRITIPOCAMPANA: '',
  });

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setTipoCampana((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  //RRR: FUNCION PARA GUARDAR NUEVO TIPO DE CAMPAÑA
  const guardarTipoCampana = (e) => {
    e.preventDefault();
    const objetotipoCampana = {
      CODTIPOCAMPANA: parseInt(tipoCampana.CODTIPOCAMPANA),
      DESCRITIPOCAMPANA: tipoCampana.DESCRITIPOCAMPANA,
    };
    registrarTipoCampana(objetotipoCampana).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se guardo exitosamente el Tipo de Campana',
          },
        });
        setTipoCampana({
          id: '',
          CODTIPOCAMPANA: 0,
          DESCRITIPOCAMPANA: '',
        });
        let objetoAudi = {
          usuario: sesionUsuario.usuario.nombrecompleto,
          accion: 'Registro',
          panel: 'Seguridad',
          tabla: 'TIPOCAMPAÑA',
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
    props.history.push('/tiposcampanas');
  };

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <br />
        <br />
        <Typography component="h1" variant="h6">
          Nuevo Tipo de Campaña
        </Typography>
        <br />
        <br />
        <form style={style.form}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                name="CODTIPOCAMPANA"
                value={tipoCampana.CODTIPOCAMPANA}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Codigo"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="DESCRITIPOCAMPANA"
                value={tipoCampana.DESCRITIPOCAMPANA}
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
                onClick={guardarTipoCampana}
                style={style.submit}
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

export default NuevoTipoCampana;

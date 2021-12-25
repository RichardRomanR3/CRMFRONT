import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import style from '../../Tools/Style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { editarTipoCampana } from '../../../actions/CampanasAction';
import { Typography } from '@material-ui/core';
import { useStateValue } from '../../../contexto/store';
import { RegistrarAccion } from '../../../actions/AuditoriaAction';

const ModificarTipoCampana = (props) => {
  const tipoCampanaAModificar = props.location.state;
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

  const volverTabla = (e) => {
    props.history.push('/tiposcampanas');
  };

  //RRR: FUNCION PARA ACTUALIZAR TIPO DE CAMPAÑA
  const actualizarTipoCampana = (e) => {
    e.preventDefault();
    const objetoModTipoCampana = {
      CODTIPOCAMPANA: parseInt(tipoCampana.CODTIPOCAMPANA),
      DESCRITIPOCAMPANA: tipoCampana.DESCRITIPOCAMPANA,
    };
    editarTipoCampana(
      tipoCampanaAModificar.tipocampanA_Id,
      objetoModTipoCampana
    ).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se Modifico exitosamente el Tipo de Campana',
          },
        });
        setTipoCampana({
          id: '',
          CODTIPOCAMPANA: 0,
          DESCRITIPOCAMPANA: '',
        });
        let objetoAudi = {
          usuario: sesionUsuario.usuario.nombrecompleto,
          accion: 'Modificacion',
          panel: 'Seguridad',
          tabla: 'TIPOSCAMPAÑAS',
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
    });
  };

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <br />
        <br />
        <Typography component="h1" variant="h6">
          Modificar Tipo Campaña: <br />{' '}
          {tipoCampanaAModificar.descritipocampana}
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
                onClick={actualizarTipoCampana}
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

export default ModificarTipoCampana;

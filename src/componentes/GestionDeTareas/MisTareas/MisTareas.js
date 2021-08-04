import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import style from '../../Tools/Style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CircularProgress, Container, Grid } from '@material-ui/core';
import { obtenerTareas } from '../../../actions/TareasAction';
import { Typography } from '@material-ui/core';
import { useStateValue } from '../../../contexto/store';
import TTareas from '../TTareas.js';

const MisTareas = (props) => {
  const mounted = useRef(true);
  const [{ sesionUsuario }] = useStateValue();
  const [Datar, setDatar] = useState([]);
  const [term, setTerm] = useState('');
  const [datosCargados, setDatosCargados] = useState(false);
  const nuevoTarea = () => {
    props.history.push('/nuevaTarea');
  };
  useEffect(() => {
    if (mounted.current) {
      obtenerTareas(sesionUsuario.usuario.id).then((response) => {
        const Data = response.data;
        setDatar(Data);
        setDatosCargados(true);
      });
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, [sesionUsuario]);
  return (
    <Container justify="center">
      <br></br>
      <Typography align="center" component="h1" variant="h6">
        Tareas asignadas a {sesionUsuario.usuario.nombrecompleto}
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Button
            style={style.submit.submitnuevo}
            variant="contained"
            color="primary"
            onClick={nuevoTarea}
          >
            Nueva Tarea
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <br />
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <SearchIcon />
            </Grid>
            <Grid item>
              <TextField
                multiline
                name="term"
                style={style.TextField}
                onChange={(e) => setTerm(e.target.value)}
                label="Buscar"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} sm={12} lg={12}>
        {datosCargados ? (
          <TTareas
            rows={Datar}
            termc={term}
            history={props.history}
            id={'Propietario'}
          />
        ) : (
          <Grid container justify="center">
            <CircularProgress />
            <br />
            <Typography>Cargando...</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
export default MisTareas;

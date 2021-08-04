import React, { useState, useEffect, useRef } from 'react';
import Container from '@material-ui/core/Container';
import { CircularProgress, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import style from '../../Tools/Style';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { obtenerContactos } from '../../../actions/ClientesAction';
import { useStateValue } from '../../../contexto/store';
import TContactos from './TContactos';
const ContactosPrincipal = (props) => {
  const mounted = useRef(true);
  const [term, setTerm] = useState('');
  const [{ sesionUsuario }] = useStateValue();
  const [DataC, setDataC] = useState([]);
  const [datosCargados, setDatosCargados] = useState(false);
  const abrirNuevo = () => {
    props.history.push('/contactosNuevo');
  };
  useEffect(() => {
    if (mounted.current) {
      const usuario = sesionUsuario.usuario.id;
      obtenerContactos(usuario).then((response) => {
        if (response.status === 200) {
          setDataC(response.data);
          setDatosCargados(true);
        } else {
          console.log('no cargo nada');
        }
      });
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, [sesionUsuario]);
  return (
    <Container xs={12} md={6} component="main" justify="center">
      <br></br>
      <Typography align="center" component="h1" variant="h6">
        Contactos de {sesionUsuario.usuario.nombrecompleto}
      </Typography>
      <Grid item xs={12} md={6}>
        <Button
          style={style.submit.submitnuevo}
          variant="contained"
          color="primary"
          onClick={abrirNuevo}
        >
          Nuevo Contacto
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <br />
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SearchIcon />
          </Grid>
          <Grid item xs={12} md={6}>
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
      <br />
      <Grid item xs={12}>
        {datosCargados ? (
          <TContactos rows={DataC} termc={term} history={props.history} />
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
export default ContactosPrincipal;

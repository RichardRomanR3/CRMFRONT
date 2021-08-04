import React, { useState, useEffect, useRef } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import style from '../../Tools/Style';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { obtenerClientes } from '../../../actions/ClientesAction';
import TClientes from './TClientes';
// FERNADO COLUCCI
const ClientesPrincipal = (props) => {
  const mounted = useRef(true);
  const [Datar, setDatar] = useState([]);
  const [term, setTerm] = useState('');
  const [datosCargados, setDatosCargados] = useState(false);
  useEffect(() => {
    if (mounted.current) {
      obtenerClientes().then((response) => {
        if (response.status === 200) {
          const Data = response.data;
          setDatar(Data);
          setDatosCargados(true);
        } else {
          setDatosCargados(false);
        }
      });
    }
    return function cleaunp() {
      mounted.current = false;
    };
  }, []);

  return (
    <Container xs={12} md={6} component="main" justify="center">
      <br></br>
      <Typography align="center" component="h1" variant="h6">
        Clientes
      </Typography>
      <Grid item xs={12} md={6}>
        <Button
          style={style.submit.submitnuevo}
          variant="contained"
          color="primary"
          component={Link}
          to="/clienteNuevo"
        >
          Nuevo Cliente
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
          <TClientes
            rows={Datar}
            termc={term}
            history={props.history}
          ></TClientes>
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
export default withRouter(ClientesPrincipal);

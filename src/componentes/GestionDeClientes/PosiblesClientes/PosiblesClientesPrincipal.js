import React, { useState, useEffect, useRef } from 'react';
import TPosiblesClientes from './TPosiblesClientes';
import Container from '@material-ui/core/Container';
import { CircularProgress, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import style from '../../Tools/Style';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { obtenerPosiblesClientes } from '../../../actions/ClientesAction';
import { useStateValue } from '../../../contexto/store';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
const PosiblesClientesPrincipal = (props) => {
  const mounted = useRef(true);
  const [term, setTerm] = useState('');
  const [{ sesionUsuario }] = useStateValue();
  const [DataPc, setDataPc] = useState([]);
  const [datosCargados, setDatosCargados] = useState(false);
  useEffect(() => {
    if (mounted.current) {
      const usuario = sesionUsuario.usuario.id;
      obtenerPosiblesClientes(usuario).then((response) => {
        if (response.status === 200) {
          setDataPc(response.data);
          setDatosCargados(true);
        } else {
          console.log('no cargo nada');
        }
      });
    }
    return function cleanu() {
      mounted.current = false;
    };
  }, [sesionUsuario]);
  return (
    <Container xs={12} md={6} component="main" justify="center">
      <br></br>
      <Typography align="center" component="h1" variant="h6">
        Posibles Clientes
      </Typography>
      <Grid item xs={12} md={6}>
        <Button
          style={style.submit.submitnuevo}
          variant="contained"
          color="primary"
          component={Link}
          to="/posibleClienteNuevo"
        >
          Nuevo Posible Cliente
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <br />
        <Grid container  alignItems="flex-end" direction="row">
          <Grid item>
            <SearchIcon />
          </Grid>
          <Grid item>
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
          <TPosiblesClientes
            rows={DataPc}
            termc={term}
            history={props.history}
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
export default withRouter(PosiblesClientesPrincipal);

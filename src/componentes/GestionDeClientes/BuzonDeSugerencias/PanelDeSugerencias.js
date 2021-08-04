import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import TSugerencias from './TSugerencias';
import SearchIcon from '@material-ui/icons/Search';
import style from '../../Tools/Style';
import { listarSugerencias } from '../../../actions/SugerenciasAction';
export default function PanelDeSugerencias() {
  const mounted = useRef(true);
  const [DataS, setDataS] = useState([]);
  const [term, setTerm] = useState('');
  const [datosCargados, setDatosCargados] = useState(false);
  useEffect(() => {
    if (mounted.current) {
      listarSugerencias().then((response) => {
        if (response.status === 200) {
          setDataS(response.data);
          setDatosCargados(true);
        }
      });
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, []);
  return (
    <Container justify="center" maxWidth="md">
      <br />
      <br />
      <Typography variant="h5" align="center">
        Reportes sobre Clientes
      </Typography>
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
      {datosCargados ? (
        <TSugerencias term={term} rows={DataS} />
      ) : (
        <Grid container justify="center">
          <CircularProgress />
          <br />
          <Typography>Cargando...</Typography>
        </Grid>
      )}
    </Container>
  );
}

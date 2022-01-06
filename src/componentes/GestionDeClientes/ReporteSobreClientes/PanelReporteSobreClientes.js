import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import TSugerencias from './TReporteSobreClientes';
import SearchIcon from '@material-ui/icons/Search';
import style from '../../Tools/Style';
import { listarSugerencias } from '../../../actions/SugerenciasAction';
export default function PanelReporteSobreClientes() {
  const mounted = useRef(true);
  const [DataS, setDataS] = useState([]);
  const [term, setTerm] = useState('');
  const [datosCargados, setDatosCargados] = useState(false);
  useEffect(() => {
    if (mounted.current) {
      ObtenerReportes();
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, []);

  const ObtenerReportes=()=>{
    listarSugerencias().then((response) => {
      if (response.status === 200) {
        setDataS(response.data);
        setDatosCargados(true);
      }
    });
  }
  return (
    <Container justify="center" >
      <br />
      <br />
      <Typography variant="h5" align="center">
        Reportes sobre Clientes
      </Typography>
      <Grid container alignItems="flex-end" direction='row'>
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
      <br/>
      {datosCargados ? (
        <TSugerencias term={term} rows={DataS} ObtenerReportes={ObtenerReportes}/>
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

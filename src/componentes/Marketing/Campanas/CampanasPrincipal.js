import React, { useState, useEffect, useRef } from 'react';
import { obtenerCampanas } from '../../../actions/CampanasAction';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import style from '../../Tools/Style.js';
import TCampanas from './TCampanas.js';
export default function CampanasPrincipal(props) {
  const mounted = useRef(true);
  const [Data, setData] = useState([]);
  const [term, setTerm] = useState('');
  const [datosCargados, setDatosCargados] = useState(false);
  const nuevaCampana = () => {
    props.history.push('/nuevaCampana');
  };
  useEffect(() => {
    if (mounted.current) {
      obtenerCampanas().then((response) => {
        if (response.status === 200) {
          setData(response.data);
          setDatosCargados(true);
        } else {
          console.log('NO CARGO NADA');
        }
      });
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, []);
  return (
    <Container>
      <br />
      <Typography align="center" component="h1" variant="h6">
        Panel Principal de Campañas
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Button
            style={style.submit.submitnuevo}
            variant="contained"
            color="primary"
            onClick={nuevaCampana}
          >
            Nueva Campaña
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
          <TCampanas rows={Data} termc={term} history={props.history} />
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
}

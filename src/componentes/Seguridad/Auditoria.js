import React, { useRef, useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import TAuditoria from './TAuditoria';
import { ListarAuditoria } from '../../actions/AuditoriaAction';
const useStyles = makeStyles((theme) => ({
  TextField: {
    width: 300,
    [theme.breakpoints.down('md')]: {
      width: 250,
    },
  },
}));
export default function Auditoria(props) {
  const classes = useStyles();
  const mounted = useRef(true);
  const [DataA, setDataA] = useState([]);
  const [term, setTerm] = useState('');
  const [datosCargados, setDatosCargados] = useState(false);
  useEffect(() => {
    if (mounted.current) {
      ListarAuditoria().then((response) => {
        if (response.status === 200) {
          setDataA(response.data);
          setDatosCargados(true);
        } else {
          console.log('error en consulta');
        }
      });
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, [DataA]);
  return (
    <Container maxWidth="md">
      <br />
      <Typography align="center" variant="h5">
        Panel de Auditoria
      </Typography>
      <br />
      <br />

      <Grid container justify="flex-start">
        <br />
        <br />
        <br />
        <br />
        <Grid item lg={12} md={12} xs={12} sm={12}>
          <Search style={{ fontSize: 40, marginTop: 5 }} />
          <TextField
            className={classes.TextField}
            variant="outlined"
            onChange={(e) => setTerm(e.target.value)}
            label="Buscar"
            color="primary"
          >
            Buscar
          </TextField>
        </Grid>
        <Grid item lg={12} md={12} xs={12} sm={12}>
          {datosCargados ? (
            <TAuditoria rows={DataA} term={term} />
          ) : (
            <Grid container justify="center">
              <CircularProgress />
              <br />
              <Typography>Cargando...</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

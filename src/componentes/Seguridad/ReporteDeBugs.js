import {
  Container,
  Typography,
  TextareaAutosize,
  Grid,
  Button,
} from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react';
export default function ReporteDeBugs() {
  const mounted = useRef(true);
  const [reporte, setReporte] = useState({
    bug: '',
  });

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setReporte((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (mounted.current) {
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, []);
  return (
    <Container component="main" >
      <br />
      <Typography variant="h5" align="center">
        Hubo algun error en el sistema???
      </Typography>
      <Typography variant="h5" align="center">
        Reportalo aqui:{' '}
      </Typography>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextareaAutosize
            name="bug"
            value={reporte.bug}
            onChange={ingresarValoresMemoria}
            variant="outlined"
            style={{ width: '100%' }}
            rowsMin={10}
            placeholder="Escriba aqui su reporte..."
          />
        </Grid>
        <Grid container justify="center">
          <Grid item lg={3} md={3} sm={3} xs={3}></Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
          <br/>
            <Button color="primary" fullWidth variant="contained">
              Reportar
            </Button>
         
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={3}></Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

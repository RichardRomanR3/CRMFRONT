import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';
import {
  ModificarAlerta,
  obtenerAlertaActual,
} from '../../../actions/AlertasAction';
import { useStateValue } from '../../../contexto/store';
export default function ConfiguracionAlerta() {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [tipodeTiempo, setTipoDeTiempo] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [selectTiempo, setSelectTiempo] = useState([]);
  const [minutos, setMinutos] = useState([]);
  const [horas, setHoras] = useState([]);
  const [minutosSeleccionados, setMinutosSeleccionados] = useState('');
  const [mensajeTiempo, setMensajeTiempo] = useState('');
  const selectTipoTiempohandleChange = (event) => {
    setTipoSeleccionado(event.target.value);
    if (event.target.value === 'Hora(s)') {
      setSelectTiempo(horas);
    } else {
      setSelectTiempo(minutos);
    }
  };
  const minutosHandleChange = (event) => {
    setMinutosSeleccionados(event.target.value);
  };
  const cambiarAlerta = () => {
    const objeto = {
      minutosalerta: parseInt(minutosSeleccionados),
    };
    ModificarAlerta(objeto, sesionUsuario.usuario.id).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se cambio la configuracion de la Alerta',
          },
        });
        window.location.reload();
      }
    });
  };
  useEffect(() => {
    setTipoDeTiempo([
      { id: 1, tipo: 'Minuto(s)' },
      { id: 2, tipo: 'Hora(s)' },
    ]);

    setMinutos([
      { id: 0, minutos: 1, label: '1' },
      { id: 1, minutos: 2, label: '2' },
      { id: 2, minutos: 3, label: '3' },
      { id: 3, minutos: 4, label: '4' },
      { id: 4, minutos: 5, label: '5' },
      { id: 5, minutos: 6, label: '6' },
      { id: 6, minutos: 7, label: '7' },
      { id: 7, minutos: 8, label: '8' },
      { id: 8, minutos: 9, label: '9' },
      { id: 9, minutos: 10, label: '10' },
      { id: 10, minutos: 11, label: '11' },
      { id: 11, minutos: 12, label: '12' },
      { id: 12, minutos: 13, label: '13' },
      { id: 13, minutos: 14, label: '14' },
      { id: 14, minutos: 15, label: '15' },
      { id: 15, minutos: 16, label: '16' },
      { id: 16, minutos: 17, label: '17' },
      { id: 17, minutos: 18, label: '18' },
      { id: 18, minutos: 19, label: '19' },
      { id: 19, minutos: 20, label: '20' },
      { id: 20, minutos: 21, label: '21' },
      { id: 21, minutos: 22, label: '22' },
      { id: 22, minutos: 23, label: '23' },
      { id: 23, minutos: 24, label: '24' },
      { id: 24, minutos: 25, label: '25' },
      { id: 25, minutos: 26, label: '26' },
      { id: 26, minutos: 27, label: '27' },
      { id: 27, minutos: 28, label: '28' },
      { id: 28, minutos: 29, label: '29' },
      { id: 29, minutos: 30, label: '30' },
      { id: 30, minutos: 31, label: '31' },
      { id: 31, minutos: 32, label: '32' },
      { id: 32, minutos: 33, label: '33' },
      { id: 33, minutos: 34, label: '34' },
      { id: 34, minutos: 35, label: '35' },
      { id: 35, minutos: 36, label: '36' },
      { id: 36, minutos: 37, label: '37' },
      { id: 37, minutos: 38, label: '38' },
      { id: 38, minutos: 39, label: '39' },
      { id: 39, minutos: 40, label: '40' },
      { id: 40, minutos: 41, label: '41' },
      { id: 41, minutos: 42, label: '42' },
      { id: 42, minutos: 43, label: '43' },
      { id: 43, minutos: 44, label: '44' },
      { id: 44, minutos: 45, label: '45' },
      { id: 45, minutos: 46, label: '46' },
      { id: 46, minutos: 47, label: '47' },
      { id: 47, minutos: 48, label: '48' },
      { id: 48, minutos: 49, label: '49' },
      { id: 49, minutos: 50, label: '50' },
      { id: 50, minutos: 51, label: '51' },
      { id: 51, minutos: 52, label: '52' },
      { id: 52, minutos: 53, label: '53' },
      { id: 53, minutos: 54, label: '54' },
      { id: 54, minutos: 55, label: '55' },
      { id: 55, minutos: 56, label: '56' },
      { id: 56, minutos: 57, label: '57' },
      { id: 57, minutos: 58, label: '58' },
      { id: 58, minutos: 59, label: '59' },
      { id: 59, minutos: 60, label: '60' },
    ]);

    setHoras([
      { id: 0, minutos: 60, label: '1' },
      { id: 1, minutos: 120, label: '2' },
      { id: 2, minutos: 180, label: '3' },
      { id: 3, minutos: 240, label: '4' },
      { id: 4, minutos: 300, label: '5' },
      { id: 5, minutos: 360, label: '6' },
    ]);
    obtenerAlertaActual(sesionUsuario.usuario.id).then((response) => {
      if (response.status === 200) {
        if (response.data[0].minutosalerta < 60) {
          setMensajeTiempo(response.data[0].minutosalerta + ' Minutos');
        } else if (response.data[0].minutosalerta === 60) {
          setMensajeTiempo('1 Hora(s)');
        } else if (response.data[0].minutosalerta === 120) {
          setMensajeTiempo('2 Hora(s)');
        } else if (response.data[0].minutosalerta === 180) {
          setMensajeTiempo('3 Hora(s)');
        } else if (response.data[0].minutosalerta === 240) {
          setMensajeTiempo('4 Hora(s)');
        } else if (response.data[0].minutosalerta === 300) {
          setMensajeTiempo('5 Hora(s)');
        } else if (response.data[0].minutosalerta === 360) {
          setMensajeTiempo('5 Hora(s)');
        } else {
          console.log('ERROR DESCONOCIDO');
        }
      }
    });
  }, [sesionUsuario]);
  return (
    <Container maxWidth="md" justify="center">
      <br />
      <Typography variant="h5" align="center">
        Configurar tiempo de Alerta
      </Typography>
      <br />
      <Grid container spacing={3} direction="row">
        <Grid item lg={2} md={2}></Grid>
        <Typography variant="h5" style={{ marginTop: 20 }}>
          Avisarme:{' '}
        </Typography>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <FormControl variant="outlined" fullWidth>
            <Select value={minutosSeleccionados} onChange={minutosHandleChange}>
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              {selectTiempo.map((tiempo) => (
                <MenuItem key={tiempo.id} value={tiempo.minutos}>
                  {tiempo.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <FormControl variant="outlined" fullWidth>
            <Select
              value={tipoSeleccionado}
              onChange={selectTipoTiempohandleChange}
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              {tipodeTiempo.map((tiempo) => (
                <MenuItem key={tiempo.id} value={tiempo.tipo}>
                  {tiempo.tipo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Typography variant="h5" style={{ marginTop: 20 }}>
          Antes
        </Typography>
        <br /> <br /> <br />
        <Grid container justify="center">
          <Typography align="center" variant="h6">
            Configuracion Actual de la Alerta: {mensajeTiempo}
          </Typography>
          <br />
        </Grid>
        <Grid container justify="center">
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={cambiarAlerta}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

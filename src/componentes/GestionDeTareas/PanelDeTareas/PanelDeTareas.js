import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Radio,
  CircularProgress,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import style from '../../Tools/Style.js';
import { useStateValue } from '../../../contexto/store.js';
import {
  obtenerTareasGenerales,
  obtenerTareasGeneralesAsignadas,
} from '../../../actions/TareasAction.js';
import TTareas from '../TTareas';
export default function PanelDeTareas(props) {
  //eslint-disable-next-line
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [radioValor, setRadioValor] = useState('Todas');
  const [term, setTerm] = useState('');
  const [Datat, setDatat] = useState([]);
  const [datosCargados, setDatosCargados] = useState(false);
  const radioValorHandleChange = (event) => {
    setRadioValor(event.target.value);
  };
  useEffect(() => {
    switch (radioValor) {
      case 'Todas':
        setDatosCargados(false);
        obtenerTareasGenerales().then((response) => {
          if (response.status === 200) {
            setDatat(response.data);
            setDatosCargados(true);
          } else {
            console.log('NO CARGO TAREAS GENERALES');
          }
        });
        break;
      case 'AsignadoPor':
        setDatosCargados(false);
        obtenerTareasGeneralesAsignadas(sesionUsuario.usuario.id).then(
          (response) => {
            if (response.status === 200) {
              setDatat(response.data);
              setDatosCargados(true);
            } else {
              console.log('NO CARGO TAREAS ASIGNADAS POR');
            }
          }
        );
        break;
      default:
        console.log('ERROR EN SWITCH CASE');
    }
  }, [sesionUsuario, radioValor]);
  return (
    <Container justify="center">
      <br />
      <Typography align="center" component="h1" variant="h6">
        Panel General de Tareas
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <br />
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <SearchIcon />
            </Grid>

            <TextField
              multiline
              name="term"
              style={style.TextField}
              onChange={(e) => setTerm(e.target.value)}
              label="Buscar"
            />
            <Typography component={'div'}>
              Todas las Tareas:
              <Radio
                checked={radioValor === 'Todas'}
                onChange={radioValorHandleChange}
                value="Todas"
                color="primary"
              />
              Tareas Asignadas por {sesionUsuario.usuario.nombrecompleto}:
              <Radio
                checked={radioValor === 'AsignadoPor'}
                onChange={radioValorHandleChange}
                value="AsignadoPor"
                color="primary"
              />
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          {datosCargados ? (
            <TTareas
              rows={Datat}
              termc={term}
              history={props.history}
              id={'Visitante'}
            />
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

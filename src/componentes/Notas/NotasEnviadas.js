import React, { useState, useEffect, useRef } from 'react';
import { Typography, Container, Paper } from '@material-ui/core';
import {
  obtenerNotasDelDiaUsuarioEnv,
  obtenerNotasPorFechaEnv,
} from '../../actions/NotasAction';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { obtenerUsuarioConImagen } from '../../actions/UsuariosAction';
import { useStateValue } from '../../contexto/store';
import { downloadFile } from '../../actions/ArchivosAction';
import { obtenerDatosUsuario } from '../../actions/UsuariosAction';
const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
    borderRadius:10,
    marginTop:'10px'
  },
  list: {
    marginBottom: theme.spacing(2),
  },
}));
const NotasEnviadas = () => {
  const classes = useStyles();
  const [lista, setLista] = useState([]);
  const [{ sesionUsuario }] = useStateValue();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const mounted = useRef(true);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setLista([]);
    let fecha =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      date.getDate().toString().padStart(2, '0') +
      'T' +
      date.getHours().toString().padStart(2, '0') +
      ':' +
      date.getMinutes().toString().padStart(2, '0') +
      ':00';
    setLista([]);
    obtenerNotasPorFechaEnv(fecha, sesionUsuario.usuario.userName).then(
      (response) => {
        if (response.status === 200) {
          response.data.map((data) => {
            if (
              data.archivoUrl === 'undefined' ||
              data.archivoUrl === undefined ||
              data.archivoUrl === null
            ) {
              obtenerUsuarioConImagen(data.remitenteUserName).then(
                (response) => {
                  obtenerDatosUsuario(data.destinatarioUserName).then(
                    (response2) => {
                      setLista((anterior) => [
                        ...anterior,
                        {
                          Texto: data.texto,
                          UserName: response.data.userName,
                          Token: response.data.token,
                          Email: response.data.email,
                          NOMBRECOMPLETO: response.data.nombrecompleto,
                          imagenPerfil: response.data.imagenPerfil,
                          Fecha: data.fecgra,
                          Difusion: data.difusion,
                          Id: data.notA_Id,
                          Leido: data.leido,
                          destinatario: response2.data.nombrecompleto,
                        },
                      ]);
                    }
                  );
                }
              );
            } else {
              obtenerUsuarioConImagen(data.remitenteUserName).then(
                (response) => {
                  obtenerDatosUsuario(data.destinatarioUserName).then(
                    (response2) => {
                      setLista((anterior) => [
                        ...anterior,
                        {
                          Archivo: data.archivoUrl,
                          Texto: data.texto,
                          UserName: response.data.userName,
                          Token: response.data.token,
                          Email: response.data.email,
                          NOMBRECOMPLETO: response.data.nombrecompleto,
                          imagenPerfil: response.data.imagenPerfil,
                          Fecha: data.fecgra,
                          Difusion: data.difusion,
                          Id: data.notA_Id,
                          Leido: data.leido,
                          destinatario: response2.data.nombrecompleto,
                        },
                      ]);
                    }
                  );
                }
              );
            }
            return lista;
          });
        }
      }
    );
  };
  const descargarArchivo = (url) => {
    downloadFile(url);
  };
  useEffect(() => {
    if (mounted.current) {
      obtenerNotasDelDiaUsuarioEnv(sesionUsuario.usuario.userName).then(
        (response) => {
          if (response.status === 200) {
            response.data.map((data) => {
              if (
                data.archivoUrl === 'undefined' ||
                data.archivoUrl === undefined ||
                data.archivoUrl === null
              ) {
                obtenerUsuarioConImagen(data.remitenteUserName).then(
                  (response) => {
                    obtenerDatosUsuario(data.destinatarioUserName).then(
                      (response2) => {
                        setLista((anterior) => [
                          ...anterior,
                          {
                            Texto: data.texto,
                            UserName: response.data.userName,
                            Token: response.data.token,
                            Email: response.data.email,
                            NOMBRECOMPLETO: response.data.nombrecompleto,
                            imagenPerfil: response.data.imagenPerfil,
                            Fecha: data.fecgra,
                            Difusion: data.difusion,
                            Id: data.notA_Id,
                            Leido: data.leido,
                            destinatario: response2.data.nombrecompleto,
                          },
                        ]);
                      }
                    );
                  }
                );
              } else {
                obtenerUsuarioConImagen(data.remitenteUserName).then(
                  (response) => {
                    obtenerDatosUsuario(data.destinatarioUserName).then(
                      (response2) => {
                        setLista((anterior) => [
                          ...anterior,
                          {
                            Archivo: data.archivoUrl,
                            Texto: data.texto,
                            UserName: response.data.userName,
                            Token: response.data.token,
                            Email: response.data.email,
                            NOMBRECOMPLETO: response.data.nombrecompleto,
                            imagenPerfil: response.data.imagenPerfil,
                            Fecha: data.fecgra,
                            Difusion: data.difusion,
                            Id: data.notA_Id,
                            Leido: data.leido,
                            destinatario: response2.data.nombrecompleto,
                          },
                        ]);
                      }
                    );
                  }
                );
              }
              return lista;
            });
          }
        }
      );
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, [lista, sesionUsuario]);

  return (
    <Container>
      <Paper square className={classes.paper}>
        <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
          <Grid container direction='row' justifyContent='center' alignContent='center'>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Ver Notas por Fecha"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <Typography className={classes.text} variant="h6" gutterBottom>
          Notas enviadas por {sesionUsuario.usuario.nombrecompleto}
        </Typography>
        <List className={classes.list}>
          {lista.map((lista) => (
            <ListItem key={lista.Fecha}>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src={lista.imagenPerfil} />
              </ListItemAvatar>
              <ListItemText
                primary={'Nota de ' + lista.NOMBRECOMPLETO + ': '}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {lista.Texto}
                      <br />
                    </Typography>
                    {' Enviado a ' + lista.destinatario + ', '}
                    {'a las ' + lista.Fecha.substr(11, 6) + ' hs'}
                    {lista.leido !== null ? ', Leido' : 'No Leido'}
                  </React.Fragment>
                }
              />
              {lista.Archivo === undefined ||
              lista.Archivo === 'undefined' ||
              lista.Archivo === null ? null : (
                <Button
                  color="primary"
                  onClick={() => descargarArchivo(lista.Archivo)}
                >
                  Descargar Archivo Adjunto
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};
export default NotasEnviadas;

import React, { useState, useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import { Typography, Container, Paper } from '@material-ui/core';
import {
  obtenerNotasDelDiaUsuario,
  obtenerNotasNoLeidas,
  obtenerNotasPorFecha,
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
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Check from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { obtenerUsuarioConImagen } from '../../actions/UsuariosAction';
import { useStateValue } from '../../contexto/store';
import { downloadFile } from '../../actions/ArchivosAction';
import { leerNota } from '../../actions/NotasAction';
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
const MisNotas = () => {
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
    obtenerNotasPorFecha(fecha, sesionUsuario.usuario.userName).then(
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
                    },
                  ]);
                }
              );
            } else {
              obtenerUsuarioConImagen(data.remitenteUserName).then(
                (response) => {
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
                    },
                  ]);
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
  const marcarComoLeido = (lista) => {
    const objeto = {
      DIFUSION: lista.Difusion,
      NOMBRECOMPLETO: sesionUsuario.usuario.nombrecompleto,
      NOTA_Id: lista.Id,
    };
    leerNota(objeto).then((response) => {
      if (response.status === 200) {
        setLista([]);
        obtenerNotasDelDiaUsuario(sesionUsuario.usuario.userName).then(
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
                        },
                      ]);
                    }
                  );
                } else {
                  obtenerUsuarioConImagen(data.remitenteUserName).then(
                    (response) => {
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
                        },
                      ]);
                    }
                  );
                }
                return lista;
              });
            }
          }
        );
        let objeto = {
          USUARIOASIGNADO: sesionUsuario.usuario.userName,
          UserName: sesionUsuario.usuario.userName,
        };
        obtenerNotasNoLeidas(objeto);
      } else {
        console.log('no se MARCO COMO LEIDO');
      }
    });
  };

  useEffect(() => {
    if (mounted.current) {
      obtenerNotasDelDiaUsuario(sesionUsuario.usuario.userName).then(
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
                      },
                    ]);
                  }
                );
              } else {
                obtenerUsuarioConImagen(data.remitenteUserName).then(
                  (response) => {
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
                      },
                    ]);
                  }
                );
              }
              return lista;
            });
          }
        }
      );
      const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(
          'http://localhost:5000/chatHub?username=' +
            sesionUsuario.usuario.userName
        )
        .build();
      hubConnection
        .start()
        .catch((err) => console.error('SignalR Connection Error: ', err));
      hubConnection.on('EnviandoUsu', (NOTA) => {
        obtenerUsuarioConImagen(NOTA.remitenteUserName).then((response) => {
          if (
            NOTA.archivoUrl === undefined ||
            NOTA.archivoUrl === 'undefined' ||
            NOTA.archivoUrl === null
          ) {
            setLista((anterior) => [
              ...anterior,
              {
                Texto: NOTA.texto,
                UserName: response.data.userName,
                Token: response.data.token,
                Email: response.data.email,
                NOMBRECOMPLETO: response.data.nombrecompleto,
                imagenPerfil: response.data.imagenPerfil,
                Fecha: NOTA.fecgra,
                Difusion: NOTA.difusion,
                Id: NOTA.notA_Id,
                Leido: NOTA.leido,
              },
            ]);
          } else {
            setLista((anterior) => [
              ...anterior,
              {
                Archivo: NOTA.archivoUrl,
                Texto: NOTA.texto,
                UserName: response.data.userName,
                Token: response.data.token,
                Email: response.data.email,
                NOMBRECOMPLETO: response.data.nombrecompleto,
                imagenPerfil: response.data.imagenPerfil,
                Fecha: NOTA.fecgra,
                Difusion: NOTA.difusion,
                Id: NOTA.notA_Id,
                Leido: NOTA.leido,
              },
            ]);
          }
        });
      });
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
          Notas de {sesionUsuario.usuario.nombrecompleto}
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
                    {'A las ' + lista.Fecha.substr(11, 6) + ' hs'}
                  </React.Fragment>
                }
              />
              {lista.Leido === null ||
              lista.Leido === undefined ||
              lista.Leido === 'undefined' ? (
                <Tooltip title="Marcar como Leido">
                  <IconButton onClick={() => marcarComoLeido(lista)}>
                    <Check></Check>
                  </IconButton>
                </Tooltip>
              ) : null}
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
export default MisNotas;

import React, { useState, useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import {
  TextField,
  Typography,
  Container,
  Button,
  Paper,
  Grid,
  Tooltip,
  IconButton,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle,
} from '@material-ui/core';
import {
  contarDifusionesDelDia,
  enviarMensaje,
  obtenerDifusionesDelDia,
  obtenerLeidoPor,
} from '../../actions/NotasAction';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { useStateValue } from '../../contexto/store';
import { obtenerUsuarioConImagen } from '../../actions/UsuariosAction';
import { downloadFile } from '../../actions/ArchivosAction';
import { Visibility } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
}));
const NuevaDifusion = () => {
  const classes = useStyles();
  const [lista, setLista] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [{ sesionUsuario }] = useStateValue();
  const [leidopor, setLeidoPor] = useState([]);
  const [mensaje, setMensaje] = useState({
    Texto: '',
  });
  const dialogHandleClose = () => {
    setOpenDialog(false);
  };
  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setMensaje((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };
  const mounted = useRef(true);
  const Enviar = () => {
    let NOTA = {
      Texto: mensaje.Texto,
      DIFUSION: 'SI',
      RemitenteUserName: sesionUsuario.usuario.userName,
    };
    enviarMensaje(NOTA).then((response) => {
      if (response.status === 200) {
        setMensaje({
          Texto: '',
        });
        contarDifusionesDelDia();
      }
    });
  };
  const descargarArchivo = (url) => {
    downloadFile(url);
  };
  const verLeidoPor = (nota) => {
    obtenerLeidoPor(nota.Id).then((response) => {
      if (response.status === 200) {
        setLeidoPor([]);
        response.data.map((data) => {
          setLeidoPor((anterior) => [...anterior, data.leidopor + ', ']);
          return leidopor;
        });
      }
    });
    setOpenDialog(true);
  };
  useEffect(() => {
    if (mounted.current) {
      obtenerDifusionesDelDia().then((response) => {
        if (response.status === 200) {
          response.data.map((data) => {
            obtenerUsuarioConImagen(data.remitenteUserName).then((response) => {
              setLista((anterior) => [
                ...anterior,
                {
                  Texto: data.texto,
                  UserName: response.data.userName,
                  Token: response.data.token,
                  Email: response.data.email,
                  NOMBRECOMPLETO: response.data.nombrecompleto,
                  imagenPerfil: response.data.imagenPerfil,
                  Id: data.notA_Id,
                  Fecha: data.fecgra,
                },
              ]);
            });
            return null;
          });
        }
      });
      const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(
          'http://localhost:5000/chatHub?username=' +
            sesionUsuario.usuario.userName
        )
        .build();
      hubConnection
        .start()
        .catch((err) => console.error('SignalR Connection Error: ', err));
      hubConnection.on('Enviando', (NOTA) => {
        obtenerUsuarioConImagen(sesionUsuario.usuario.userName).then(
          (response) => {
            setLista((anterior) => [
              ...anterior,
              {
                Texto: NOTA.texto,
                UserName: response.data.userName,
                Token: response.data.token,
                Email: response.data.email,
                NOMBRECOMPLETO: response.data.nombrecompleto,
                imagenPerfil: response.data.imagenPerfil,
                Id: NOTA.notA_Id,
                Fecha: NOTA.fecgra,
              },
            ]);
          }
        );
      });
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, [lista, sesionUsuario]);
  return (
    <Container>
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h6" gutterBottom>
          Nueva Difusion de {sesionUsuario.usuario.nombrecompleto}
        </Typography>

        <List className={classes.list}>
          {lista.map((lista) => (
            <ListItem key={lista.Texto}>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src={lista.imagenPerfil} />
              </ListItemAvatar>
              <ListItemText
                primary={'Difusion de ' + lista.NOMBRECOMPLETO + ': '}
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
              <Tooltip title="Leido por">
                <IconButton onClick={() => verLeidoPor(lista)}>
                  <Visibility></Visibility>
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Paper>
      <br />
      <Grid item xs={12} md={12}>
        <TextField
          fullWidth
          name="Texto"
          value={mensaje.Texto}
          variant="outlined"
          onChange={ingresarValoresMemoria}
          label="Texto"
        />
      </Grid>
      <Grid item xs={3} md={3}>
        <Button color="primary" variant="contained" onClick={Enviar}>
          Enviar
        </Button>
      </Grid>
      <Dialog
        component={'div'}
        open={openDialog}
        onClose={dialogHandleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle component={'div'} id="form-dialog-title">
          Visto Por:{' '}
        </DialogTitle>
        <DialogContent component={'div'}>
          <DialogContentText component={'div'}>
            <Typography>{leidopor}</Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
export default NuevaDifusion;

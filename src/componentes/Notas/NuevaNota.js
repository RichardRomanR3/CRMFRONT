import React, { useState, useEffect, useRef } from 'react';
import {
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  TextareaAutosize,
  CircularProgress,
} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import style from '../Tools/Style';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchIcon from '@material-ui/icons/Search';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import {
  obtenerListaUsuarios,
  obtenerUsuarioConImagen,
} from '../../actions/UsuariosAction';
import { useStateValue } from '../../contexto/store';
import {
  enviarMensajeUsu,
  obtenerNotasNoLeidas,
} from '../../actions/NotasAction';
import { enviarArchivo } from '../../actions/ArchivosAction';
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
const NuevaNota = () => {
  const [term, setTerm] = useState('');
  const classes = useStyles();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  let mounted = useRef(true);
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [nuevaNota, setNuevaNota] = useState({
    Texto: '',
  });
  const [usuarios, setUsuarios] = useState([]);
  const [datosCargados, setDatosCargados] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [para, setPara] = useState({
    destinatario: '',
  });
  const [de, setDe] = useState({
    remitente: '',
  });
  function searchingTerm(term) {
    return function (x) {
      let NOMBRECOMPLETO = '';
      if (x.NOMBRECOMPLETO === null) {
        NOMBRECOMPLETO = '';
      } else {
        NOMBRECOMPLETO = x.NOMBRECOMPLETO;
      }

      return NOMBRECOMPLETO.toLowerCase().includes(term.toLowerCase()) || !term;
    };
  }
  const abrirDialogNota = (usuario) => {
    setPara({
      destinatario: usuario.UserName,
    });
    setDe({
      remitente: sesionUsuario.usuario.userName,
    });
    setOpenDialog(true);
  };
  const cerrarDialogNota = () => {
    setOpenDialog(false);
    setNuevaNota({
      Texto: '',
    });
  };
  const nuevaNotaHandleChange = (e) => {
    const { name, value } = e.target;
    setNuevaNota((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };
  const enviarNota = () => {
    enviarArchivo(file, fileName).then((response) => {
      if (response.status === 200) {
        let objeto = {
          RemitenteUserName: de.remitente,
          DestinatarioUserName: para.destinatario,
          DIFUSION: 'NO',
          Texto: nuevaNota.Texto,
          ArchivoUrl: response.data,
        };
        enviarMensajeUsu(objeto).then((response) => {
          if (response.status === 200) {
            dispatch({
              type: 'OPEN_SNACKBAR',
              openMensaje: {
                open: true,
                mensaje: ' Se envio la Nota al destinatario ',
              },
            });
            let objetoNota = {
              USUARIOASIGNADO: objeto.DestinatarioUserName,
              UserName: objeto.DestinatarioUserName,
            };
            obtenerNotasNoLeidas(objetoNota);
          } else {
            dispatch({
              type: 'OPEN_SNACKBAR',
              openMensaje: {
                open: true,
                mensaje: 'Errores al intentar enviar nota ',
              },
            });
          }
        });
      }
    });
    setOpenDialog(false);
    setNuevaNota({
      Texto: '',
    });
  };
  useEffect(() => {
    if (mounted.current) {
      obtenerListaUsuarios().then((response) => {
        if (response.status === 200) {
          response.data.map((usuario) => {
            obtenerUsuarioConImagen(usuario.userName).then((response) => {
              setUsuarios((anterior) => [
                ...anterior,
                {
                  UserName: response.data.userName,
                  Token: response.data.token,
                  Email: response.data.email,
                  NOMBRECOMPLETO: response.data.nombrecompleto,
                  imagenPerfil: response.data.imagenPerfil,
                },
              ]);
            });
            return null;
          });
          setDatosCargados(true);
        } else {
          console.log('no cargo usuarios');
        }
      });
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, []);
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  return (
    <Container component="main" maxWidth="md" justify="center">
      <br />
      <br />
      <Paper square className={classes.paper}>
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
        <Typography className={classes.text} variant="h6" gutterBottom>
          Dejar Nota a:
        </Typography>
        {datosCargados ? (
          <List className={classes.list}>
            {usuarios.filter(searchingTerm(term)).map((usuario) => (
              <ListItem key={usuario.UserName}>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={usuario.imagenPerfil} />
                </ListItemAvatar>
                <Typography>Usuario: {usuario.NOMBRECOMPLETO}</Typography>
                <Tooltip title="Redactar Nota">
                  <IconButton onClick={() => abrirDialogNota(usuario)}>
                    <CreateIcon />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        ) : (
          <Grid container justify="center">
            <CircularProgress />
            <br />
            <Typography>Cargando...</Typography>
          </Grid>
        )}
      </Paper>
      <div notranslate="true">
        <Dialog
          open={openDialog}
          onClose={cerrarDialogNota}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Nueva nota para: {para.destinatario}{' '}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Redactar nota:</DialogContentText>
            <TextareaAutosize
              style={style.textareaDialog}
              aria-label="maximum height"
              rowsMin={4}
              placeholder="Nota"
              name="Texto"
              value={nuevaNota.Texto}
              autoFocus
              margin="dense"
              id="name"
              aria-multiline
              onChange={nuevaNotaHandleChange}
            />
          </DialogContent>
          <DialogActions>
            <input type="file" onChange={saveFile} />
            <Button
              onClick={cerrarDialogNota}
              variant="contained"
              color="secondary"
            >
              Cancelar
            </Button>

            <Button variant="contained" onClick={enviarNota} color="primary">
              Enviar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  );
};
export default NuevaNota;

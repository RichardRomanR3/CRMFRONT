import React, { useState, useEffect } from 'react';
import { Avatar, TextField, Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {
  CambiarClave,
  enviarMail,
  loginUsuario,
} from '../../actions/UsuariosAction';
import { withRouter } from 'react-router-dom';
import { useStateValue } from '../../contexto/store';
import Image from '../../assets/3900644.jpg';
import Dialog from '@material-ui/core/Dialog';
import { Typography } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">FOLLOW-UP</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    //backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(5),
    backgroundColor: theme.palette.primary.main,
    width: 100,
    height: 100,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();
  //eslint-disable-next-line
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [openDialog, setOpenDialog] = useState(false);
  const [usuario, setUsuario] = useState({
    Email: '',
    Password: '',
  });

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const loginUsuarioBoton = (e) => {
    e.preventDefault();
    if (usuario.Email === '' || usuario.Password === '') {
      dispatch({
        type: 'OPEN_SNACKBAR',
        openMensaje: {
          open: true,
          mensaje: 'Debe llenar todos los campos',
        },
      });
    } else {
      loginUsuario(usuario, dispatch).then((response) => {
        if (response.status === 200) {
          window.localStorage.setItem('token_seguridad', response.data.token);
          props.history.push('/');
        } else {
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje: 'Credenciales incorrectas',
            },
          });
        }
      });
    }
  };

  const enviarClaveNueva = () => {
    let clave = '';
    let letras = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];
    let numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let caracteres = ['!', '@', '#', '$', '%', '&', '*', '(', ')', '_'];
    const letraMayusRand = letras[
      Math.floor(Math.random() * letras.length)
    ].toUpperCase();
    const letraRand = letras[Math.floor(Math.random() * letras.length)];
    const numeroRand = numeros[Math.floor(Math.random() * numeros.length)];
    const caracterRand =
      caracteres[Math.floor(Math.random() * caracteres.length)];

    clave = letraMayusRand + letraRand + numeroRand + caracterRand;
    let objeto = {
      Email: usuario.Email,
      Password: clave,
    };

    CambiarClave(objeto).then((response) => {
      if (response.status === 200) {
        const objetoMail = {
          Email: objeto.Email,
          Subject: 'Clave provisoria de usuario ',
          Body:
            'Estimado usuario esta clave solo es provisoria asegurese de Cambiarla una vez ingrese al sistema Clave : ' +
            objeto.Password +
            ' ',
        };
        enviarMail(objetoMail).then((response) => {
          if (response.status === 200) {
            setOpenDialog(false);
          }
        });
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje:
              'Se envio la contraseña provisoria a su correo electronico',
          },
        });
      } else {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje:
              'Errores al intentar enviar la contraseña verifique que el correo enviado sea el registrado en el sistema',
          },
        });
      }
    });
  };
  useEffect(() => {
    localStorage.removeItem('token_seguridad');
    dispatch({
      type: 'SALIR_SESION',
      nuevoUsuario: null,
      autenticado: false,
    });
  }, [dispatch]);
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h6">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              multiline
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="Email"
              autoComplete="email"
              autoFocus
              value={usuario.Email}
              onChange={ingresarValoresMemoria}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={ingresarValoresMemoria}
              value={usuario.Password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={loginUsuarioBoton}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  onClick={() => setOpenDialog(true)}
                  href="#"
                  variant="body2"
                >
                  Olvido la contraseña?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
          <div notranslate="true">
            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Confirmacion de Correo Electronico
              </DialogTitle>
              <DialogContent>
                <DialogContentText component={'div'}>
                  <Typography component={'div'}>
                    Le enviaremos una contraseña provisoria a su correo
                    electronico a continuacion ingrese su correo
                  </Typography>
                </DialogContentText>
                <TextField
                  label="Correo electronico"
                  fullWidth
                  name="Email"
                  onChange={ingresarValoresMemoria}
                  color="primary"
                  autoFocus
                  value={usuario.Email}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={enviarClaveNueva} color="primary">
                  Enviar
                </Button>
                <Button onClick={() => setOpenDialog(false)} color="secondary">
                  Cancelar
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default withRouter(Login);

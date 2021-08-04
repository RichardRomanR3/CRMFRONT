import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
} from '@material-ui/core';
import style from '../Tools/Style';
import { actualizarUsuario } from '../../actions/UsuariosAction';
import { useStateValue } from '../../contexto/store';
import ReactImageUploadComponent from 'react-images-upload';
import { obtenerDataImagen } from '../../actions/ImagenAction';

const PerfilUsuario = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [usuario, setUsuario] = useState({
    nombrecompleto: '',
    email: '',
    userName: '',
    foto: '',
    password: '',
    confirmarpassword: '',
    imagenPerfil: '',
    fotoUrl: '',
    numerotelefono: '',
  });
  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const guardarUsuario = (e) => {
    e.preventDefault();
    if (
      usuario.password === '' ||
      usuario.confirmarpassword === '' ||
      usuario.password === undefined ||
      usuario.confirmarpassword === undefined
    ) {
      dispatch({
        type: 'OPEN_SNACKBAR',
        openMensaje: {
          open: true,
          mensaje: 'El password o el confirmar no pueden estar vacios ',
        },
      });
    } else if (usuario.password !== '' && usuario.confirmarpassword !== '') {
      const pas = usuario.password.trim();
      const conf = usuario.confirmarpassword.trim();
      if (pas !== conf) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Las contraseñas son distintas',
          },
        });
      } else {
        actualizarUsuario(usuario, dispatch).then((response) => {
          if (response.status === 200) {
            dispatch({
              type: 'OPEN_SNACKBAR',
              openMensaje: {
                open: true,
                mensaje: 'Se guardo exitosamente el Usuario',
              },
            });
            window.localStorage.setItem('token_seguridad', response.data.token);
            setUsuario({
              userName: usuario.userName,
              nombrecompleto: usuario.nombrecompleto,
              password: '',
              email: usuario.email,
              confirmarpassword: '',
              imagenPerfil: usuario.imagenPerfil,
              fotoUrl: usuario.fotoUrl,
              numerotelefono: usuario.numerotelefono,
            });
          } else {
            dispatch({
              type: 'OPEN_SNACKBAR',
              openMensaje: {
                open: true,
                mensaje: 'Errores al intentar guardar ',
              },
            });
          }
        });
      }
    }
  };
  const subirFoto = (imagenes) => {
    const foto = imagenes[0];
    const fotoUrl = URL.createObjectURL(foto);
    obtenerDataImagen(foto).then((respuesta) => {
      setUsuario((anterior) => ({
        ...anterior,
        imagenPerfil: respuesta,
        fotoUrl: fotoUrl,
      }));
    });
  };
  useEffect(() => {
    setUsuario(sesionUsuario.usuario);
    setUsuario((anterior) => ({
      ...anterior,
      confirmarpassword: '',
      password: '',
      imagenPerfil: null,
      fotoUrl: sesionUsuario.usuario.imagenPerfil,
      numerotelefono: sesionUsuario.usuario.numerotelefono
        ? sesionUsuario.usuario.numerotelefono
        : '',
    }));
  }, [sesionUsuario]);
  return (
    <Container component="main" justify="center">
      <div style={style.paper}>
        <Avatar style={style.avatar} src={usuario.fotoUrl} />
        <Typography component="h1" variant="h6">
          Cuenta
        </Typography>
        <br></br>
        <br></br>
        <form style={style.form}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="nombrecompleto"
                value={usuario.nombrecompleto}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Nombre y Apellido"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                disabled={true}
                multiline
                name="userName"
                value={usuario.userName}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Alias"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="password"
                value={usuario.password}
                onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Contraseña"
                autoComplete="current-password"
              />
              <br></br>
              <br></br>
              <br></br>
              <TextField
                name="confirmarpassword"
                value={usuario.confirmarpassword}
                onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Confirmar contraseña "
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="email"
                value={usuario.email}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Email"
              />
              <br></br>
              <br></br>
              <br></br>
              <TextField
                multiline
                name="numerotelefono"
                value={usuario.numerotelefono}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Nro Telefono"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ReactImageUploadComponent
                withIcon={false}
                singleImage={true}
                buttonText="Cambiar Imagen de Perfil"
                onChange={subirFoto}
                imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                maxFileSize={5242880}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={guardarUsuario}
                style={style.submit}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default PerfilUsuario;

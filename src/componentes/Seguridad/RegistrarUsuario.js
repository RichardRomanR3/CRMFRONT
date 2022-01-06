import React, { useState,useEffect,useRef } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import style from '../Tools/Style';
import { registrarUsuario } from '../../actions/UsuariosAction';
import { useStateValue } from '../../contexto/store';
import { clavefuerte } from './ClaveFuerte';
import { ObtenerListaRoles } from '../../actions/RolesAction';
const RegistrarUsuario = (props) => {
  const mounted =useRef(true);
  //eslint-disable-next-line
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [nuevoRol, setNuevoRol] = useState('');
  const selectRolhandleChange = (event) => {
    setNuevoRol(event.target.value);
  };
  const [DataRoles, setDataRoles] = useState([]);
  const [usuario, setUsuario] = useState({
    UserName: '',
    NOMBRECOMPLETO: '',
    Password: '',
    ConfirmarPassword: '',
    Email: '',
    numerotelefono: '',
  });
  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };
  const registrarUsuarioBoton = (e) => {
    e.preventDefault();
    if (
      usuario.UserName === '' ||
      usuario.NOMBRECOMPLETO === '' ||
      usuario.Email === '' ||
      usuario.Password === '' ||
      usuario.ConfirmarPassword === '' ||
      usuario.numerotelefono === '' ||
      nuevoRol === ''
    ) {
      dispatch({
        type: 'OPEN_SNACKBAR',
        openMensaje: {
          open: true,
          mensaje: 'Todos los campos son obligatorios',
        },
      });
    } else if (usuario.Password !== '' && usuario.ConfirmarPassword !== '') {
      const pas = usuario.Password.trim();
      const conf = usuario.ConfirmarPassword.trim();
      if (pas !== conf) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Las contraseñas no coinciden',
          },
        });
      } else {
        if (clavefuerte(pas)) {
          const objetoReg = {
            UserName: usuario.UserName,
            NOMBRECOMPLETO: usuario.NOMBRECOMPLETO,
            EMAIL: usuario.Email,
            Password: usuario.Password,
            NUMEROTELEFONO: usuario.numerotelefono,
            RolNombre:nuevoRol
          };
          registrarUsuario(objetoReg).then((response) => {
            if (response.status === 500) {
              dispatch({
                type: 'OPEN_SNACKBAR',
                openMensaje: {
                  open: true,
                  mensaje:
                    'El ALIAS o el EMAIL ya fueron registrados verifique',
                },
              });
            } else if (response.status === 200) {
              dispatch({
                type: 'OPEN_SNACKBAR',
                openMensaje: {
                  open: true,
                  mensaje: 'Se guardo exitosamente el Usuario',
                },
              });
              setUsuario({
                UserName: '',
                NOMBRECOMPLETO: '',
                Password: '',
                ConfirmarPassword: '',
                Email: '',
                numerotelefono: '',
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
        } else {
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje:
                'La Contraseña no cumple con los requisitos minimos de seguridad',
            },
          });
        }
      }
    }
  };

  useEffect(() => {
    if (mounted.current) {
      ObtenerListaRoles().then((response) => {
        if (response.status === 200) {
          setDataRoles(response.data);
        } else {
          console.log('erro en axios');
        }
      });
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, []);

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <br></br>
        <Typography component="h1" variant="h6">
          Registro de Usuario
        </Typography>
        <br></br>
        <br></br>
        <form style={style.form}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="UserName"
                value={usuario.UserName}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Alias(SIN ESPACIOS)"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="NOMBRECOMPLETO"
                value={usuario.NOMBRECOMPLETO}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Nombre y Apellido"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Tooltip
                enterTouchDelay={10}
                title={
                  <div>
                    LA CONTRASEÑA DEBE TENER:
                    <br />
                    -Al menos una letra en Minuscula
                    <br />
                    -Al menos una letra en Mayuscula
                    <br />
                    -Al menos un numero
                    <br />
                    -Al menos un caracter especial (/,*,-,etc)
                  </div>
                }
              >
                <TextField
                  name="Password"
                  value={usuario.Password}
                  fullWidth
                  onChange={ingresarValoresMemoria}
                  type="password"
                  variant="outlined"
                  label="Contraseña"
                />
              </Tooltip>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="Email"
                value={usuario.Email}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Email"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="ConfirmarPassword"
                fullWidth
                value={usuario.ConfirmarPassword}
                onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                label="Confirmar contraseña "
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="numerotelefono"
                fullWidth
                value={usuario.numerotelefono}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Nro. Telefono *Con codigo de pais(+595) "
              />
            </Grid>
          </Grid>
          <br></br>
          <FormControl variant="outlined" style={style.Select.rol}>
                <InputLabel style={style.Selectrol}>Rol</InputLabel>
                <Select
                  value={nuevoRol}
                  onChange={selectRolhandleChange}
                  label="Rol"
                >
                  <MenuItem value="">
                    <em>Ninguno</em>
                  </MenuItem>
                  {DataRoles.map((rol) => (
                    <MenuItem key={rol.id} value={rol.name}>
                      {rol.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          <br></br>
          <br></br>

          <Grid container justify="center" spacing={4}>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={registrarUsuarioBoton}
                style={style.submit}
              >
                Registrar
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="secondary"
                onClick={()=>props.history.goBack()}
                style={style.submit}
              >
                Volver
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default RegistrarUsuario;

import React, { useState, useEffect, useRef } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import style from '../../Tools/Style';
import { useStateValue } from '../../../contexto/store';
import { insertarPosibleCliente } from '../../../actions/ClientesAction';
import { RegistrarAccion } from '../../../actions/AuditoriaAction';
import DigitoVerificador from '../DigitoVerificador';
import NumberFormat from 'react-number-format';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      decimalSeparator={','}
      thousandSeparator={'.'}
      isNumericString
    />
  );
});

const NuevoPosibleCliente = (props) => {
  const mounted = useRef(true);
  const [rucDisabled,setRucDisabled]=useState(false);
  const [buttonDisabled,setButtonDisabled]=useState(false);
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [cliente, setCliente] = useState({
    NOMBRE: '',
    APELLIDO: '',
    CI: '',
    RUC: '',
    TELEFONO: '',
    DIRECCION: '',
    EMAIL: '',
    USUARIO: '',
    OBSERVACIONES: '',
    PROFESIONORUBRO: '',
    HOBBY: '',
  });
  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setCliente((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };
  const registrarPosibleCliente = () => {
    if (cliente.APELLIDO !== '' || cliente.CI !== '') {
      const usuario = sesionUsuario.usuario.nombrecompleto;
      const objetoNuevo = {
        NOMBRE: cliente.NOMBRE,
        APELLIDO: cliente.APELLIDO,
        CI: cliente.CI,
        RUC: cliente.RUC,
        TELEFONO: cliente.TELEFONO,
        DIRECCION: cliente.DIRECCION,
        EMAIL: cliente.EMAIL,
        OBSERVACIONES: cliente.OBSERVACIONES,
        PROFESIONORUBRO: cliente.PROFESIONORUBRO,
        HOBBY: cliente.HOBBY,
        USUARIO: usuario,
        UsuarioId: sesionUsuario.usuario.id,
      };
      insertarPosibleCliente(objetoNuevo).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje: 'Se guardo con exito el posible cliente ',
            },
          });
          setCliente({
            NOMBRE: '',
            APELLIDO: '',
            CI: '',
            RUC: '',
            TELEFONO: '',
            DIRECCION: '',
            EMAIL: '',
            USUARIO: '',
            OBSERVACIONES: '',
            PROFESIONORUBRO: '',
            HOBBY: '',
          });
          let objetoAudi = {
            usuario: sesionUsuario.usuario.nombrecompleto,
            accion: 'Registro',
            panel: 'Gestion de Clientes',
            tabla: 'POSIBLESCLIENTES',
            filaafectada: 'NUEVO REGISTRO',
            UsuarioId: sesionUsuario.usuario.id,
          };
          RegistrarAccion(objetoAudi);
          volver();
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
            'Los Campos Apellidos y CI son obligatorios Asegurese de llenarlos',
        },
      });
    }
  };
  const volver = () => {
    props.history.goBack();
  };
  useEffect(() => {
    if (mounted.current) {
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, []);
  const calcularRuc=()=>{
    if(cliente.CI && cliente.CI.length<6){
      setCliente((anterior)=>({...anterior,RUC:"NUMERO DE CI NO VALIDO"}));
      setButtonDisabled(true);
      setRucDisabled(true);
    }
   else if(cliente.CI){
      setCliente((anterior)=>({...anterior,RUC:cliente.CI+"-"+DigitoVerificador(cliente.CI)}));
      setButtonDisabled(false);
      setRucDisabled(true);
    }else{
      setCliente((anterior)=>({...anterior,RUC:""}));
      setRucDisabled(false);
      setButtonDisabled(false);
    }
  }
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <br></br>
        <br></br>
        <Typography component="h1" variant="h6">
          Registro de Clientes
        </Typography>
        <br></br>
        <br></br>
        <form style={style.form}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="NOMBRE"
                value={cliente.NOMBRE}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Nombre"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="APELLIDO"
                value={cliente.APELLIDO}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Apellido/Razon Social"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="CI"
                value={cliente.CI}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Nro. Cedula"
                onBlur={calcularRuc}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="RUC"
                value={cliente.RUC}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="RUC"
                disabled={rucDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="TELEFONO"
                value={cliente.TELEFONO}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Telefono"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="DIRECCION"
                value={cliente.DIRECCION}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Direccion"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="EMAIL"
                value={cliente.EMAIL}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Email"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="PROFESIONORUBRO"
                value={cliente.PROFESIONORUBRO}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Profesion/Rubro"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="HOBBY"
                value={cliente.HOBBY}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Hobby?"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextareaAutosize
                name="OBSERVACIONES"
                value={cliente.OBSERVACIONES}
                onChange={ingresarValoresMemoria}
                style={style.textarea}
                variant="outlined"
                aria-label="minimum height"
                rowsMin={4}
                placeholder="Observaciones"
              />
            </Grid>
          </Grid>
          <br></br>
          <br></br>
          <Grid container spacing={4} justify="center">
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={registrarPosibleCliente}
                style={style.submit}
                disabled={buttonDisabled}
              >
                Registrar
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={volver}
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
export default NuevoPosibleCliente;

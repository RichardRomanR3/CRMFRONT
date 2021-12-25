import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Grid,
  Typography,
  FormControl,
  Select,
  InputLabel,
  TextField,
  MenuItem,
  TextareaAutosize,
  Button,
} from '@material-ui/core';
import style from '../../Tools/Style.js';
import { useStateValue } from '../../../contexto/store.js';
import {
  obtenerTiposCampanas,
  registrarCampana,
} from '../../../actions/CampanasAction.js';
import { RegistrarAccion } from '../../../actions/AuditoriaAction.js';
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
      prefix="₲ "
    />
  );
});

export default function NuevaCampana(props) {
  const mounted = useRef(true);
  const [campana, setCampana] = useState({
    id: '',
    CODCAMPANA: 0,
    DESCRICAMPANA: '',
    NUMCAMPANA: '',
    ESTADOCAMPANA: '',
    EMPRESACONTRATADA: '',
    OBJETIVOS: '',
    PRESUPUESTO: '',
  });
  const [geografia, setGeografia] = useState('');
  const [Datag, setDatag] = useState([]);
  const [Datatc, setDatatc] = useState([]);
  const [tipocampana, setTipoCampana] = useState('');
  const [estadocampana, sertEstadoCampana] = useState('');
  //eslint-disable-next-line
  const [{ openSnackBar, sesionUsuario }, dispatch] = useStateValue();

  const selectTipohandleChange = (event) => {
    setTipoCampana(event.target.value);
  };
  const selectGeografiaHandleChange = (event) => {
    setGeografia(event.target.value);
  };
  const selectEstadohandleChange = (event) => {
    sertEstadoCampana(event.target.value);
  };
  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setCampana((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };
  const guardarCampana = (e) => {
    e.preventDefault();
    const objetoCampana = {
      CODCAMPANA: parseInt(campana.CODCAMPANA),
      DESCRICAMPANA: campana.DESCRICAMPANA,
      NUMCAMPANA: campana.NUMCAMPANA,
      ESTADOCAMPANA: estadocampana,
      TIPOCAMPANA_Id: tipocampana,
      EMPRESACONTRATADA: campana.EMPRESACONTRATADA,
      GEOGRAFIA: geografia,
      OBJETIVOS: campana.OBJETIVOS,
      PRESUPUESTO: parseInt(campana.PRESUPUESTO),
    };
    registrarCampana(objetoCampana).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se guardo exitosamente la Campaña',
          },
        });
        setCampana({
          id: '',
          CODCAMPANA: 0,
          DESCRICAMPANA: '',
          NUMCAMPANA: '',
          ESTADOCAMPANA: '',
          EMPRESACONTRATADA: '',
          OBJETIVOS: '',
          PRESUPUESTO: 0.0,
        });
        let objetoAudi = {
          usuario: sesionUsuario.usuario.nombrecompleto,
          accion: 'Registro',
          panel: 'Marketing',
          tabla: 'CAMPAÑAS',
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
  };
  const volver = () => {
    props.history.goBack();
  };
  useEffect(() => {
    if (mounted.current) {
      setDatag([
        { geografia: 'Local' },
        { geografia: 'Regional' },
        { geografia: 'Nacional' },
        { geografia: 'Internacional' },
      ]);
      obtenerTiposCampanas().then((response) => {
        if (response.status === 200) {
          setDatatc(response.data);
        } else {
          console.log('NO CARGO TIPOS CAMPNANAS');
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
        <br></br>
        <Typography component="h1" variant="h6">
          Nueva Campana
        </Typography>
        <br></br>
        <br></br>
        <form style={style.form}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="CODCAMPANA"
                value={campana.CODCAMPANA}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Codigo"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="DESCRICAMPANA"
                value={campana.DESCRICAMPANA}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Descripcion"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="EMPRESACONTRATADA"
                value={campana.EMPRESACONTRATADA}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Empresa Contratada"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Geografia
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={geografia}
                  onChange={selectGeografiaHandleChange}
                  label="Geografia"
                >
                  <MenuItem value="">
                    <em>Ninguna</em>
                  </MenuItem>
                  {Datag.map((geografia) => (
                    <MenuItem
                      key={geografia.geografia}
                      value={geografia.geografia}
                    >
                      {geografia.geografia}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="OBJETIVOS"
                value={campana.OBJETIVOS}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Objetivos"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                multiline
                name="PRESUPUESTO"
                value={campana.PRESUPUESTO}
                fullWidth
                onChange={ingresarValoresMemoria}
                variant="outlined"
                label="Presupuesto"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Tipo de Campaña
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={tipocampana}
                  onChange={selectTipohandleChange}
                  label="Tipo de Campaña"
                >
                  <MenuItem value="">
                    <em>Ninguna</em>
                  </MenuItem>
                  {Datatc.map((tipocampana) => (
                    <MenuItem
                      key={tipocampana.tipocampanA_Id}
                      value={tipocampana.tipocampanA_Id}
                    >
                      {tipocampana.descritipocampana}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Estado
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={estadocampana}
                  onChange={selectEstadohandleChange}
                  label="Estado"
                >
                  <MenuItem value="Activo">
                    <em>Activo</em>
                  </MenuItem>
                  <MenuItem value="Inactivo">
                    <em>Inactivo</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br></br>
          <Grid>
            <TextareaAutosize
              name="NUMCAMPANA"
              value={campana.NUMCAMPANA}
              onChange={ingresarValoresMemoria}
              style={style.textarea}
              variant="outlined"
              rowsMin={4}
              placeholder="Detalles"
            />
          </Grid>
          <br></br>
          <br></br>
          <Grid container spacing={4} justify="center">
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={guardarCampana}
                style={style.submit}
              >
                Guardar
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="secondary"
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
}

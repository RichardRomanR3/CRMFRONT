import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  Button,
} from '@material-ui/core';
import TClientes from '../../GestionDeClientes/Clientes/TClientes';
import style from '../../Tools/Style.js';
import { editarCampana } from '../../../actions/CampanasAction';
import { useStateValue } from '../../../contexto/store';
import { RegistrarAccion } from '../../../actions/AuditoriaAction';
export function PerfilCampana(props) {
  //eslint-disable-next-line
  const [{ openSnackBar, sesionUsuario }, dispatch] = useStateValue();
  const mounted = useRef(true);
  const [geografia, setGeografia] = useState('');
  const [Datag, setDatag] = useState([]);
  const [estadocampana, sertEstadoCampana] = useState('');
  const [estadoBotonClientes, setEstadoBotonClientes] = useState(false);
  const [DataCli, setDataCli] = useState([]);
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
  const mostrarClientes = () => {
    if (estadoBotonClientes === false) {
      setEstadoBotonClientes(true);
    } else {
      setEstadoBotonClientes(false);
    }
  };
  const modificarCampana = (e) => {
    e.preventDefault();
    const objetoModCampana = {
      CODCAMPANA: parseInt(campana.CODCAMPANA),
      DESCRICAMPANA: campana.DESCRICAMPANA,
      ESTADOCAMPANA: estadocampana,
      EMPRESACONTRATADA: campana.EMPRESACONTRATADA,
      GEOGRAFIA: geografia,
      OBJETIVOS: campana.OBJETIVOS,
      PRESUPUESTO: parseInt(campana.PRESUPUESTO),
    };
    editarCampana(campana.id, objetoModCampana).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se modifico exitosamente la Campaña',
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
          accion: 'Modificacion',
          panel: 'Marketing',
          tabla: 'CAMPAÑAS',
          filaafectada: props.location.state.clientE_Id,
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
      setCampana({
        id: props.location.state.campanA_Id,
        CODCAMPANA: props.location.state.codcampana,
        DESCRICAMPANA: props.location.state.descricampana,
        NUMCAMPANA: props.location.state.numcampana,
        ESTADOCAMPANA: props.location.state.estadocampana,
        EMPRESACONTRATADA: props.location.state.empresacontratada,
        OBJETIVOS: props.location.state.objetivos,
        PRESUPUESTO: props.location.state.presupuesto,
      });
      setDataCli(props.location.state.clientesLista);
      setDatag([
        { geografia: 'Local' },
        { geografia: 'Regional' },
        { geografia: 'Nacional' },
        { geografia: 'Internacional' },
      ]);
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, [props]);
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <br></br>
        <br></br>
        <Typography component="h1" variant="h6">
          Modificar Campana
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
              />
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
                onClick={modificarCampana}
                style={style.submit}
                type="submit"
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
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={mostrarClientes}
              style={style.notifications}
            >
              Clientes Ganados por esta Campaña
            </Button>
          </Grid>
        </form>
      </div>
      <Grid item md={12} lg={12}>
        {estadoBotonClientes === true ? (
          <div>
            <br />
            <br />
            <TClientes rows={DataCli} termc={''} />
          </div>
        ) : null}
      </Grid>
    </Container>
  );
}

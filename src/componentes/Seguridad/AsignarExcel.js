import {
  Container,
  Grid,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import style from '../Tools/Style';
import React, { useState, useEffect } from 'react';
import {
  ImpExcelACLIENTES,
  ImpExcelAPOSIBLESCLIENTES,
  ImpExcelAFACTURAS,
  ImpExcelAPRESUPUESTOS,
  ImpExcelAVENTAS,
  verificarExistenciaExcelClientes,
  verificarExistenciaExcelPosiblesClientes,
  verificarExistenciaExcelFacturas,
  verificarExistenciaExcelPresupuestos,
  verificarExistenciaExcelVentas,
} from '../../actions/ExcelAction';
import { useStateValue } from '../../contexto/store';
import ModalAyuda from './ModalAyuda';
import { obtenerListaUsuarios } from '../../actions/UsuariosAction';
export default function AsignarExcel() {
  //eslint-disable-next-line
  const [{ openSnackbar }, dispatch] = useStateValue();
  const [openModal, setOpenModal] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [select, setSelect] = useState('');
  const [Datos, setDatos] = useState([]);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [DataUsu, setDataUsu] = useState([]);

  const importar = () => {
    if (file !== undefined) {
      switch (select) {
        case 'CLIENTES':
          let objetoC = {
            file: file,
            fileName: fileName,
          };
          verificarExistenciaExcelClientes(fileName).then(response=>{
            if(response.status === 200){
              if(response.data.length ===0){
                ImpExcelACLIENTES(objetoC).then((response) => {
                  if (response.status === 200) {
                    dispatch({
                      type: 'OPEN_SNACKBAR',
                      openMensaje: {
                        open: true,
                        mensaje: 'Se cargaron los datos correctamente',
                      },
                    });
                    window.location.reload();
                  }
                });
              }else{
                dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                    open: true,
                    mensaje: 'Ya existe una importacion con ese nombre de Archivo los nombres de Archivos deben ser unicos',
                  },
                });
              }
            }
          })
      
          break;
        case 'POSIBLES CLIENTES':
          let objetoPC = {
            file: file,
            UserName: usuario,
            fileName: fileName,
          };
          verificarExistenciaExcelPosiblesClientes(fileName).then(response=>{
            if(response.status ===200){
              if(response.data.length ===0){
                ImpExcelAPOSIBLESCLIENTES(objetoPC).then((response) => {
                  if (response.status === 200) {
                    dispatch({
                      type: 'OPEN_SNACKBAR',
                      openMensaje: {
                        open: true,
                        mensaje: 'Se cargaron los datos correctamente',
                      },
                    });
                    window.location.reload();
                  }
                });
              }else{
                dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                    open: true,
                    mensaje: 'Ya existe una importacion con ese nombre de Archivo los nombres de Archivos deben ser unicos',
                  },
                });
              }
            }
          })
        
          break;
        case 'FACTURAS':
          let objeto = {
            file: file,
            UserName: usuario,
            fileName: fileName,
          };
          verificarExistenciaExcelFacturas(fileName).then(response=>{
            if(response.status ===200){
              if(response.data.length === 0){
                ImpExcelAFACTURAS(objeto).then((response) => {
                  if (response.status === 200) {
                    dispatch({
                      type: 'OPEN_SNACKBAR',
                      openMensaje: {
                        open: true,
                        mensaje: 'Se cargaron los datos correctamente',
                      },
                    });
                    window.location.reload();
                  }
                });
              }else{
                dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                    open: true,
                    mensaje: 'Ya existe una importacion con ese nombre de Archivo los nombres de Archivos deben ser unicos',
                  },
                });
              }
            }
          })
          
          break;
        case 'PRESUPUESTOS':
          let objetoP = {
            file: file,
            UserName: usuario,
            fileName: fileName,
          };
          verificarExistenciaExcelPresupuestos(fileName).then(response=>{
            if(response.status ===200){
              if(response.data.length ===0){
                ImpExcelAPRESUPUESTOS(objetoP).then((response) => {
                  if (response.status === 200) {
                    dispatch({
                      type: 'OPEN_SNACKBAR',
                      openMensaje: {
                        open: true,
                        mensaje: 'Se cargaron los datos correctamente',
                      },
                    });
                    window.location.reload();
                  }
                });
              }else{
                dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                    open: true,
                    mensaje: 'Ya existe una importacion con ese nombre de Archivo los nombres de Archivos deben ser unicos',
                  },
                });
              }
            }
          })
         
          break;
        case 'VENTAS':
          let objetoV = {
            file: file,
            fileName: fileName,
          };
          verificarExistenciaExcelVentas(fileName).then(response=>{
            if(response.status ===200){
              if(response.data.length ===0){
                ImpExcelAVENTAS(objetoV).then((response) => {
                  if (response.status === 200) {
                    dispatch({
                      type: 'OPEN_SNACKBAR',
                      openMensaje: {
                        open: true,
                        mensaje: 'Se cargaron los datos correctamente',
                      },
                    });
                    window.location.reload();
                  }
                });
              }else{
                dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                    open: true,
                    mensaje: 'Ya existe una importacion con ese nombre de Archivo los nombres de Archivos deben ser unicos',
                  },
                });
              }
            }
          })
          
          break;
        default:
          console.log('ERROR EN SWITCH CASE');
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje: 'Debes seleccionar una Tabla para importar',
            },
          });
      }
    } else {
      dispatch({
        type: 'OPEN_SNACKBAR',
        openMensaje: {
          open: true,
          mensaje: 'Debes seleccionar un archivo para importar',
        },
      });
    }
  };
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const abrirAyuda = () => {
    setOpenModal(true);
  };
  const cerrarModal = () => {
    setOpenModal(false);
  };
  const selectDatosHandleChange = (event) => {
    setSelect(event.target.value);
  };
  useEffect(() => {
    setDatos([
      { descripcion: 'CLIENTES' },
      { descripcion: 'POSIBLES CLIENTES' },
      { descripcion: 'FACTURAS' },
      { descripcion: 'PRESUPUESTOS' },
      { descripcion: 'VENTAS' },
    ]);
    obtenerListaUsuarios().then((response) => {
      if (response.status === 200) {
        setDataUsu(response.data);
      }
    });
  }, []);

  return (
    <Container maxWidth="md" justify="center" style={{marginTop:'10px'}}>
      <Typography align="center" variant="h4">
        {' '}
        Panel de Importacion de Datos
      </Typography>
      <Typography align="center" variant="h6">
        {' '}
        Seleccione el Usuario al cual quiere que se muestren estos Datos (Excepto para la Entidad Clientes) :
      </Typography>
      <Grid container direction="column" alignContent="center">
        <Grid item xs={12} md={12}>
          <Autocomplete
            id="combo-box-demo"
            options={DataUsu}
            getOptionLabel={(DataUsu) => DataUsu.nombrecompleto}
            renderInput={(params) => (
              <TextField
                style={{ width: 300 }}
                {...params}
                label="Buscar Usuarios"
                variant="outlined"
              />
            )}
            onChange={(e, value) => {
              if (value === null) {
                setUsuario('');
              } else {
                setUsuario(value.userName);
              }
            }}
          />
        </Grid>
      </Grid>
      <Typography align="center" variant="h5">
        {' '}
        Seleccione la entidad a la cual quiere agregar datos :
      </Typography>
      <br />
      <Grid container direction="column" alignContent="center">
        <FormControl variant="outlined" style={style.Select}>
          <InputLabel style={style.Select}>Tabla</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={select}
            onChange={selectDatosHandleChange}
            label="Tabla"
          >
            {Datos.map((dato) => (
              <MenuItem key={dato.descripcion} value={dato.descripcion}>
                {dato.descripcion}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <br />
          <input type="file" onChange={saveFile} />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <br />
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={importar}
          >
            Importar
          </Button>
        </Grid>
        <Grid item lg={1} md={1} sm={1} xs={1}>
          <br />
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={abrirAyuda}
          >
            Ayuda
          </Button>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <ModalAyuda open={openModal} handleClose={cerrarModal} />
      </Grid>
    </Container>
  );
}

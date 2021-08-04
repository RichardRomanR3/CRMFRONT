import { Container, Typography,Grid,TextField,FormControl,InputLabel,MenuItem,Select, Button } from '@material-ui/core';
import React,{useState,useEffect,useRef} from 'react';
import moment from 'moment';
import { 
  deleteExcelCLIENTES,
  deleteExcelFACTURAS,
  deleteExcelPOSIBLESCLIENTES,
  deleteExcelPRESUPUESTOS,
  deleteExcelVENTAS,
  ObtenerArchivosFechaClientes, 
  ObtenerArchivosFechaFacturas, 
  ObtenerArchivosFechaPosiblesClientes, 
  ObtenerArchivosFechaPresupuestos, 
  ObtenerArchivosFechaVentas 
} from '../../actions/ExcelAction';
import { useStateValue } from '../../contexto/store';
export default function RevertirExcel(){
    //eslint-disable-next-line
    const [{openSnackBar},dispatch]=useStateValue();
    const mounted = useRef(true);
    const [btn,setBtn]=useState(true);
    const [fechaimportacion,setFechaImportacion]=useState('');
    const [mostrarSelect,setMostrarSelect]=useState(false);
    const [archivos,setArchivos]=useState([]);
    const [nombreArchivo,setNombreArchivo]=useState('');
    const [select, setSelect] = useState('');
    const [Datos,setDatos]=useState([]);
    const ingresarValoresMemoria =(e)=>{
     setFechaImportacion(e.target.value);
     switch(select){
       case 'CLIENTES':
        ObtenerArchivosFechaClientes(moment(e.target.value).format()).then(response=>{
          if(response.status === 200)
          {
            setArchivos(response.data);
          }
        });
         break;
         case 'POSIBLES CLIENTES':
          ObtenerArchivosFechaPosiblesClientes(moment(e.target.value).format()).then(response=>{
            if(response.status === 200)
            {
              setArchivos(response.data);
            }
          });
           break;
           case 'FACTURAS':
            ObtenerArchivosFechaFacturas(moment(e.target.value).format()).then(response=>{
              if(response.status === 200)
              {
                setArchivos(response.data);
              }
            });
             break;
             case 'PRESUPUESTOS':
              ObtenerArchivosFechaPresupuestos(moment(e.target.value).format()).then(response=>{
                if(response.status === 200)
                {
                  setArchivos(response.data);
                }
              });
               break;
               case 'VENTAS':
                ObtenerArchivosFechaVentas(moment(e.target.value).format()).then(response=>{
                  if(response.status === 200)
                  {
                    setArchivos(response.data);
                  }
                });
                 break;
                 default: console.log("ERROR EN SWITCH CASE ")
     }
     setMostrarSelect(true);
     
    }
    const selectArchivohandleChange = (event) => {
        setNombreArchivo(event.target.value);
        setBtn(false);
      };

      const selectDatosHandleChange = (event) => {
        setMostrarSelect(false);
        setArchivos([]);
        setFechaImportacion(' / / ');
        setBtn(true);
        setSelect(event.target.value);
      };
      const revertirExcels = (archivo,fecha)=>{
        const fecgra = moment(fecha).format();
        switch(select){
          case "CLIENTES":
            deleteExcelCLIENTES(archivo,fecgra).then(response=>{
              if(response.status ===200){
                dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                    open: true,
                    mensaje: 'Se revirtio la importacion de los datos',
                  },
                });
                window.location.reload();
              }
            });
            break;
            case "POSIBLES CLIENTES":
            deleteExcelPOSIBLESCLIENTES(archivo,fecgra).then(response=>{
              if(response.status ===200){
                dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                    open: true,
                    mensaje: 'Se revirtio la importacion de los datos',
                  },
                });
                window.location.reload();
              }
            });
            break;
            case "FACTURAS":
            deleteExcelFACTURAS(archivo,fecgra).then(response=>{
              if(response.status ===200){
                dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                    open: true,
                    mensaje: 'Se revirtio la importacion de los datos',
                  },
                });
                window.location.reload();
              }
            });
            break;
            case "PRESUPUESTOS":
              deleteExcelPRESUPUESTOS(archivo,fecgra).then(response=>{
                if(response.status ===200){
                  dispatch({
                    type: 'OPEN_SNACKBAR',
                    openMensaje: {
                      open: true,
                      mensaje: 'Se revirtio la importacion de los datos',
                    },
                  });
                  window.location.reload();
                }
              });
              break;
              case "VENTAS":
                deleteExcelVENTAS(archivo,fecgra).then(response=>{
                  if(response.status ===200){
                    dispatch({
                      type: 'OPEN_SNACKBAR',
                      openMensaje: {
                        open: true,
                        mensaje: 'Se revirtio la importacion de los datos',
                      },
                    });
                    window.location.reload();
                  }
                });
                break;
                default:
                  dispatch({
                    type: 'OPEN_SNACKBAR',
                    openMensaje: {
                      open: true,
                      mensaje: 'Errores al intentar revertir',
                    },
                  });  
        }
        
      }
      useEffect(() => {
          if(mounted.current){
            setDatos([
                { descripcion: 'CLIENTES' },
                { descripcion: 'POSIBLES CLIENTES' },
                { descripcion: 'FACTURAS' },
                { descripcion: 'PRESUPUESTOS' },
                { descripcion: 'VENTAS' },
              ]);
          }
          return function cleanup (){
              mounted.current = false;
          }
      }, [])
    return(
        <Container component='main' maxWidth='md'>
            <br/>
        <Typography align='center' variant='h5'>
        Reversion de Importaciones Por Lotes
        </Typography>
        <br/>
        <Grid container direction='column' spacing={3} justify='center' alignItems='stretch'>
        <Grid item lg={12} md={12} sm={12} xs={12}>
        <FormControl variant="outlined" style={{width:'100%'}}>
          <InputLabel style={{width:'100%'}}>Tabla</InputLabel>
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
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
        <TextField
            fullWidth
            variant="outlined"
            name="fechaimportacion"
            onChange={ingresarValoresMemoria}
            value={fechaimportacion}
            InputLabelProps={{ shrink: true }}
            label="Fecha de Importacion"
            type="date"
          ></TextField>
        </Grid>
        {mostrarSelect ?(
             <Grid item lg={12} md={12} sm={12} xs={12}>
             <FormControl variant="outlined" style={{width:'100%'}} >
             <InputLabel style={{width:'100%'}}>Archivos</InputLabel>
             <Select
               labelId="demo-simple-select-outlined-label"
               id="demo-simple-select-outlined"
               value={nombreArchivo}
               onChange={selectArchivohandleChange}
               label="Archivos"
             >
               {archivos.map((archivo) => (
                 <MenuItem key={archivo.nombreArchivo} value={archivo.nombreArchivo}>
                   {archivo.nombreArchivo}
                 </MenuItem>
               ))}
             </Select>
           </FormControl>
           </Grid>
        ):null}
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <br/>
          <Button
          disabled={btn}
          variant='contained'
          color='primary'
          fullWidth
          onClick={()=>revertirExcels(nombreArchivo,fechaimportacion)}
          >Revertir</Button>
        </Grid>
        </Container>
    );
}
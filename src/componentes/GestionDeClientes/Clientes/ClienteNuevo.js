import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  TextareaAutosize,
} from '@material-ui/core';
import style from '../../Tools/Style';
import { useStateValue } from '../../../contexto/store';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withRouter } from 'react-router-dom';
import { produce } from 'immer';
import { generate } from 'shortid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  obtenerCiudades,
  obtenerBarrios,
  registrarCliente,
  obtenerClientePorCi,
} from '../../../actions/ClientesAction';
import { obtenerCampanas } from '../../../actions/CampanasAction';
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

// FERNADO COLUCCI
const ClienteNuevo = (props) => {
  const [barrioCiu, setBarrioCiu] = useState('');
  const [telefonos, setTelefonos] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [Datar, setDatar] = useState([]);
  const [DataCiu, setDataCiu] = useState([]);
  const [DataBa, setDataBa] = useState([]);
  const [campana, setCampana] = useState('');
  const [redes, setRedes] = useState([]);
  //eslint-disable-next-line
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [buttonDisabled,setButtonDisabled]=useState(false);
  const [rucDisabled,setRucDisabled]=useState(false);
  const [cliente, setCliente] = useState({
    NOMBRE: '',
    APELLIDO: '',
    CI: '',
    RUC: '',
    CAMPANA: '',
    PROFESIONORUBRO: '',
    HOBBY: '',
    OBSERVACIONES: '',
  });
  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setCliente((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const selectCampanahandleChange = (event) => {
    setCampana(event.target.value);
  };
  const registrarClienteBoton = (e) => {
    e.preventDefault();
    let objetoClienteNuevo = {};
    if (
      telefonos[0] === undefined &&
      direcciones[0] === undefined &&
      redes[0] === undefined
    ) {
      objetoClienteNuevo = {
        NOMBRE: cliente.NOMBRE,
        APELLIDO: cliente.APELLIDO,
        CI: cliente.CI,
        RUC: cliente.RUC,
        CAMPANA_Id: campana,
        PROFESIONORUBRO: cliente.PROFESIONORUBRO,
        HOBBY: cliente.HOBBY,
        OBSERVACIONES: cliente.OBSERVACIONES, 
      };
    } else if (
      telefonos[0] !== undefined &&
      direcciones[0] === undefined &&
      redes[0] === undefined
    ) {
      if (
        telefonos[0].DESCRITELEFONO !== '' ||
        telefonos[0].DETALLESTELEFONO !== ''
      ) {
        objetoClienteNuevo = {
          NOMBRE: cliente.NOMBRE,
          APELLIDO: cliente.APELLIDO,
          CI: cliente.CI,
          RUC: cliente.RUC,
          CAMPANA_Id: campana,
          TELEFONOS: telefonos,
          PROFESIONORUBRO: cliente.PROFESIONORUBRO,
          HOBBY: cliente.HOBBY,
          OBSERVACIONES: cliente.OBSERVACIONES,
        };
      } else {
        objetoClienteNuevo = {
          NOMBRE: cliente.NOMBRE,
          APELLIDO: cliente.APELLIDO,
          CI: cliente.CI,
          RUC: cliente.RUC,
          CAMPANA_Id: campana,
          PROFESIONORUBRO: cliente.PROFESIONORUBRO,
          HOBBY: cliente.HOBBY,
          OBSERVACIONES: cliente.OBSERVACIONES,
        };
      }
    } else if (
      telefonos[0] === undefined &&
      direcciones[0] !== undefined &&
      redes[0] === undefined
    ) {
      if (
        direcciones[0].DESCRIDIRECCION !== '' ||
        direcciones[0].DETALLESDIRECCION !== ''
      ) {
        objetoClienteNuevo = {
          NOMBRE: cliente.NOMBRE,
          APELLIDO: cliente.APELLIDO,
          CI: cliente.CI,
          RUC: cliente.RUC,
          CAMPANA_Id: campana,
          DIRECCIONES: direcciones,
          PROFESIONORUBRO: cliente.PROFESIONORUBRO,
          HOBBY: cliente.HOBBY,
          OBSERVACIONES: cliente.OBSERVACIONES,
        };
      } else {
        objetoClienteNuevo = {
          NOMBRE: cliente.NOMBRE,
          APELLIDO: cliente.APELLIDO,
          CI: cliente.CI,
          RUC: cliente.RUC,
          CAMPANA_Id: campana,
          PROFESIONORUBRO: cliente.PROFESIONORUBRO,
          HOBBY: cliente.HOBBY,
          OBSERVACIONES: cliente.OBSERVACIONES,
        };
      }
    } else if (
      telefonos[0] === undefined &&
      direcciones[0] !== undefined &&
      redes[0] !== undefined
    ) {
      if (
        (direcciones[0].DESCRIDIRECCION !== '' ||
          direcciones[0].DETALLESDIRECCION !== '') &&
        (redes[0].Nick === '' || redes[0].RedSocial === '')
      ) {
        objetoClienteNuevo = {
          NOMBRE: cliente.NOMBRE,
          APELLIDO: cliente.APELLIDO,
          CI: cliente.CI,
          RUC: cliente.RUC,
          CAMPANA_Id: campana,
          DIRECCIONES: direcciones,
          PROFESIONORUBRO: cliente.PROFESIONORUBRO,
          HOBBY: cliente.HOBBY,
          OBSERVACIONES: cliente.OBSERVACIONES,
        };
      } else if (
        (redes[0].Nick !== '' || redes[0].RedSocial !== '') &&
        (direcciones[0].DESCRIDIRECCION === '' ||
          direcciones[0].DETALLESDIRECCION === '')
      ) {
        objetoClienteNuevo = {
          NOMBRE: cliente.NOMBRE,
          APELLIDO: cliente.APELLIDO,
          CI: cliente.CI,
          RUC: cliente.RUC,
          CAMPANA_Id: campana,
          REDES: redes,
          PROFESIONORUBRO: cliente.PROFESIONORUBRO,
          HOBBY: cliente.HOBBY,
          OBSERVACIONES: cliente.OBSERVACIONES,
        };
      } else {
        objetoClienteNuevo = {
          NOMBRE: cliente.NOMBRE,
          APELLIDO: cliente.APELLIDO,
          CI: cliente.CI,
          RUC: cliente.RUC,
          CAMPANA_Id: campana,
          DIRECCIONES: direcciones,
          REDES: redes,
          PROFESIONORUBRO: cliente.PROFESIONORUBRO,
          HOBBY: cliente.HOBBY,
          OBSERVACIONES: cliente.OBSERVACIONES,
        };
      }
    } else if (
      telefonos[0] !== undefined &&
      direcciones[0] === undefined &&
      redes[0] !== undefined
    ) {
      if (
        (telefonos[0].DESCRITELEFONO !== '' ||
          telefonos[0].DETALLESTELEFONO !== '') &&
        (redes[0].Nick === '' || redes[0].RedSocial === '')
      ) {
        objetoClienteNuevo = {
          NOMBRE: cliente.NOMBRE,
          APELLIDO: cliente.APELLIDO,
          CI: cliente.CI,
          RUC: cliente.RUC,
          CAMPANA_Id: campana,
          TELEFONOS: telefonos,
          PROFESIONORUBRO: cliente.PROFESIONORUBRO,
          HOBBY: cliente.HOBBY,
          OBSERVACIONES: cliente.OBSERVACIONES,
        };
      } else if (
        (redes[0].Nick !== '' || redes[0].RedSocial !== '') &&
        (telefonos[0].DESCRITELEFONO === '' ||
          telefonos[0].DETALLESTELEFONO === '')
      ) {
        objetoClienteNuevo = {
          NOMBRE: cliente.NOMBRE,
          APELLIDO: cliente.APELLIDO,
          CI: cliente.CI,
          RUC: cliente.RUC,
          CAMPANA_Id: campana,
          REDES: redes,
          PROFESIONORUBRO: cliente.PROFESIONORUBRO,
          HOBBY: cliente.HOBBY,
          OBSERVACIONES: cliente.OBSERVACIONES,
        };
      } else {
        objetoClienteNuevo = {
          NOMBRE: cliente.NOMBRE,
          APELLIDO: cliente.APELLIDO,
          CI: cliente.CI,
          RUC: cliente.RUC,
          CAMPANA_Id: campana,
          TELEFONOS: telefonos,
          REDES: redes,
          PROFESIONORUBRO: cliente.PROFESIONORUBRO,
          HOBBY: cliente.HOBBY,
          OBSERVACIONES: cliente.OBSERVACIONES,
        };
      }
    } else if (
      telefonos[0] !== undefined &&
      direcciones[0] !== undefined &&
      redes[0] === undefined
    ) {
      if (
        (telefonos[0].DESCRITELEFONO !== '' ||
          telefonos[0].DETALLESTELEFONO !== '') &&
        (direcciones[0].DESCRIDIRECCION === '' ||
          direcciones[0].DETALLESDIRECCION === '')
      ) {
        objetoClienteNuevo = {
          NOMBRE: cliente.NOMBRE,
          APELLIDO: cliente.APELLIDO,
          CI: cliente.CI,
          RUC: cliente.RUC,
          CAMPANA_Id: campana,
          TELEFONOS: telefonos,
          PROFESIONORUBRO: cliente.PROFESIONORUBRO,
          HOBBY: cliente.HOBBY,
          OBSERVACIONES: cliente.OBSERVACIONES,
        };
      } else if (
        (direcciones[0].DESCRIDIRECCION !== '' ||
          direcciones[0].DETALLESDIRECCION !== '') &&
        (telefonos[0].DESCRITELEFONO === '' ||
          telefonos[0].DETALLESTELEFONO === '')
      ) {
        objetoClienteNuevo = {
          NOMBRE: cliente.NOMBRE,
          APELLIDO: cliente.APELLIDO,
          CI: cliente.CI,
          RUC: cliente.RUC,
          CAMPANA_Id: campana,
          DIRECCIONES: direcciones,
          PROFESIONORUBRO: cliente.PROFESIONORUBRO,
          HOBBY: cliente.HOBBY,
          OBSERVACIONES: cliente.OBSERVACIONES,
        };
      } else {
        objetoClienteNuevo = {
          NOMBRE: cliente.NOMBRE,
          APELLIDO: cliente.APELLIDO,
          CI: cliente.CI,
          RUC: cliente.RUC,
          CAMPANA_Id: campana,
          TELEFONOS: telefonos,
          DIRECCIONES: direcciones,
          PROFESIONORUBRO: cliente.PROFESIONORUBRO,
          HOBBY: cliente.HOBBY,
          OBSERVACIONES: cliente.OBSERVACIONES,
        };
      }
    } else if (
      telefonos[0] === undefined &&
      direcciones[0] === undefined &&
      redes[0] !== undefined
    ) {
      if (redes[0].Nick !== '' || redes[0].RedSocial !== '') {
        objetoClienteNuevo = {
          NOMBRE: cliente.NOMBRE,
          APELLIDO: cliente.APELLIDO,
          CI: cliente.CI,
          RUC: cliente.RUC,
          CAMPANA_Id: campana,
          REDES: redes,
          PROFESIONORUBRO: cliente.PROFESIONORUBRO,
          HOBBY: cliente.HOBBY,
          OBSERVACIONES: cliente.OBSERVACIONES,
        };
      } else {
        objetoClienteNuevo = {
          NOMBRE: cliente.NOMBRE,
          APELLIDO: cliente.APELLIDO,
          CI: cliente.CI,
          RUC: cliente.RUC,
          CAMPANA_Id: campana,
          PROFESIONORUBRO: cliente.PROFESIONORUBRO,
          HOBBY: cliente.HOBBY,
          OBSERVACIONES: cliente.OBSERVACIONES,
        };
      }
    } else {
      objetoClienteNuevo = {
        NOMBRE: cliente.NOMBRE,
        APELLIDO: cliente.APELLIDO,
        CI: cliente.CI,
        RUC: cliente.RUC,
        CAMPANA_Id: campana,
        TELEFONOS: telefonos,
        DIRECCIONES: direcciones,
        REDES: redes,
        PROFESIONORUBRO: cliente.PROFESIONORUBRO,
        HOBBY: cliente.HOBBY,
        OBSERVACIONES: cliente.OBSERVACIONES,
      };
    }
    obtenerClientePorCi(cliente.CI).then((response) => {
      if (response.data.length > 0) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Ya existe un cliente con ese CI',
          },
        });
      } else {
        obtenerClientePorCi(cliente.RUC).then((response) => {
          if (response.data.length > 0) {
            dispatch({
              type: 'OPEN_SNACKBAR',
              openMensaje: {
                open: true,
                mensaje: 'Ya existe un cliente con ese RUC',
              },
            });
          } else {
            registrarCliente(objetoClienteNuevo).then((response) => {
              if (response.status === 200) {
                dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                    open: true,
                    mensaje: 'Se guardo exitosamente el Cliente',
                  },
                });
                let objetoAudi = {
                  usuario: sesionUsuario.usuario.nombrecompleto,
                  accion: 'Registro',
                  panel: 'Gestion de Clientes',
                  tabla: 'CLIENTES',
                  filaafectada: 'NUEVO REGISTRO',
                  UsuarioId: sesionUsuario.usuario.id,
                };
                RegistrarAccion(objetoAudi);
                props.history.goBack();
              } else {
                dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                    open: true,
                    mensaje:
                      'Errores al intentar guardar Asegurese de llenar todos los campos ',
                  },
                });
              }
            });
          }
        });
      }
    });
  };
  const volver = () => {
    props.history.goBack();
  };
  useEffect(() => {
    obtenerCiudades().then((response) => {
      const Data = response.data;
      setDataCiu(Data);
    });
    if (barrioCiu !== '') {
      obtenerBarrios(barrioCiu).then((response) => {
        const Data = response.data;
        setDataBa(Data);
      });
    }
    obtenerCampanas().then((response) => {
      const Data = response.data;
      setDatar(Data);
    });
  }, [barrioCiu, sesionUsuario]);

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
                variant="outlined"
                style={style.textarea}
                aria-label="minimum height"
                rowsMin={4}
                placeholder="Observaciones"
              />
            </Grid>
            <FormControl variant="outlined" style={style.Select}>
              <InputLabel style={style.Select}>Campaña</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={campana}
                onChange={selectCampanahandleChange}
                label="Campaña"
              >
                {Datar.map((campana) => (
                  <MenuItem key={campana.campanA_Id} value={campana.campanA_Id}>
                    {campana.descricampana}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <br></br>
          <Grid item xs={12} md={6}>
            <Typography>Telefonos:</Typography>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setTelefonos((telefonoActual) => [
                    ...telefonoActual,
                    {
                      CODTELEFONO: generate(),
                      DESCRITELEFONO: '',
                      DETALLESTELEFONO: '',
                    },
                  ]);
                }}
                style={style.submit}
              >
                +
              </Button>
            </Grid>
          </Grid>
          <br></br>
          {telefonos.map((t, index) => {
            return (
              <div key={t.CODTELEFONO}>
                <TextField
                  name="TELEFONO"
                  value={t.DESCRITELEFONO}
                  onChange={(e) => {
                    const DESCRITELEFONO = e.target.value;
                    setTelefonos((telefonoActual) =>
                      produce(telefonoActual, (v) => {
                        v[index].DESCRITELEFONO = DESCRITELEFONO;
                      })
                    );
                  }}
                  variant="outlined"
                  label="Nro.Telefono"
                  style={style.textTel}
                />
                <TextField
                  name="DETALLESTELEFONO"
                  value={t.DETALLESTELEFONO}
                  fullWidth
                  onChange={(e) => {
                    const DETALLESTELEFONO = e.target.value;
                    setTelefonos((telefonoActual) =>
                      produce(telefonoActual, (v) => {
                        v[index].DETALLESTELEFONO = DETALLESTELEFONO;
                      })
                    );
                  }}
                  variant="outlined"
                  label="Detalles"
                  style={style.textDet}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  style={style.btnTel}
                  onClick={() => {
                    setTelefonos((telefonoActual) =>
                      telefonoActual.filter(
                        (x) => x.CODTELEFONO !== t.CODTELEFONO
                      )
                    );
                  }}
                >
                  x
                </Button>
              </div>
            );
          })}

          <Grid item xs={12} md={6}>
            <Typography>Direcciones:</Typography>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setDirecciones((direccionActual) => [
                    ...direccionActual,
                    {
                      CODDIRECCION: generate(),
                      DETALLESDIRECCION: '',
                      DESCRIDIRECCION: '',
                      CIUDAD: {
                        CIUDAD_Id: '',
                      },
                      BARRIO: {
                        BARRIO_Id: '',
                      },
                    },
                  ]);
                }}
                style={style.submit}
              >
                +
              </Button>
            </Grid>
          </Grid>
          <br></br>
          {direcciones.map((d, index) => {
            return (
              <div key={d.CODDIRECCION}>
                <TextField
                  multiline
                  name="DIRECCION"
                  value={d.DESCRIDIRECCION}
                  onChange={(e) => {
                    const DESCRIDIRECCION = e.target.value;
                    setDirecciones((direccionActual) =>
                      produce(direccionActual, (v) => {
                        v[index].DESCRIDIRECCION = DESCRIDIRECCION;
                      })
                    );
                  }}
                  variant="outlined"
                  label="Direccion"
                  style={style.textDir}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  style={style.btnTel}
                  onClick={() => {
                    setDirecciones((direccionActual) =>
                      direccionActual.filter(
                        (x) => x.CODDIRECCION !== d.CODDIRECCION
                      )
                    );
                  }}
                >
                  X
                </Button>
                <Grid item>
                  <br></br>
                  <TextField
                    multiline
                    name="DETALLESDIRECCION"
                    value={d.DETALLESDIRECCION}
                    fullWidth
                    onChange={(e) => {
                      const DETALLESDIRECCION = e.target.value;
                      setDirecciones((direccionActual) =>
                        produce(direccionActual, (v) => {
                          v[index].DETALLESDIRECCION = DETALLESDIRECCION;
                        })
                      );
                    }}
                    variant="outlined"
                    label="Detalles"
                    style={style.textDir}
                  />
                </Grid>
                <br />

                <Grid item>
                  <Autocomplete
                    id="combo-box-demo"
                    options={DataCiu}
                    getOptionLabel={(DataCiu) => DataCiu.descriciudad}
                    getOptionSelected={(option, value) =>
                      option.ciudaD_Id === value.ciudaD_Id
                    }
                    style={style.SelectDi}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Buscar Ciudades"
                        variant="outlined"
                      />
                    )}
                    onChange={(e, value) => {
                      setDirecciones((direccionActual) =>
                        produce(direccionActual, (v) => {
                          v[index].CIUDAD.CIUDAD_Id = value.ciudaD_Id;
                        })
                      );
                      setBarrioCiu(value.ciudaD_Id);
                    }}
                  />

                  <Autocomplete
                    id="combo-box-demo2"
                    options={DataBa}
                    getOptionLabel={(DataBa) => DataBa.describarrio}
                    style={style.SelectDi}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Buscar Barrios"
                        variant="outlined"
                      />
                    )}
                    onChange={(e, value) => {
                      setDirecciones((direccionActual) =>
                        produce(direccionActual, (v) => {
                          v[index].BARRIO.BARRIO_Id = value.barriO_Id;
                        })
                      );
                    }}
                  />
                </Grid>
              </div>
            );
          })}
          <br />
          <Grid item xs={12} md={6}>
            <Typography>Redes Sociales:</Typography>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setRedes((redActual) => [
                    ...redActual,
                    {
                      CODRED: generate(),
                      Nick: '',
                      RedSocial: '',
                    },
                  ]);
                }}
                style={style.submit}
              >
                +
              </Button>
            </Grid>
          </Grid>
          {redes.map((t, index) => {
            return (
              <div key={t.CODRED}>
                <TextField
                  multiline
                  name="Nick"
                  value={t.Nick}
                  onChange={(e) => {
                    const Nick = e.target.value;
                    setRedes((redActual) =>
                      produce(redActual, (v) => {
                        v[index].Nick = Nick;
                      })
                    );
                  }}
                  variant="outlined"
                  label="Nombre de usuario o Nick"
                  style={style.textDet}
                />
                <TextField
                  multiline
                  name="RedSocial"
                  value={t.RedSocial}
                  fullWidth
                  onChange={(e) => {
                    const RedSocial = e.target.value;
                    setRedes((redActual) =>
                      produce(redActual, (v) => {
                        v[index].RedSocial = RedSocial;
                      })
                    );
                  }}
                  variant="outlined"
                  label="Red Social"
                  style={style.textTel}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  style={style.btnTel}
                  onClick={() => {
                    setRedes((redActual) =>
                      redActual.filter((x) => x.CODRED !== t.CODRED)
                    );
                  }}
                >
                  X
                </Button>
              </div>
            );
          })}
          <br />
          <br />
          <Grid container spacing={4} justify="center">
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={registrarClienteBoton}
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
export default withRouter(ClienteNuevo);

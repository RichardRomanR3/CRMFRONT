import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Grid,
  Typography,
  Container,
  IconButton,
  Button,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import style from '../../Tools/Style.js';
import ModalClientes from '../../GestionDeClientes/ModalClientes.js';
import { obtenerClientes } from '../../../actions/ClientesAction.js';
import { useStateValue } from '../../../contexto/store.js';
import { nuevaSugerencia } from '../../../actions/SugerenciasAction.js';
import { RegistrarAccion } from '../../../actions/AuditoriaAction.js';
import RichTextEditor from 'react-rte';

const BuzonDesugerencias = () => {
  const mounted = useRef(true);
  const [Datacl, setDatacl] = useState([]);
  const [datosCargados, setDatosCargados] = useState(false);
  //eslint-disable-next-line
  const [{ openSnackbar, sesionUsuario }, dispatch] = useStateValue();
  const [clientes, setClientes] = useState('');
  const [modalBuscar, setModalBuscar] = useState(false);
  const [contenido, setContenido] = useState('');
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createValueFromString(contenido, 'html')
  );
  const handleChange = (value) => {
    setEditorValue(value);
    setContenido(value.toString('html'));
  };
  const [sugerencia, setSugerencia] = useState({
    cliente_id: '',
  });
  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setSugerencia((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };
  const seleccionarCliente = (cliente) => {
    setClientes(cliente.nombre + ' ' + cliente.apellido);
    setSugerencia({
      contenido: sugerencia.contenido,
      cliente_id: cliente.clientE_Id,
    });
    setModalBuscar(false);
  };
  const abrirModal = () => {
    setModalBuscar(true);
  };
  const cerrarModal = () => {
    setModalBuscar(false);
  };
  const enviarSugerencia = () => {
    if (contenido !== '') {
      let objeto = {};
      if (sugerencia.cliente_id !== '' && contenido !== '') {
        objeto = {
          contenido: contenido,
          clienteId: sugerencia.cliente_id,
        };
      } else if (sugerencia.cliente_id === '' && contenido !== '') {
        objeto = {
          contenido: contenido,
        };
      }
      nuevaSugerencia(objeto).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje: 'Se Guardo la sugerencia del cliente',
            },
          });
          setSugerencia({
            contenido: '',
            cliente_id: '',
          });
          setClientes('');
          setContenido('');
          setEditorValue(RichTextEditor.createValueFromString(contenido, 'html'));
        } else {
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: true,
              mensaje: 'Errores al intentar Enviar Sugerencia',
            },
          });
        }
      });
      let objetoAudi = {
        usuario: sesionUsuario.usuario.nombrecompleto,
        accion: 'Registro',
        panel: 'Gestion de Clientes',
        tabla: 'SUGERENCIAS',
        filaafectada: 'NUEVO REGISTRO',
        UsuarioId: sesionUsuario.usuario.id,
      };
      RegistrarAccion(objetoAudi);
    } else {
      dispatch({
        type: 'OPEN_SNACKBAR',
        openMensaje: {
          open: true,
          mensaje:
            'Debe llenar al menos el campo Sugerencia para poder Enviar ',
        },
      });
    }
  };
  useEffect(() => {
    if (mounted.current) {
      obtenerClientes().then((response) => {
        if (response.status === 200) {
          setDatacl(response.data);
          setDatosCargados(true);
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
          Reporte sobre Cliente
        </Typography>
        <br></br>
        <br></br>
        <form style={style.form}>
          <Grid container spacing={1}>
            <IconButton
              onClick={abrirModal}
              style={style.iconbutton}
              aria-label="buscar"
            >
              <SearchIcon />
              <Typography>Relacionar a un Cliente</Typography>
            </IconButton>
            <TextField
              multiline
              name="CLIENTE"
              value={clientes}
              fullWidth
              onChange={ingresarValoresMemoria}
              variant="outlined"
              label="CLIENTE"
            />
            <br />
            <br />
            <br />
            <br />
            
              <RichTextEditor
                placeholder='Escribir aqui...'
                value={editorValue}
                onChange={handleChange}
                type="string"
                rootStyle={{ width: '100%'}}
                editorStyle={{height:200}}
              />
            
          </Grid>
          <br />
          <Button
            variant="contained"
            color="primary"
            style={style.submit}
            onClick={enviarSugerencia}
          >
            Enviar Reporte
          </Button>
          <Grid container direction="row" justify="center" alignItems="center">
            <ModalClientes
              data={Datacl}
              open={modalBuscar}
              handleClose={cerrarModal}
              seleccionarCliente={seleccionarCliente}
              datosCargados={datosCargados}
            />
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default BuzonDesugerencias;

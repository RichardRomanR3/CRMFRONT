import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import { Typography } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { editarTarea } from '../../actions/TareasAction';
import moment from 'moment';
import { useStateValue } from '../../contexto/store';
import { obtenerTareasDelDia } from '../../actions/TareasAction';
import { obtenerAlertaActual } from '../../actions/AlertasAction';
const Alerta = () => {
  const history = useHistory();
  const [minutosAlertaUsuario, setMInutosAlertaUsuario] = useState(0);
  const [detalles, setDetalles] = useState([]);
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [openDialogAlerta, setOpenDialogAlerta] = useState(false);
  const dialogAlertaHandleClose = () => {
    const objeto = {
      NOTIFICADO: 'NOTIFICADO',
    };
    editarTarea(detalles[0].tareA_Id, objeto).then((response) => {
      if (response.status === 200) {
        setOpenDialogAlerta(false);
      } else {
        console.log('noCAMBIO');
      }
    });
    dispatch({
      type: 'TAREA',
      tarea: detalles,
    });
  };
  const avisarMasTarde = () => {
    let fechanueva =
      moment().add(20, 'minutes').format().toString().substr(0, 16) + ':00';
    dispatch({
      type: 'TAREA',
      tarea: detalles,
    });
    const objeto = {
      ALARMA: fechanueva,
    };
    editarTarea(detalles[0].tareA_Id, objeto).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'La Alerta volvera a aparecer dentro de 10 minutos',
          },
        });
        setOpenDialogAlerta(false);
      } else {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Ocurrio un Error al Alertar',
          },
        });
      }
    });
  };
  const cambiarANotificado = () => {
    dispatch({
      type: 'TAREA',
      tarea: detalles,
    });
    const objeto = {
      NOTIFICADO: 'NOTIFICADO',
    };
    editarTarea(detalles[0].tareA_Id, objeto).then((response) => {
      if (response.status === 200) {
        setOpenDialogAlerta(false);
      } else {
        console.log('noCAMBIO');
      }
    });
  };
  const irAPerfilTarea = () => {
    const tarea = detalles[0];
    history.push({ pathname: '/perfilTarea', state: tarea });
    cambiarANotificado();
    dialogAlertaHandleClose();
  };
  useEffect(() => {
    if (sesionUsuario !== undefined && sesionUsuario.usuario !== null) {
      obtenerAlertaActual(sesionUsuario.usuario.id).then((response) => {
        if (response.status === 200) {
          setMInutosAlertaUsuario(response.data[0].minutosalerta);
        }
      });
      const usuario = sesionUsuario.usuario.id;
      const Procesar = (Data) => {
        Data.map((fechavto) => {
          let fecha = fechavto.alarma;
          let fechamoment =
            moment()
              .add(minutosAlertaUsuario, 'minutes')
              .format()
              .toString()
              .substr(0, 16) + ':00';
          let fechamomentahora =
            moment().format().toString().substr(0, 16) + ':00';
          if (
            (fecha <= fechamoment || fecha === fechamomentahora) &&
            fechavto.notificado === null
          ) {
            setDetalles([fechavto]);
            setOpenDialogAlerta(true);
          }
          return null;
        });
      };
      const interval = setInterval(() => {
        obtenerTareasDelDia(usuario).then((response) => {
          const Data = response.data;
          Procesar(Data);
        });
       
      }, 1000)
      return () => clearInterval(interval);
    }
  }, [sesionUsuario, minutosAlertaUsuario]);
  return (
    <div notranslate="true">
      <Dialog
        component={'div'}
        open={openDialogAlerta}
        onClose={dialogAlertaHandleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle component={'div'} id="form-dialog-title">
          ALERTA!!!
        </DialogTitle>
        <DialogContent component={'div'}>
          <DialogContentText component={'div'}>
            {detalles.map((detalles) => (
              <div key={detalles.tareA_Id} notranslate="true">
                <Typography component={'div'}>
                  Usted tiene una tarea pactada a las:{' '}
                  {detalles.alarma.substr(-8, 5)} hs
                </Typography>
                <br />
                <Typography component={'div'}>Detalles:</Typography>
                <br />
                <Typography component={'div'}>
                  TIPO DE TAREA: {detalles.tipotarea.descritipotarea}
                </Typography>
                <br />
                <Typography component={'div'}>
                  CLIENTE:{' '}
                  {detalles.cliente !== null
                    ? detalles.cliente.nombre + ' ' + detalles.cliente.apellido
                    : detalles.posiblecliente.nombre +
                      ' ' +
                      detalles.posiblecliente.apellido}
                </Typography>
                <br />
                <Typography component={'div'}>
                  OBSERVACIONES: {detalles.numtarea}
                </Typography>
              </div>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: '#ffffff', backgroundColor: '#1b5e20' }}
            onClick={irAPerfilTarea}
          >
            Ver Tarea
          </Button>
          <Button
            onClick={avisarMasTarde}
            color="secondary"
            variant="contained"
          >
            Avisar mas Tarde
          </Button>
          <Button
            onClick={cambiarANotificado}
            variant="contained"
            color="primary"
          >
            De Acuerdo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default withRouter(Alerta);

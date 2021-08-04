import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import RecordVoiceOver from '@material-ui/icons/RecordVoiceOver';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import Email from '@material-ui/icons/Email';
import { useStateValue } from '../../../contexto/store';
import { Link } from 'react-router-dom';
import { obtenerTareasNotificacion } from '../../../actions/TareasAction';
import {
  contarDifusionesDelDia,
  obtenerNotasNoLeidas,
} from '../../../actions/NotasAction';
const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
export default function SpeedDialTooltipOpen() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  //eslint-disable-next-line
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [notificaciones, setNotificaciones] = useState(false);
  const [notasrecibidas, setNotasRecibidas] = useState(false);
  const [difusionesNoti, setDifusionesNoti] = useState(false);
  const [tareasNoti, setTareasNoti] = useState(false);
  const [tareasDelDia, setTareasDelDia] = useState(0);
  const [notasNoLeidas, setNotasNoLeidas] = useState(0);
  const [difusionesDelDia, setDifusionesDelDia] = useState(0);

  const actions = [
    {
      icon: (
        <Link to="/tareasPrincipal" style={{ color: '#757575' }}>
          <Badge badgeContent={tareasDelDia} color="secondary">
            <AssignmentLateIcon />
          </Badge>
        </Link>
      ),
      name: 'Tareas del dia',
      permiso: tareasNoti,
    },
    {
      icon: (
        <Link to="/misNotas" style={{ color: '#757575' }}>
          <Badge badgeContent={notasNoLeidas} color="secondary">
            <Email />
          </Badge>
        </Link>
      ),
      name: 'Notas Recibidas',
      permiso: notasrecibidas,
    },
    {
      icon: (
        <Link to="/difusiones" style={{ color: '#757575' }}>
          <Badge badgeContent={difusionesDelDia} color="secondary">
            <RecordVoiceOver />
          </Badge>
        </Link>
      ),
      name: 'Difusiones del Dia',
      permiso: difusionesNoti,
    },
  ];
  const evaluarPermiso = (arrayrevisar, ruta) => {
    var boolEvaluacion = false;

    let existe = arrayrevisar.filter((pantallazo) => pantallazo.path === ruta);

    if (existe.length > 0) {
      boolEvaluacion = true;
    }

    return boolEvaluacion;
  };
  useEffect(() => {
    if (sesionUsuario !== undefined && sesionUsuario.usuario !== null) {
      const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(
          'http://localhost:5000/chatHub?username=' +
            sesionUsuario.usuario.userName
        )
        .build();
      hubConnection
        .start()
        .catch((err) => console.error('SignalR Connection Error: ', err));

      hubConnection.on('CuentaTareas', (TAREAS) => {
        setTareasDelDia(TAREAS.cuenta);
      });
      hubConnection.on('CuentaNotasNoLeidas', (NOTASNOLEIDAS) => {
        setNotasNoLeidas(NOTASNOLEIDAS.cuenta);
      });
      hubConnection.on('CuentaDifusionesDelDia', (DIFUSIONESDELDIA) => {
        setDifusionesDelDia(DIFUSIONESDELDIA.cuenta);
      });
      let objetoNoti = {
        USUARIOASIGNADO: sesionUsuario.usuario.nombrecompleto,
        UserName: sesionUsuario.usuario.userName,
      };
      /*RRR: en esta seccion se traen las notificaciones por primera vez 
  que se inicia el sistema y/o al actualizar el sistema */
      obtenerTareasNotificacion(objetoNoti).then((response) => {
        if (response === undefined) {
          obtenerTareasNotificacion(objetoNoti).then((response) => {
            setTareasDelDia(response.data.cuenta);
          });
        } else {
          setTareasDelDia(response.data.cuenta);
        }
      });

      let objetoNotiNota = {
        USUARIOASIGNADO: sesionUsuario.usuario.userName,
        UserName: sesionUsuario.usuario.userName,
      };
      obtenerNotasNoLeidas(objetoNotiNota).then((response) => {
        if (response === undefined) {
          obtenerNotasNoLeidas(objetoNoti).then((response) => {
            setNotasNoLeidas(response.data.cuenta);
          });
        } else {
          setNotasNoLeidas(response.data.cuenta);
        }
      });
      contarDifusionesDelDia().then((response) => {
        if (response === undefined) {
          contarDifusionesDelDia().then((response) => {
            setDifusionesDelDia(response.data.cuenta);
          });
        } else {
          setDifusionesDelDia(response.data.cuenta);
        }
      });
      const VerificarPermisos = (arrPermisos) => {
        setNotificaciones(evaluarPermiso(arrPermisos, '/notificaciones'));
        setNotasRecibidas(evaluarPermiso(arrPermisos, '/notasrecibidas'));
        setDifusionesNoti(evaluarPermiso(arrPermisos, '/difusionesNoti'));
        setTareasNoti(evaluarPermiso(arrPermisos, '/tareasNoti'));
      };
      VerificarPermisos(
        sesionUsuario.usuario.pantallasUsuario.listaPantallasRol 
      );
    }
  }, [sesionUsuario]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (notificaciones) {
    return (
      <div className={classes.root}>
        <Backdrop open={open} />
        <Tooltip title="Notificaciones">
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            className={classes.speedDial}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
          >
            {actions.map((action) =>
              action.permiso ? (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  onClick={handleClose}
                  tooltipTitle={action.name}
                />
              ) : null
            )}
          </SpeedDial>
        </Tooltip>
      </div>
    );
  } else {
    return null;
  }
}

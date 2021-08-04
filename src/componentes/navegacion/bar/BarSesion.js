import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as signalR from '@microsoft/signalr';
//import style from '../../Tools/Style';
import {
  Toolbar,
  IconButton,
  makeStyles,
  Button,
  Avatar,
  Drawer,
  Badge,
  Tooltip,
} from '@material-ui/core';
import { useStateValue } from '../../../contexto/store';
import { MenuIzquierda } from './menuIzquierda';
import { withRouter } from 'react-router-dom';
import { MenuDerecha } from './menuDerecha';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import Email from '@material-ui/icons/Email';
import { RecordVoiceOver } from '@material-ui/icons';
import { obtenerTareasNotificacion } from '../../../actions/TareasAction';
import {
  contarDifusionesDelDia,
  obtenerNotasNoLeidas,
} from '../../../actions/NotasAction';
const useStyles = makeStyles((theme) => ({
  seccionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  seccionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  grow: {
    flexGrow: 1,
  },
  avatarSize: {
    width: 40,
    height: 40,
  },
  list: {
    width: 250,
  },
  listItemText: {
    fontSize: '14px',
    fontWeight: 600,
    paddingLeft: '15px',
    color: '#212121',
  },
}));

const BarSesion = (props) => {
  const classes = useStyles();
  const mounted = useRef(true);
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [abrirMenuIzquierda, setAbrirMenuIzquierda] = useState(false);
  const [abrirMenuDerecha, setAbrirMenuDerecha] = useState(false);
  const [tareasDelDia, setTareasDelDia] = useState(0);
  const [notasNoLeidas, setNotasNoLeidas] = useState(0);
  const [difusionesDelDia, setDifusionesDelDia] = useState(0);
  const [notificaciones, setNotificaciones] = useState(false);
  const [notasrecibidas, setNotasRecibidas] = useState(false);
  const [difusionesNoti, setDifusionesNoti] = useState(false);
  const [tareasNoti, setTareasNoti] = useState(false);

  const evaluarPermiso = (arrayrevisar, ruta) => {
    var boolEvaluacion = false;

    let existe = arrayrevisar.filter((pantallazo) => pantallazo.path === ruta);

    if (existe.length > 0) {
      boolEvaluacion = true;
    }

    return boolEvaluacion;
  };

  const cerrarMenuIzquierda = () => {
    setAbrirMenuIzquierda(false);
  };
  const abrirMenuIzquierdaAction = () => {
    setAbrirMenuIzquierda(true);
  };
  const cerrarMenuDerecha = () => {
    setAbrirMenuDerecha(false);
  };
  const abrirMenuDerechaAction = () => {
    setAbrirMenuDerecha(true);
  };
  const salirSesionApp = () => {
    localStorage.removeItem('token_seguridad');
    dispatch({
      type: 'SALIR_SESION',
      nuevoUsuario: null,
      autenticado: false,
    });
    props.history.push('/login');
  };
  useEffect(() => {
    if (mounted.current) {
      /*RRR: seccion SignalR para notificaciones a tiempo real*/
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
    return function cleanup() {
      mounted.current = false;
    };
  }, [sesionUsuario]);
  return (
    <React.Fragment>
      <Drawer
        open={abrirMenuIzquierda}
        onClose={cerrarMenuIzquierda}
        anchor="left"
      >
        <div className={classes.list} onKeyDown={cerrarMenuIzquierda}>
          <MenuIzquierda classes={classes} />
        </div>
      </Drawer>

      <Drawer
        open={abrirMenuDerecha}
        onClose={cerrarMenuDerecha}
        anchor="right"
      >
        <div className={classes.list} onClick={cerrarMenuDerecha}>
          <MenuDerecha
            classes={classes}
            salirSesion={salirSesionApp}
            usuario={sesionUsuario ? sesionUsuario.usuario : null}
          />
        </div>
      </Drawer>

      <Toolbar>
        <IconButton color="inherit" onClick={abrirMenuIzquierdaAction}>
          <i className="material-icons">menu</i>
        </IconButton>

        <Button color="inherit" component={Link} to="/">
          FOLLOW-UP CRM
        </Button>
        <div className={classes.grow}></div>

        <div className={classes.seccionDesktop}>
          {notificaciones ? (
            <div>
              {difusionesNoti ? (
                <Link to="/difusiones" style={{ color: '#FFF' }}>
                  <Tooltip title="Nuevas Difusiones">
                    <Badge
                      badgeContent={difusionesDelDia}
                      //style={}
                      color="secondary"
                    >
                      <RecordVoiceOver />
                    </Badge>
                  </Tooltip>
                </Link>
              ) : null}

              {notasrecibidas ? (
                <Link to="/misNotas" style={{ color: '#FFF' }}>
                  <Tooltip title="Notas Nuevas">
                    <Badge
                      badgeContent={notasNoLeidas}
                      //style={}
                      color="secondary"
                    >
                      <Email />
                    </Badge>
                  </Tooltip>
                </Link>
              ) : null}

              {tareasNoti ? (
                <Link to="/tareasPrincipal" style={{ color: '#FFF' }}>
                  <Tooltip title="Tareas">
                    <Badge
                      badgeContent={tareasDelDia}
                      //style={}
                      color="secondary"
                    >
                      <AssignmentLateIcon />
                    </Badge>
                  </Tooltip>
                </Link>
              ) : null}
            </div>
          ) : null}
          <Button color="inherit" onClick={salirSesionApp}>
            Salir
          </Button>
          <Button component={Link} to="/perfil" color="inherit">
            {sesionUsuario ? sesionUsuario.usuario.nombrecompleto : ''}
          </Button>
          <Avatar src={sesionUsuario.usuario.imagenPerfil}></Avatar>
        </div>
        <div className={classes.seccionMobile}>
          <IconButton color="inherit" onClick={abrirMenuDerechaAction}>
            <i className="material-icons">more_vert</i>
          </IconButton>
        </div>
      </Toolbar>
    </React.Fragment>
  );
};
export default withRouter(BarSesion);

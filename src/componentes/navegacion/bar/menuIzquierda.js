import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Toolbar,
  Avatar,
} from "@material-ui/core";
import style from "../../Tools/Style";
import { Link } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import React, { useState, useEffect } from "react";
import { useStateValue } from "../../../contexto/store";
import {
  Radio,
  AccountBox,
  AccountCircle,
  Alarm,
  Archive,
  Assessment,
  AssignmentInd,
  BugReport,
  Contacts,
  HowToReg,
  Inbox,
  People,
  PersonAdd,
  PersonAddDisabled,
  Public,
  RecordVoiceOver,
  RemoveRedEye,
  ScreenShare,
  SmsFailed,
  Undo,
  Dashboard,
} from "@material-ui/icons";
export function MenuIzquierda({ classes }) {
  const [{ sesionUsuario }] = useStateValue();
  //FERNANDO COLUCCI
  //CATEGORIAS
  const [configuracion, setConfiguracion] = useState(false);
  const [cuenta, setCuenta] = useState(false);
  const [gestionTareas, setGestionTareas] = useState(false);
  const [notas, setNotas] = useState(false);
  const [gestionClientes, setGestionClientes] = useState(false);
  const [marketing, setMarketing] = useState(false);
  //FERNANDO COLUCCI
  //SUBCATEGORIAS
  const [perfil, setPerfil] = useState(false);
  const [registrarUsuario, setRegistrarUsuario] = useState(false);
  const [difusiones, setDifusiones] = useState(false);
  const [misNotas, setMisNotas] = useState(false);
  const [nuevaNota, setNuevaNota] = useState(false);
  const [nuevaDifusion, setNuevaDifusion] = useState(false);
  const [clientes, setClientes] = useState(false);
  const [posiblesClientes, setPosiblesClientes] = useState(false);
  const [contactos, setContactos] = useState(false);
  const [reporteSobreClientes, setreporteSobreClientes] = useState(false);
  const [misTareas, setMisTareas] = useState(false);
  const [asignarTareas, setAsignarTareas] = useState(false);
  const [panelTareas, setPanelTareas] = useState(false);
  const [campanas, setCampanas] = useState(false);
  const [crearTiposCampanas, setCrearTiposCampanas] = useState(false);
  const [crearTiposTareas, setCrearTiposTareas] = useState(false);
  const [asignarRolesUsuarios, setAsignarRolesUsuarios] = useState(false);
  const [administrarRoles, setAdministrarRoles] = useState(false);
  const [notasEnviadas, setNotasEnviadas] = useState(false);
  const [auditoria, setAuditoria] = useState(false);
  const [panelSugerencias, setPanelSugerencias] = useState(false);
  const [configurarAlerta, setConfigurarAlerta] = useState(false);
  const [importarExcel, setImportarExcel] = useState(false);
  const [asignarExcel, setAsignarExcel] = useState(false);
  const [reporteBug, setReporteBug] = useState(false);
  const [revertirExcel, setRevertirExcel] = useState(false);
  const [metricas, setMetricas] = useState(false);
  const [dashBoard,setDashboard]=useState(false);

  useEffect(() => {
    const VerificarPermisos = (arrPermisos) => {
      //CATEGORIA
      setCuenta(evaluarPermiso(arrPermisos, "/cuenta"));
      setGestionTareas(evaluarPermiso(arrPermisos, "/gestionTareas"));
      setNotas(evaluarPermiso(arrPermisos, "/notas"));
      setConfiguracion(evaluarPermiso(arrPermisos, "/configuracion"));
      setGestionClientes(evaluarPermiso(arrPermisos, "/gestionClientes"));
      setMarketing(evaluarPermiso(arrPermisos, "/marketing"));
      //SUBCATEGORIA
      setPerfil(evaluarPermiso(arrPermisos, "/perfil"));
      setRegistrarUsuario(evaluarPermiso(arrPermisos, "/registrar"));
      setDifusiones(evaluarPermiso(arrPermisos, "/difusiones"));
      setMisNotas(evaluarPermiso(arrPermisos, "/misNotas"));
      setNuevaNota(evaluarPermiso(arrPermisos, "/nuevaNota"));
      setNuevaDifusion(evaluarPermiso(arrPermisos, "/nuevaDifusion"));
      setClientes(evaluarPermiso(arrPermisos, "/clientesPrincipal"));
      setPosiblesClientes(
        evaluarPermiso(arrPermisos, "/posiblesClientesPrincipal")
      );
      setContactos(evaluarPermiso(arrPermisos, "/contactosPrincipal"));
      setreporteSobreClientes(
        evaluarPermiso(arrPermisos, "/reporteSobreClientes")
      );
      setMisTareas(evaluarPermiso(arrPermisos, "/tareasPrincipal"));
      setAsignarTareas(evaluarPermiso(arrPermisos, "/asignarTareas"));
      setPanelTareas(evaluarPermiso(arrPermisos, "/panelTareas"));
      setCampanas(evaluarPermiso(arrPermisos, "/campanasPrincipal"));
      setCrearTiposCampanas(evaluarPermiso(arrPermisos, "/tiposcampanas"));
      setCrearTiposTareas(evaluarPermiso(arrPermisos, "/tipostareas"));
      setAsignarRolesUsuarios(evaluarPermiso(arrPermisos, "/usuariosRoles"));
      setAdministrarRoles(evaluarPermiso(arrPermisos, "/rol"));
      setNotasEnviadas(evaluarPermiso(arrPermisos, "/notasEnviadas"));
      setAuditoria(evaluarPermiso(arrPermisos, "/auditoria"));
      setPanelSugerencias(evaluarPermiso(arrPermisos, "/panelSugerencias"));
      setConfigurarAlerta(evaluarPermiso(arrPermisos, "/configurarAlerta"));
      setImportarExcel(evaluarPermiso(arrPermisos, "/importarExcel"));
      setAsignarExcel(evaluarPermiso(arrPermisos, "/asignarExcel"));
      setReporteBug(evaluarPermiso(arrPermisos, "/reportarBug"));
      setRevertirExcel(evaluarPermiso(arrPermisos, "/revertirExcel"));
      setMetricas(evaluarPermiso(arrPermisos, "/metricas"));
      setDashboard(evaluarPermiso(arrPermisos, "/"));
    };
    VerificarPermisos(sesionUsuario.usuario.pantallasUsuario.listaPantallasRol);
  }, [sesionUsuario]);
  const [openCuenta, setOpenCuenta] = useState(false);
  const handleOpenCuenta = () => {
    setOpenCuenta(!openCuenta);
  };
  const [openNotas, setOpenNotas] = useState(false);
  const handleOpenNotas = () => {
    setOpenNotas(!openNotas);
  };
  const [openGestionClientes, setOpenGestionClientes] = useState(false);
  const handleOpenGestionClientes = () => {
    setOpenGestionClientes(!openGestionClientes);
  };
  const [openGestionTareas, setOpenGestionTareas] = useState(false);
  const handleOpenGestionTareas = () => {
    setOpenGestionTareas(!openGestionTareas);
  };
  const [openArchivo, setOpenArchivo] = useState(false);
  const handleOpenArchivo = () => {
    setOpenArchivo(!openArchivo);
  };
  const [openMarketing, setOpenMarketing] = useState(false);
  const handleOpenMarketing = () => {
    setOpenMarketing(!openMarketing);
  };

  const evaluarPermiso = (arrayrevisar, ruta) => {
    var boolEvaluacion = false;

    let existe = arrayrevisar.filter((pantallazo) => pantallazo.path === ruta);

    if (existe.length > 0) {
      boolEvaluacion = true;
    }

    return boolEvaluacion;
  };

  return (
    <div notranslate="true" className={classes.list}>
      <List>
        <Toolbar />
        <ListItem>
          <Avatar
            style={style.avatarmenu}
            src={sesionUsuario.usuario.imagenPerfil}
          ></Avatar>
        </ListItem>
        {cuenta ? (
          <ListItem onClick={handleOpenCuenta}>
            <AccountCircle />
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Cuenta"
            />
            {openCuenta ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        ) : null}
        <Collapse in={openCuenta} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {perfil ? (
              <ListItem
                component={Link}
                button
                to="/perfil"
                className={classes.listItemText}
              >
                <AccountBox />
                <ListItemText primary="Perfil" />
              </ListItem>
            ) : null}
             
            {registrarUsuario ? (
              <ListItem
                component={Link}
                button
                to="/registrar"
                className={classes.listItemText}
              >
                <PersonAdd />
                <ListItemText primary="Registrar Usuario" />
              </ListItem>
            ) : null}
          </List>
        </Collapse>
      </List>
    
      {cuenta ? <Divider /> : null}
      {dashBoard ? (
          <ListItem component={Link}
          button 
          to='/'
          className={classes.listItemText}
          >
            <Dashboard />
            <ListItemText
              primary="Dashboard"
            />
          </ListItem>
        ) : null}
        {dashBoard ? <Divider /> : null}
      {notas ? (
        <List>
          <ListItem onClick={handleOpenNotas}>
            <i className="material-icons">note</i>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Notas"
            />
            {openNotas ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openNotas} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {difusiones ? (
                <ListItem
                  component={Link}
                  button
                  to="/difusiones"
                  className={classes.listItemText}
                >
                  <RecordVoiceOver />
                  <ListItemText primary="Difusiones" />
                </ListItem>
              ) : null}
              {misNotas ? (
                <ListItem
                  component={Link}
                  button
                  to="/misNotas"
                  className={classes.listItemText}
                >
                  <Inbox />
                  <ListItemText primary="Mis Notas" />
                </ListItem>
              ) : null}
              {nuevaNota ? (
                <ListItem
                  component={Link}
                  button
                  to="/nuevaNota"
                  className={classes.listItemText}
                >
                  <i notranslate="true" className="material-icons">
                    connect_without_contact
                  </i>

                  <ListItemText primary="Nueva Nota" />
                </ListItem>
              ) : null}
              {notasEnviadas ? (
                <ListItem
                  component={Link}
                  button
                  to="/notasEnviadas"
                  className={classes.listItemText}
                >
                  <i notranslate="true" className="material-icons">
                    forward_to_inbox
                  </i>

                  <ListItemText primary="Notas Enviadas" />
                </ListItem>
              ) : null}
              {nuevaDifusion ? (
                <ListItem
                  component={Link}
                  button
                  to="/nuevaDifusion"
                  className={classes.listItemText}
                >
                  <SmsFailed />
                  <ListItemText primary="Nueva Difusion" />
                </ListItem>
              ) : null}
            </List>
          </Collapse>
        </List>
      ) : null}
      {notas ? <Divider /> : null}
      {gestionClientes ? (
        <List>
          <ListItem onClick={handleOpenGestionClientes}>
            <People />
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Gestion de Clientes"
            />
            {openGestionClientes ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openGestionClientes} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <div>
                {clientes ? (
                  <ListItem
                    component={Link}
                    button
                    to="/clientesPrincipal"
                    className={classes.listItemText}
                  >
                    <HowToReg />
                    <ListItemText primary="Clientes" />
                  </ListItem>
                ) : null}
                {posiblesClientes ? (
                  <ListItem
                    component={Link}
                    button
                    to="/posiblesClientesPrincipal"
                    className={classes.listItemText}
                  >
                    <i notranslate="true" className="material-icons">
                      person_add_alt_1
                    </i>
                    <ListItemText primary="Posibles Clientes" />
                  </ListItem>
                ) : null}
              </div>
              {contactos ? (
                <ListItem
                  component={Link}
                  button
                  to="/contactosPrincipal"
                  className={classes.listItemText}
                >
                  <Contacts />
                  <ListItemText primary="Contactos" />
                </ListItem>
              ) : null}
              {reporteSobreClientes ? (
                <ListItem
                  component={Link}
                  button
                  to="/reporteSobreClientes"
                  className={classes.listItemText}
                >
                  <Archive />
                  <ListItemText primary="Reporte sobre Cliente" />
                </ListItem>
              ) : null}
              {panelSugerencias ? (
                <ListItem
                  component={Link}
                  button
                  to="/panelSugerencias"
                  className={classes.listItemText}
                >
                  <i notranslate="true" className="material-icons">
                    theater_comedy
                  </i>
                  <ListItemText primary="Consultar Reportes Sobre Clientes" />
                </ListItem>
              ) : null}
            </List>
          </Collapse>
        </List>
      ) : null}
      {gestionClientes ? <Divider /> : null}
      {gestionTareas ? (
        <List>
          <ListItem onClick={handleOpenGestionTareas}>
            <i notranslate="true" className="material-icons">
              pending_actions
            </i>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Gestion de Tareas"
            />
            {openGestionTareas ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openGestionTareas} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {misTareas ? (
                <ListItem
                  component={Link}
                  button
                  to="/tareasPrincipal"
                  className={classes.listItemText}
                >
                  <i notranslate="true" className="material-icons">
                    content_paste
                  </i>
                  <ListItemText primary="Mis Tareas" />
                </ListItem>
              ) : null}
              <div>
                {asignarTareas ? (
                  <ListItem
                    component={Link}
                    button
                    to="/asignarTareas"
                    className={classes.listItemText}
                  >
                    <AssignmentInd />
                    <ListItemText primary="Asignar Tareas" />
                  </ListItem>
                ) : null}
                {panelTareas ? (
                  <ListItem
                    component={Link}
                    button
                    to="/panelTareas"
                    className={classes.listItemText}
                  >
                    <ScreenShare />
                    <ListItemText primary="Panel de Tareas" />
                  </ListItem>
                ) : null}
              </div>
            </List>
          </Collapse>
        </List>
      ) : null}

      {gestionTareas ? <Divider /> : null}
      {marketing ? (
        <List>
          <ListItem onClick={handleOpenMarketing}>
            <Public />
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Marketing"
            />
            {openMarketing ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMarketing} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {campanas ? (
                <ListItem
                  component={Link}
                  button
                  to="/campanasPrincipal"
                  className={classes.listItemText}
                >
                  <i notranslate="true" className="material-icons">
                    campaign
                  </i>
                  <ListItemText primary="Campañas" />
                </ListItem>
              ) : null}
            </List>
            <List component="div" disablePadding>
              {metricas ? (
                <ListItem
                  component={Link}
                  button
                  to="/metricas"
                  className={classes.listItemText}
                >
                  <Assessment />
                  <ListItemText primary="Metricas" />
                </ListItem>
              ) : null}
            </List>
          </Collapse>
        </List>
      ) : null}
      {marketing ? <Divider /> : null}
      {configuracion ? (
        <List>
          <ListItem onClick={handleOpenArchivo}>
            <i notranslate="true" className="material-icons">
              construction
            </i>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Configuracion"
            />
            {openArchivo ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openArchivo} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {crearTiposCampanas ? (
                <ListItem
                  component={Link}
                  button
                  to="/tiposcampanas"
                  className={classes.listItemText}
                >
                  <Radio />
                  <ListItemText primary="Crear Tipos de Campañas" />
                </ListItem>
              ) : null}
              {crearTiposTareas ? (
                <ListItem
                  component={Link}
                  button
                  to="/tipostareas"
                  className={classes.listItemText}
                >
                  <i notranslate="true" className="material-icons">
                    shopping_bag
                  </i>
                  <ListItemText primary="Crear Tipos de Tareas" />
                </ListItem>
              ) : null}
              {asignarRolesUsuarios ? (
                <ListItem
                  component={Link}
                  button
                  to="/usuariosRoles"
                  className={classes.listItemText}
                >
                  <PersonAddDisabled />
                  <ListItemText primary="Asignar Roles a Usuarios" />
                </ListItem>
              ) : null}
              {administrarRoles ? (
                <ListItem
                  component={Link}
                  button
                  to="/rol"
                  className={classes.listItemText}
                >
                  <i notranslate="true" className="material-icons">
                    admin_panel_settings
                  </i>
                  <ListItemText primary="Administrar Roles" />
                </ListItem>
              ) : null}
              {auditoria ? (
                <ListItem
                  component={Link}
                  button
                  to="/auditoria"
                  className={classes.listItemText}
                >
                  <RemoveRedEye />
                  <ListItemText primary="Auditoria" />
                </ListItem>
              ) : null}
              {configurarAlerta ? (
                <ListItem
                  component={Link}
                  button
                  to="/configurarAlerta"
                  className={classes.listItemText}
                >
                  <Alarm />
                  <ListItemText primary="Configuracion de Alertas" />
                </ListItem>
              ) : null}
              {importarExcel ? (
                <ListItem
                  component={Link}
                  button
                  to="/importarExcel"
                  className={classes.listItemText}
                >
                  <i notranslate="true" className="material-icons">
                    receipt_long
                  </i>
                  <ListItemText primary="Importar Excel (Mis Documentos)" />
                </ListItem>
              ) : null}
              {asignarExcel ? (
                <ListItem
                  component={Link}
                  button
                  to="/asignarExcel"
                  className={classes.listItemText}
                >
                  <i notranslate="true" className="material-icons">
                    receipt_long
                  </i>
                  <ListItemText primary="Importar Excel (Para otro Usuario)" />
                </ListItem>
              ) : null}{" "}
              {revertirExcel ? (
                <ListItem
                  component={Link}
                  button
                  to="/revertirExcel"
                  className={classes.listItemText}
                >
                  <Undo />
                  <ListItemText primary="Revertir Importaciones" />
                </ListItem>
              ) : null}{" "}
              {reporteBug ? (
                <ListItem
                  component={Link}
                  button
                  to="/reportarBug"
                  className={classes.listItemText}
                >
                  <BugReport />
                  <ListItemText primary="Reporte de Bugs" />
                </ListItem>
              ) : null}
            </List>
          </Collapse>
        </List>
      ) : null}
    </div>
  );
}

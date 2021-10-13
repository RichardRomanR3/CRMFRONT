import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import RegistrarUsuario from './componentes/Seguridad/RegistrarUsuario';
import { Grid, Snackbar } from '@material-ui/core';
import Login from './componentes/Seguridad/LoginUser';
import PerfilUsuario from './componentes/Seguridad/PerfilUsuario';
import AppNavBar from './componentes/navegacion/AppNavBar';
import { obtenerUsuarioActual } from './actions/UsuariosAction';
import { useStateValue } from './contexto/store';
import RutaSegura from './componentes/navegacion/RutaSegura';
import ClientesPrincipal from './componentes/GestionDeClientes/Clientes/ClientesPrincipal';
import PerfilCliente from './componentes/GestionDeClientes/Clientes/PerfilCliente';
import ClienteNuevo from './componentes/GestionDeClientes/Clientes/ClienteNuevo';
import Roles from './componentes/Seguridad/AdministrarRoles/Roles';
import CrearRol from './componentes/Seguridad/AdministrarRoles/CrearRol';
import RolModificar from './componentes/Seguridad/AdministrarRoles/RolModificar';
import PanelUsuarios from './componentes/Seguridad/PanelUsuarios';
import TiposTareasTb from './componentes/Seguridad/CrearTipoTarea/TiposTareasTb';
import NuevoTipoTarea from './componentes/Seguridad/CrearTipoTarea/NuevoTipoTarea';
import ModificarTipoTarea from './componentes/Seguridad/CrearTipoTarea/ModificarTipoTarea';
import TiposCampanasTb from './componentes/Seguridad/CrearTipoCampana/TipoCampanaTb';
import NuevoTipoCampana from './componentes/Seguridad/CrearTipoCampana/NuevoTipoCampana';
import ModificarTipoCampana from './componentes/Seguridad/CrearTipoCampana/ModificarTipoCampana';
import PosiblesClientesPrincipal from './componentes/GestionDeClientes/PosiblesClientes/PosiblesClientesPrincipal';
import NuevoPosibleCliente from './componentes/GestionDeClientes/PosiblesClientes/NuevoPosibleCliente';
import PerfilPosibleCliente from './componentes/GestionDeClientes/PosiblesClientes/PerfilPosibleCliente';
import ContactosPrincipal from './componentes/GestionDeClientes/Contactos/ContactosPrincipal';
import NuevoContacto from './componentes/GestionDeClientes/Contactos/NuevoContacto';
import PerfilContactos from './componentes/GestionDeClientes/Contactos/PerfilContactos';
import ReporteSobreClientes from './componentes/GestionDeClientes/ReporteSobreClientes/ReporteSobreClientes';
import Prohibido from './componentes/Genericos/Prohibido';
import Difusiones from './componentes/Notas/Difusiones';
import MisNotas from './componentes/Notas/MisNotas';
import NuevaDifusion from './componentes/Notas/NuevaDifusion';
import NuevaNota from './componentes/Notas/NuevaNota';
import AsignarTareas from './componentes/GestionDeTareas/AsignarTareas/AsignarTareas';
import MisTareas from './componentes/GestionDeTareas/MisTareas/MisTareas.js';
import PanelDeTareas from './componentes/GestionDeTareas/PanelDeTareas/PanelDeTareas';
import CampanasPrincipal from './componentes/Marketing/Campanas/CampanasPrincipal';
import NuevaCampana from './componentes/Marketing/Campanas/NuevaCamapana';
import { PerfilCampana } from './componentes/Marketing/Campanas/PerfilCampana';
import NuevaTarea from './componentes/GestionDeTareas/NuevaTarea';
import PerfilTarea from './componentes/GestionDeTareas/PerfilTarea';
import NotasEnviadas from './componentes/Notas/NotasEnviadas';
import NotificacionesMobile from './componentes/navegacion/bar/NotificacionesMobile';
import Alerta from './componentes/navegacion/alerta';
import Auditoria from './componentes/Seguridad/Auditoria';
import PanelReporteSobreClientes from './componentes/GestionDeClientes/ReporteSobreClientes/PanelReporteSobreClientes';
import ConfiguracionAlerta from './componentes/Seguridad/ConfigurarAlerta/ConfiguracionAlerta';
import ImportarExcel from './componentes/Seguridad/ImportarExcel';
import GestionUsuario from './componentes/Seguridad/GestionUsuario';
import ReporteDeBugs from './componentes/Seguridad/ReporteDeBugs';
import AsignarExcel from './componentes/Seguridad/AsignarExcel';
import RevertirExcel from './componentes/Seguridad/RevertirExcel';
import MetricasPrincipal from './componentes/Marketing/Metricas/MetricasPrincipal';
import DasboardPrincipal from './componentes/Dashboard/DashBoardPrincipal';
function App() {
  const [{ openSnackBar }, dispatch] = useStateValue();
  const [iniciaApp, setIniciaApp] = useState(false);
  useEffect(() => {
    if (!iniciaApp) {
      obtenerUsuarioActual(dispatch)
        .then((response) => {
          setIniciaApp(true);
        })
        .catch((error) => {
          setIniciaApp(true);
        });
    }
  }, [iniciaApp, dispatch]);

  return iniciaApp === false ? null : (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackBar ? openSnackBar.open : false}
        autoHideDuration={5000}
        ContentProps={{ 'aria-describedby': 'message-id' }}
        message={
          <span id="message-id">
            {openSnackBar ? openSnackBar.mensaje : ''}
          </span>
        }
        onClose={() =>
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMensaje: {
              open: false,
              mensaje: '',
            },
          })
        }
      ></Snackbar>
      <Router>
        <MuiThemeProvider theme={theme}>
          <Alerta />
          <AppNavBar />
          <Grid container>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/prohibido" component={Prohibido} />
              <RutaSegura
                exact
                path="/registrar"
                component={RegistrarUsuario}
              />
              <RutaSegura exact path="/perfil" component={PerfilUsuario} />
              <RutaSegura exact path="/" component={DasboardPrincipal} />
              <RutaSegura
                exact
                path="/clientesPrincipal"
                component={ClientesPrincipal}
              />
              <RutaSegura exact path="/clienteNuevo" component={ClienteNuevo} />
              <RutaSegura
                exact
                path="/clientePerfil"
                component={PerfilCliente}
              />
              <RutaSegura exact path="/rol" component={Roles} />
              <RutaSegura exact path="/rol/nuevo" component={CrearRol} />
              <RutaSegura
                exact
                path="/rol/modificar"
                component={RolModificar}
              />
              <RutaSegura
                exact
                path="/usuariosRoles"
                component={PanelUsuarios}
              />
              <RutaSegura exact path="/tipostareas" component={TiposTareasTb} />
              <RutaSegura
                exact
                path="/tipostareas/nuevo"
                component={NuevoTipoTarea}
              />
              <RutaSegura
                exact
                path="/tipostareas/modificar"
                component={ModificarTipoTarea}
              />
              <RutaSegura
                exact
                path="/tiposcampanas"
                component={TiposCampanasTb}
              />
              <RutaSegura
                exact
                path="/tipocampana/nuevo"
                component={NuevoTipoCampana}
              />
              <RutaSegura
                exact
                path="/tipocampana/modificar"
                component={ModificarTipoCampana}
              />
              <RutaSegura
                exact
                path="/posiblesClientesPrincipal"
                component={PosiblesClientesPrincipal}
              />
              <RutaSegura
                exact
                path="/posibleClienteNuevo"
                component={NuevoPosibleCliente}
              />
              <RutaSegura
                exact
                path="/posibleClientePerfil"
                component={PerfilPosibleCliente}
              />
              <RutaSegura
                exact
                path="/contactosPrincipal"
                component={ContactosPrincipal}
              />
              <RutaSegura
                exact
                path="/contactosNuevo"
                component={NuevoContacto}
              />
              <RutaSegura
                exact
                path="/contactosPerfil"
                component={PerfilContactos}
              />
              <RutaSegura
                exact
                path="/reporteSobreClientes"
                component={ReporteSobreClientes}
              />
              <RutaSegura exact path="/tareasPrincipal" component={MisTareas} />
              <RutaSegura exact path="/nuevaTarea" component={NuevaTarea} />
              <RutaSegura exact path="/perfilTarea" component={PerfilTarea} />
              <RutaSegura
                exact
                path="/asignarTareas"
                component={AsignarTareas}
              />
              <RutaSegura exact path="/panelTareas" component={PanelDeTareas} />
              <RutaSegura
                exact
                path="/campanasPrincipal"
                component={CampanasPrincipal}
              />
              <RutaSegura exact path="/nuevaCampana" component={NuevaCampana} />
              <RutaSegura
                exact
                path="/modificarCampana"
                component={PerfilCampana}
              />
              <RutaSegura exact path="/difusiones" component={Difusiones} />
              <RutaSegura exact path="/misNotas" component={MisNotas} />
              <RutaSegura
                exact
                path="/nuevaDifusion"
                component={NuevaDifusion}
              />
              <RutaSegura exact path="/nuevaNota" component={NuevaNota} />
              <RutaSegura
                exact
                path="/notasEnviadas"
                component={NotasEnviadas}
              />
              <RutaSegura exact path="/auditoria" component={Auditoria} />
              <RutaSegura
                exact
                path="/panelReporteSobreClientes"
                component={PanelReporteSobreClientes}
              />
              <RutaSegura
                exact
                path="/configurarAlerta"
                component={ConfiguracionAlerta}
              />
              <RutaSegura
                exact
                path="/importarExcel"
                component={ImportarExcel}
              />
              <RutaSegura
                exact
                path="/gestionRolesUsuarios"
                component={GestionUsuario}
              />
              <RutaSegura exact path="/asignarExcel" component={AsignarExcel} />
              <RutaSegura exact path="/reportarBug" component={ReporteDeBugs} />
              <RutaSegura
                exact
                path="/revertirExcel"
                component={RevertirExcel}
              />
              <RutaSegura
                exact
                path="/metricas"
                component={MetricasPrincipal}
              />
            </Switch>
          </Grid>
          <NotificacionesMobile />
        </MuiThemeProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;

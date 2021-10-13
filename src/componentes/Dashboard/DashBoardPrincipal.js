import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import CalendarioPersonal from "./CalendarioPersonal";
import CantidadTareasCerradasUsuarioCard from "./CantidadTareasCerradasUsuarioCard";
import CantidadTareasPendientesUsuarioCard from "./CantidadTareasPendientesUsuarioCard";
import { useStateValue } from "../../contexto/store";

export default function DasboardPrincipal() {
  const [tareasPendientesUsuDia, setTareasPendientesUsuDia] = useState(false);
  const [tareasCerradasUsuDia, setTareasCerradasUsuDia] = useState(false);
  const [calendario, setCalendario] = useState(false);
  const [{ sesionUsuario }] = useStateValue();
  const evaluarPermiso = (arrayrevisar, ruta) => {
    var boolEvaluacion = false;

    let existe = arrayrevisar.filter((pantallazo) => pantallazo.path === ruta);

    if (existe.length > 0) {
      boolEvaluacion = true;
    }

    return boolEvaluacion;
  };
  useEffect(() => {
    const VerificarPermisos = (arrPermisos) => {
      setTareasCerradasUsuDia(
        evaluarPermiso(arrPermisos, "/tareasCerradasUsuDia")
      );
      setTareasPendientesUsuDia(
        evaluarPermiso(arrPermisos, "/tareasPendientesUsuDia")
      );
      setCalendario(evaluarPermiso(arrPermisos, "/calendario"));
    };
    VerificarPermisos(sesionUsuario.usuario.pantallasUsuario.listaPantallasRol);
  }, [sesionUsuario]);
  return (
    <Container
      maxWidth="lg"
      style={{
        marginTop: "10px",
        maxHeight: "90vh",
        minHeight: "90vh",
        overflow: "auto",
      }}
    >
      <Grid
        container
        spacing={4}
        direction="row"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
      >
        {tareasCerradasUsuDia ? (
          <Grid item xs={12} sm={12} xl={4} lg={4} md={4}>
            <CantidadTareasCerradasUsuarioCard />
          </Grid>
        ) : null}
        {tareasPendientesUsuDia ? (
          <Grid item xs={12} sm={12} xl={4} lg={4} md={4}>
            <CantidadTareasPendientesUsuarioCard />
          </Grid>
        ) : null}
        {calendario ? (
          <Grid
            container
            spacing={2}
            direction="column"
           style={{marginTop:'10px'}}
          >
            <Grid item xs={12} sm={12} xl={12} lg={12} md={12}>
              <Typography variant="h4" align="center">
                Calendario de tareas
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} xl={12} lg={12} md={12}>
              <CalendarioPersonal />
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Container>
  );
}

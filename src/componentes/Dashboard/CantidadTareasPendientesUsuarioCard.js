import React,{useEffect,useState} from "react";
import { Card, CardHeader, CardContent,Typography } from "@material-ui/core";
import { useStateValue } from "../../contexto/store";
import * as signalR from "@microsoft/signalr";
import { obtenerTareasNotificacion } from "../../actions/TareasAction";
//obtenerTareasNotificacion
export default function CantidadTareasPendientesUsuarioCard() {
  const [{sesionUsuario}]=useStateValue();
  const [cantidadTareas,setCantidadTareas]=useState(0);
  useEffect(()=>{
    const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(
          "http://localhost:5000/chatHub?username=" +
            sesionUsuario.usuario.userName
        )
        .build();
      hubConnection
        .start()
        .catch((err) => console.error("SignalR Connection Error: ", err));

      hubConnection.on("CuentaTareas", (TAREAS) => {
        setCantidadTareas(TAREAS.cuenta);
      });
    let objetoNoti = {
      USUARIOASIGNADO: sesionUsuario.usuario.id,
      UserName: sesionUsuario.usuario.userName,
    };
    /*RRR: en esta seccion se traen las notificaciones por primera vez 
    que se inicia el sistema y/o al actualizar el sistema */
    obtenerTareasNotificacion(objetoNoti).then((response) => {
      if (response === undefined) {
        obtenerTareasNotificacion(objetoNoti).then((response) => {
          setCantidadTareas(response.data.cuenta);
        });
      } else {
        setCantidadTareas(response.data.cuenta);
      }
    });
  },[sesionUsuario])
  return (
    <Card>
      <CardHeader title="Mis tareas pendientes del día" titleTypographyProps={{align:'center'}} />
      <CardContent >
        <Typography align='center' variant="h2">{cantidadTareas}</Typography>
      </CardContent>
    </Card>
  );
}

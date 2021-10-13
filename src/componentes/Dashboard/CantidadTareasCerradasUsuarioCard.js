import React,{useEffect,useState} from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { useStateValue } from "../../contexto/store";
import * as signalR from "@microsoft/signalr";
import { obtenerTareasCerradas } from "../../actions/TareasAction";
//obtenerTareasCerradas
export default function CantidadTareasCerradasUsuarioCard() {
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

      hubConnection.on("CuentaTareasCerradas", (TAREAS) => {
        setCantidadTareas(TAREAS.cuenta);
      });
    let objetoNoti = {
      USUARIOASIGNADO: sesionUsuario.usuario.id,
      UserName: sesionUsuario.usuario.userName,
    };
    /*RRR: en esta seccion se traen las notificaciones por primera vez 
    que se inicia el sistema y/o al actualizar el sistema */
    obtenerTareasCerradas(objetoNoti).then((response) => {
      if (response === undefined) {
        obtenerTareasCerradas(objetoNoti).then((response) => {
          setCantidadTareas(response.data.cuenta);
        });
      } else {
        setCantidadTareas(response.data.cuenta);
      }
    });
  },[sesionUsuario])
  return (
    <Card>
      <CardHeader title="Mis tareas cerradas en el día" titleTypographyProps={{align:'center'}} />
      <CardContent>
        <Typography align='center' variant="h2">{cantidadTareas}</Typography>
      </CardContent>
    </Card>
  );
}

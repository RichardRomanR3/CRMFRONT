import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { obtenerEventos } from "../../actions/ReportesAction";
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from "moment";
import { useStateValue } from "../../contexto/store";
require("moment/locale/es.js");
const localizer = momentLocalizer(moment);
export default function CalendarioPersonal() {
  const [eventos, setEventos] = useState([]);
  const [{sesionUsuario}]=useStateValue();
  useEffect(() => {
    obtenerEventos(sesionUsuario.usuario.id).then((response) => {
      if (response.status === 200) {
        setEventos(response.data);
      }
    });
  }, [sesionUsuario]);
  return (
    <Calendar
      resizable
      views={''}
      localizer={localizer}
      defaultDate={new Date()}
      defaultView="month"
      events={eventos}
      style={{ height: "90vh" }}
      messages={{
        next: "Siguiente",
        previous: "Anterior",
        today: "Hoy",
        month: "Mes",
        week: "Semana",
        day: "Día",
      }}
    />
  );
}

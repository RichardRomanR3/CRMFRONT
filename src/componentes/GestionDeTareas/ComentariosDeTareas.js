import React, { useState, useEffect } from "react";
import {
  CardHeader,
  Container,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import { obtenerComentariosDeTarea } from "../../actions/TareasAction";
import { useStateValue } from "../../contexto/store";
import moment from "moment";
function ComentariosDeTareas({ tareaId,comentario }){
  //eslint-disable-next-line
  const [{ openSnackbar }, dispatch] = useStateValue();
  const [arrayComentarios, setArrayComentarios] = useState([]);
  useEffect(() => {
    obtenerComentariosDeTarea(tareaId).then((response) => {
      if (response.status === 200) {
        console.log("response ", response);
        setArrayComentarios(response.data);
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Errores al intentar obtener comentarios",
          },
        });
      }
    });
  }, [tareaId, dispatch,comentario]);
  return (
    <Container
      component="main"
      maxWidth="lg"
      style={{ maxHeight: "250px", overflow: "auto" ,display:'flex',flexDirection:'column'}}
    >
      {arrayComentarios.map((comentario) => (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card style={{marginBottom:'10px',borderStyle:'solid'}}>
              <CardHeader
                subheader={`Fecha del comentario ${moment(
                  comentario.fecgra
                ).format("DD/MM/YYYY")}`}
              />
              <CardContent>{comentario.comentario}</CardContent>
            </Card>
          </Grid>
        </Grid>
      ))}
    </Container>
  );
}
export default React.memo(ComentariosDeTareas);

import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import style from "../../Tools/Style";
import {  obtenerDatosCampana } from "../../../actions/MetricasAction";
import { obtenerCampanas, obtenerClientesPorCampana } from "../../../actions/CampanasAction";
import moment from "moment";
import TClientes from "../../GestionDeClientes/Clientes/TClientes";
export default function MetricasPrincipal() {
  const [campana, setCampana] = useState("");
  const [Datac, setDatac] = useState([]);
  const [Datar, setDatar] = useState([]);
  const [datosCargados, setDatosCargados] = useState(false);

  const campanaHandleChange = (id) => {
    obtenerDatosCampana(id).then((response) => {
      if (response.status === 200) {
        setCampana(response.data);
      }
    });
    obtenerClientesPorCampana(id).then((response) => {
      if (response.status === 200) {
        const Data = response.data;
        setDatar(Data);
        setDatosCargados(true);
      } else {
        setDatosCargados(false);
      }
    });
  };
  useEffect(() => {
    obtenerCampanas().then((response) => {
      if (response.status === 200) {
        setDatac(response.data);
      }
    });
  }, []);
  return (
    <Container component="main" justify="center">
      <Grid
        container
        spacing={4}
        direction="column"
        style={{ marginTop: "10px" }}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" style={{ alignSelf: "center" }}>
          Metricas
        </Typography>
        <Grid item lg={12} xs={12} md={12} sm={12}>
          <Autocomplete
            id="combo-box-demo2"
            options={Datac}
            getOptionLabel={(Datac) => Datac.descricampana}
            style={style.SelectDi}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar Campaña"
                variant="outlined"
              />
            )}
            onChange={(e, value) => {
              campanaHandleChange(value && value.campanA_Id);
            }}
          />
        </Grid>

        {campana ? (
          <Grid item xs={6} sm={6} lg={6} md={6}>
            <Card>
              <CardContent>
                Nombre de la Campaña : {campana.descricampana}
              </CardContent>
              <CardContent>
                Fecha de lanzamiento :{" "}
                {moment(campana.fecgra).format("DD/MM/YYYY")}
              </CardContent>
              <CardContent>
                Clientes alcanzados : {campana.clientesAlcanzados}
              </CardContent>
              <CardContent>Presupuesto : {Intl.NumberFormat('es').format(campana.presupuesto)+' Gs'}</CardContent>
              <CardContent>Costo de Adquisición de Cliente (CAC) : {campana.clientesAlcanzados !== 0? Intl.NumberFormat('es').format(Math.round(campana.presupuesto / campana.clientesAlcanzados)):0 +' Gs'}</CardContent>
            </Card>
            <br />
            <Typography variant="h5" align="center">
              Lista de Clientes alcanzados por la campaña
            </Typography>
            <br/>

          </Grid>
        ) : null}
      </Grid>
      {campana ? (
        <Grid container>
          <Grid item xs={12}>
            {datosCargados ? (
              <TClientes rows={Datar}></TClientes>
            ) : (
              <Grid container justify="center">
                <CircularProgress />
                <br />
                <Typography>Cargando...</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      ) : null}
    </Container>
  );
}

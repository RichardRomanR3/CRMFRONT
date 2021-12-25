import React, { useState, useEffect } from "react";
import TUsuarios from "./TUsuarios";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import style from "../Tools/Style";
import { obtenerListaUsuarios } from "../../actions/UsuariosAction";
import SearchIcon from "@material-ui/icons/Search";
const PanelUsuarios = () => {
  const [termp, setTermp] = useState("");
  const [dataUsu, setDataUsu] = useState([]);
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const history = useHistory();
  const seleccionarUsuario = (usuario) => {
    history.push({ pathname: "/gestionRolesUsuarios", state: usuario });
  };
  const goToRegistrarUsuario=()=>{
    history.push('/registrarUsuario')
  }
  useEffect(() => {
    setMostrarTabla(true);
    obtenerListaUsuarios().then((response) => {
      if (response.status === 200) {
        const Data = response.data;
        setDataUsu(Data);
      }
    });
  }, [mostrarTabla]);
  return (
    <Container component="main" justify="center">
      <br></br>
      <Typography align="center" component="h1" variant="h6">
        Usuarios
      </Typography>
      <Grid container direction="row">
        <Grid item>
          <Button onClick={goToRegistrarUsuario}variant="contained" color="primary">
            Registrar usuario
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <SearchIcon />
        </Grid>
        <Grid item>
          <TextField
            multiline
            name="termp"
            style={style.TextField}
            onChange={(e) => setTermp(e.target.value)}
            label="Buscar"
          />
        </Grid>
      </Grid>
      <br/>
      <TUsuarios
        rows={dataUsu}
        seleccionar={seleccionarUsuario}
        termp={termp}
      ></TUsuarios>
    </Container>
  );
};
export default PanelUsuarios;

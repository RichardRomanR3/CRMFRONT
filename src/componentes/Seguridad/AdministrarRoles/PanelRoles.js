import style from '../../Tools/Style';
import SearchIcon from '@material-ui/icons/Search';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  makeStyles,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  ObtenerCategoriasPantallas,
  ObtenerPantallasRol,
} from '../../../actions/PantallasAction';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const PanelRoles = (props) => {
  const codigoRol = props.codigoRol;
  const [categorias, setCategorias] = useState([]);
  const [pantallasRol, setPantallasRol] = useState([]);
  const [permisosManejador, setPermisosManejador] = useState([]);
  const [auxiliar, setAuxiliar] = useState();

  useEffect(() => {
    ObtenerCategoriasPantallas().then((response) => {
      setCategorias(response.data);
    });

    if (props.procedencia === 'rolModificar') {
      ObtenerPantallasRol(codigoRol).then((response) => {
        setPantallasRol(response.data.listaPantallasRol);
      });
    }
  }, [codigoRol, props.procedencia]);

  useEffect(() => {
    AsignarSwitchsAlCargar(categorias, pantallasRol);
  }, [categorias, pantallasRol]);

  const AuxiAuxiliar = () => {
    //FERNANDO COLUCCI
    //este procesillo obliga al componente a re-renderizarse
    if (auxiliar === 0) {
      setAuxiliar(1);
    } else {
      setAuxiliar(0);
    }
  };

  const AsignarSwitchsAlCargar = (array1, array2) => {
    //FERNANDO COLUCCI
    //En el array1 vienen todas las pantallas categorizadas
    //En el array2 todas las pantallas que tiene permitidas el ROL

    var pantallasx = [];

    if (array1 && array2) {
      for (let i = 0; i < array1.length; i++) {
        let id_c = array1[i].categoriaId;
        let nombre_c = array1[i].nombre;
        let ruta_c = array1[i].ruta;
        let checked_c = false;
        let arrSubCat = [];
        let existe_sc = array2.filter(
          (pantallazo) => pantallazo.path === array1[i].ruta
        );

        if (existe_sc.length > 0) {
          checked_c = true;
        }

        for (let j = 0; j < array1[i].subcategoriasLista.length; j++) {
          let id_sc = array1[i].subcategoriasLista[j].subcategoriaId;
          let nombre_sc = array1[i].subcategoriasLista[j].nombre;
          let ruta_sc = array1[i].subcategoriasLista[j].ruta;
          let checked_sc = false;
          let arrPantallas = [];
          let existe_p = array2.filter(
            (pantallazo) =>
              pantallazo.path === array1[i].subcategoriasLista[j].ruta
          );

          if (existe_p.length > 0) {
            checked_sc = true;
          }

          for (
            let k = 0;
            k < array1[i].subcategoriasLista[j].pantallasLista.length;
            k++
          ) {
            let id_pan =
              array1[i].subcategoriasLista[j].pantallasLista[k].pantallA_Id;
            let nombre_pan =
              array1[i].subcategoriasLista[j].pantallasLista[k].nombrepantalla;
            let ruta_pan =
              array1[i].subcategoriasLista[j].pantallasLista[k].path;
            let checked_pan = false;
            let existe_p = array2.filter(
              (pantallazo) =>
                pantallazo.path ===
                array1[i].subcategoriasLista[j].pantallasLista[k].path
            );

            if (existe_p.length > 0) {
              checked_pan = true;
            }

            const pant = {
              pantallA_Id: id_pan,
              nombrepantalla: nombre_pan,
              path: ruta_pan,
              checked: checked_pan,
            };
            arrPantallas.push(pant);
          }

          const subcat = {
            subcategoriaId: id_sc,
            nombre: nombre_sc,
            ruta: ruta_sc,
            checked: checked_sc,
            pantallasLista: arrPantallas,
          };
          arrSubCat.push(subcat);
        }

        const categ = {
          categoriaId: id_c,
          nombre: nombre_c,
          ruta: ruta_c,
          checked: checked_c,
          subcategoriasLista: arrSubCat,
        };
        pantallasx.push(categ);
      }

      setPermisosManejador(pantallasx);
    }
  };

  const ManejadorCategoria = (categoriax) => {
    const boo = !categoriax.checked;
    categoriax.checked = boo;

    for (let i = 0; i < categoriax.subcategoriasLista.length; i++) {
      categoriax.subcategoriasLista[i].checked = boo;
      for (
        let j = 0;
        j < categoriax.subcategoriasLista[i].pantallasLista.length;
        j++
      ) {
        categoriax.subcategoriasLista[i].pantallasLista[j].checked = boo;
      }
    }

    props.actualizarPermisos(permisosManejador);

    AuxiAuxiliar();
  };

  const ManejadorSubcategoria = (categoriax, subcategoriax) => {
    const boo = !subcategoriax.checked;
    subcategoriax.checked = boo;

    for (let i = 0; i < subcategoriax.pantallasLista.length; i++) {
      subcategoriax.pantallasLista[i].checked = boo;
    }

    let contador = 0;
    for (let i = 0; i < categoriax.subcategoriasLista.length; i++) {
      if (categoriax.subcategoriasLista[i].checked === true) {
        categoriax.checked = true;
      } else {
        contador++;
      }
    }

    if (contador === categoriax.subcategoriasLista.length) {
      categoriax.checked = false;
    }

    props.actualizarPermisos(permisosManejador);

    AuxiAuxiliar();
  };

  const ManejadorPantalla = (categoriax, subcategoriax, pantallax) => {
    const boo = !pantallax.checked;
    pantallax.checked = boo;

    if (boo === true) {
      subcategoriax.checked = true;
      categoriax.checked = true;
    }

    props.actualizarPermisos(permisosManejador);

    AuxiAuxiliar();
  };
  //FERNANDO COLUCCI
  //ACCORDION
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      background: '#CCCCCC',
      //background: '#1976d2',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //FERNANDO COLUCCI
  //BUSQUEDA
  const [term, setTerm] = useState('');

  const searchingTerm = (term) => {
    return function (x) {
      return (
        x.nombre
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toUpperCase()
          .includes(term.toUpperCase()) || !term
      );
    };
  };

  return (
    <Grid container spacing={3} justify="center">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <br />
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <SearchIcon />
            </Grid>
            <Grid item>
              <TextField
                name="term"
                style={style.TextField}
                onChange={(e) => setTerm(e.target.value)}
                id="input-with-icon-grid"
                label="Buscar"
              />
            </Grid>
          </Grid>
          <br />
        </Grid>
      </Grid>

      {permisosManejador
        ? permisosManejador.filter(searchingTerm(term)).map((categoria) => (
            <Grid
              key={categoria.categoriaId}
              item
              lg={6}
              xs={12}
              md={12}
              sm={12}
            >
              <Accordion
                className={classes.root}
                expanded={expanded === categoria.categoriaId}
                style={
                  expanded === categoria.categoriaId
                    ? { background: '#1976d2' }
                    : { background: '#CCCCCC' }
                }
                onChange={handleChange(categoria.categoriaId)}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      style={
                        expanded === categoria.categoriaId
                          ? { color: '#FFFFFF' }
                          : { color: '#000000' }
                      }
                    />
                  }
                >
                  <TableContainer component={Paper} align="center">
                    <Table size="small" aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">
                            <h3 style={{ color: '#000000' }}>
                              {categoria.nombre}
                            </h3>
                          </TableCell>
                          <TableCell align="right">
                            <Switch
                              checked={categoria.checked}
                              color="primary"
                              onClick={() => ManejadorCategoria(categoria)}
                            />
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                </AccordionSummary>

                <AccordionDetails>
                  <TableContainer component={Paper} align="center">
                    {categoria.subcategoriasLista.map((subcategoria) => (
                      <Table
                        size="small"
                        aria-label="simple table"
                        key={subcategoria.subcategoriaId}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">
                              <h3>{subcategoria.nombre}</h3>
                            </TableCell>
                            <TableCell align="right">
                              <Switch
                                checked={subcategoria.checked}
                                color="primary"
                                onClick={() =>
                                  ManejadorSubcategoria(categoria, subcategoria)
                                }
                              />
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {subcategoria.pantallasLista.map((pantallazo) => (
                            <TableRow key={pantallazo.pantallA_Id}>
                              <TableCell align="left">
                                <Typography>
                                  {' '}
                                  {pantallazo.nombrepantalla}
                                </Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Switch
                                  checked={pantallazo.checked}
                                  color="primary"
                                  size="small"
                                  onClick={() =>
                                    ManejadorPantalla(
                                      categoria,
                                      subcategoria,
                                      pantallazo
                                    )
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ))}
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))
        : null}
    </Grid>
  );
};

export default PanelRoles;

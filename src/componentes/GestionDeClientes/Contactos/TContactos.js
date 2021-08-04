import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import style from '../../Tools/Style';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
const columns = [
  { id: 'nombre', label: 'NOMBRE', minWidth: 100 },
  { id: 'apellido', label: 'APELLIDO/RAZON SOCIAL', minWidth: 200 },
  {
    id: 'ci',
    label: 'CI',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('es-ES'),
  },
  {
    id: 'ruc',
    label: 'RUC',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('es-ES'),
  },
  { id: 'telefono', label: 'TELEFONO', minWidth: 100 },
  { id: 'email', label: 'EMAIL', minWidth: 100 },
  { id: 'cliente', label: 'CLIENTE DE REFERENCIA', minWidth: 100 },
  { id: 'acciones', label: 'ACCIONES', minWidth: 100 },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function TContactos(props) {
  const mounted = useRef(true);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = props.rows;
  const termc = props.termc;
  const history = useHistory();
  const abrirPerfilContacto = (contacto) => {
    history.push({ pathname: '/contactosPerfil', state: contacto });
  };
  useEffect(() => {
    return function cleanup() {
      mounted.current = false;
    };
  }, [rows]);
  function searchingTermc(termc) {
    return function (x) {
      let nombre = '';
      if (x.nombre === null) {
        nombre = '';
      } else {
        nombre = x.nombre;
      }
      let apellido = '';
      if (x.apellido === null) {
        apellido = '';
      } else {
        apellido = x.apellido;
      }
      let clienten = '';
      if (x.clientes === null) {
        clienten = '';
      } else {
        clienten = x.clientes.nombre;
      }
      let clientea = '';
      if (x.clientes === null) {
        clientea = '';
      } else {
        clientea = x.clientes.apellido;
      }
      return (
        nombre.toUpperCase().includes(termc.toUpperCase()) ||
        apellido.toUpperCase().includes(termc.toUpperCase()) ||
        clientea.toUpperCase().includes(termc.toUpperCase()) ||
        clienten.toUpperCase().includes(termc.toUpperCase()) ||
        !termc
      );
    };
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .filter(searchingTermc(termc))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((contacto) => (
                <TableRow key={contacto.contactO_Id}>
                  <TableCell align="left">{contacto.nombre}</TableCell>
                  <TableCell align="left">{contacto.apellido}</TableCell>
                  <TableCell align="left">{contacto.ci}</TableCell>
                  <TableCell align="left">{contacto.ruc}</TableCell>
                  <TableCell align="left">{contacto.telefono}</TableCell>
                  <TableCell align="left">{contacto.email}</TableCell>
                  <TableCell align="left">
                    {contacto.clientes !== null
                      ? contacto.clientes.nombre +
                        ' ' +
                        contacto.clientes.apellido
                      : ' '}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      color="primary"
                      style={style.submit.submitTabla}
                      onClick={() => abrirPerfilContacto(contacto)}
                      label="Administrar"
                    >
                      Perfil
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

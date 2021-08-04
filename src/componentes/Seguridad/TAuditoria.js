import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import { useStateValue } from '../../contexto/store.js';

const columns = [
  { id: 'usuario', label: 'Usuario', minWidth: 100 },
  { id: 'accion', label: 'Accion', minWidth: 100 },
  { id: 'panel', label: 'Panel', minWidth: 280 },
  { id: 'fechadeaccion', label: 'Fecha del Registro', minWidth: 150 },
  { id: 'horadelregistro', label: 'Hora del Registro', minWidth: 150 },
];
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
});

export default function TAuditoria(props) {
  const mounted = useRef(true);
  //eslint-disable-next-line
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = props.rows;
  const term = props.term;

  function searchingTermc(term) {
    return function (x) {
      let usuarionombre = 0;
      if (x.usuarionombre === null) {
        usuarionombre = 0;
      } else {
        usuarionombre = x.usuarionombre;
      }
      let accion = '';
      if (x.accion === null) {
        accion = '';
      } else {
        accion = x.accion;
      }
      let panel = '';
      if (x.panel === null) {
        panel = '';
      } else {
        panel = x.panel;
      }
      let tabla = '';
      if (x.tabla === null) {
        tabla = '';
      } else {
        tabla = x.tabla;
      }

      let filaafectada = '';
      if (x.filaafectada === null) {
        filaafectada = '';
      } else {
        filaafectada = x.filaafectada;
      }

      let fechadeaccion = '';
      if (x.fechadeaccion === null) {
        fechadeaccion = '';
      } else {
        fechadeaccion = x.fechadeaccion;
      }

      return (
        usuarionombre.toLowerCase().includes(term.toLowerCase()) ||
        accion.toLowerCase().includes(term.toLowerCase()) ||
        panel.toLowerCase().includes(term.toLowerCase()) ||
        tabla.toLowerCase().includes(term.toLowerCase()) ||
        filaafectada.toLowerCase().includes(term.toLowerCase()) ||
        fechadeaccion.toLowerCase().includes(term.toLowerCase()) ||
        !term
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

  useEffect(() => {
    if (mounted.current) {
    }

    return function cleanup() {
      mounted.current = false;
    };
  }, [rows]);
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
              .filter(searchingTermc(term))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((audit) => (
                <TableRow key={audit.id}>
                  <TableCell align="left">{audit.usuarionombre}</TableCell>
                  <TableCell align="left">{audit.accion}</TableCell>
                  <TableCell align="left">{audit.panel}</TableCell>
                  <TableCell align="left">
                    {audit.fechadeaccion.substr(0, 10)}
                  </TableCell>
                  <TableCell align="left">
                    {audit.fechadeaccion.substr(11, 5) + ' hs'}
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

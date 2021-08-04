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
import style from '../../Tools/Style.js';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
const columns = [
  { id: 'codigo', label: 'Codigo', minWidth: 20 },
  { id: 'campana', label: 'Campaña', minWidth: 100 },
  { id: 'tipo', label: 'Tipo', minWidth: 100 },
  { id: 'detalles', label: 'Detalles', minWidth: 100 },
  { id: 'objetivos', label: 'Objetivos', minWidth: 100 },
  { id: 'presupuesto', label: 'Presupuesto', minWidth: 100 },
  { id: 'empresa', label: 'Empresa Contratada', minWidth: 100 },
  { id: 'geografia', label: 'Geografia', minWidth: 100 },
  { id: 'estado', label: 'Estado', minWidth: 80 },
  { id: 'acciones', label: 'ACCIONES', minWidth: 80 },
];
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
});

export default function TCampanas(props) {
  const mounted = useRef(true);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = props.rows;
  const term = props.termc;
  const history = useHistory();
  const abrirPerfilCampana = (campana) => {
    history.push({ pathname: '/modificarCampana', state: campana });
  };
  useEffect(() => {
    return function cleanup() {
      mounted.current = false;
    };
  }, [rows]);
  function searchingTermc(term) {
    return function (x) {
      let estado = '';
      if (x.estadocampana === null) {
        estado = '';
      } else {
        estado = x.estadocampana;
      }
      let tipocampana = '';
      if (x.tipocampana.descritipocampana === null) {
        tipocampana = '';
      } else {
        tipocampana = x.tipocampana.descritipocampana;
      }
      let descricampana = '';
      if (x.descricampana === null) {
        descricampana = '';
      } else {
        descricampana = x.descricampana;
      }
      let codcampana = 0;
      if (x.codcampana === null) {
        codcampana = 0;
      } else {
        codcampana = x.codcampana;
      }
      return (
        descricampana.toLowerCase().includes(term.toLowerCase()) ||
        tipocampana.toLowerCase().includes(term.toLowerCase()) ||
        estado.toLowerCase().includes(term.toLowerCase()) ||
        codcampana.toString().toLowerCase().includes(term.toLowerCase()) ||
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
              .map((campana) => (
                <TableRow key={campana.campanA_Id}>
                  <TableCell align="left">{campana.codigo}</TableCell>
                  <TableCell align="left">{campana.descricampana}</TableCell>
                  <TableCell align="left">
                    {campana.tipocampana.descritipocampana}
                  </TableCell>
                  <TableCell align="left">{campana.numcampana}</TableCell>
                  <TableCell align="left">{campana.objetivos}</TableCell>
                  <TableCell align="left">
                    {Intl.NumberFormat('es').format(campana.presupuesto)}
                  </TableCell>
                  <TableCell align="left">
                    {campana.empresacontratada}
                  </TableCell>
                  <TableCell align="left">{campana.geografia}</TableCell>
                  <TableCell align="left">{campana.estadocampana}</TableCell>
                  <TableCell align="left">
                    <Button
                      color="primary"
                      style={style.submit.submitTabla}
                      onClick={() => abrirPerfilCampana(campana)}
                      label="Administrar"
                    >
                      Modificar
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

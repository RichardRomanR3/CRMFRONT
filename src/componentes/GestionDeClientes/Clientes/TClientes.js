import React from 'react';
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
// FERNADO COLUCCI/RICHARD ROMAN
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});
const TClientes = (props) => {
  let columns = [];
  if (props.seleccionar !== undefined) {
    columns = [
      { id: 'nombre', label: 'NOMBRE', minWidth: 100 },
      { id: 'apellido', label: 'APELLIDO/RAZON SOCIAL', minWidth: 200 },
      {
        id: 'ci',
        label: 'CI',
        minWidth: 40,
      },
      {
        id: 'ruc',
        label: 'RUC',
        minWidth: 60,
      },
    ];
  } else {
    columns = [
      { id: 'codcliente', label: 'CODIGO', minWidth: 50 },
      { id: 'numcliente', label: 'NUMCLIENTE', minWidth: 50 },
      { id: 'nombre', label: 'NOMBRE', minWidth: 100 },
      { id: 'apellido', label: 'APELLIDO/RAZON SOCIAL', minWidth: 200 },
      {
        id: 'ci',
        label: 'CI',
        minWidth: 40,
      },
      {
        id: 'ruc',
        label: 'RUC',
        minWidth: 60,
      },
      { id: 'acciones', label: 'ACCIONES', minWidth: 80 },
    ];
  }
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = props.rows;
  const termc = props.termc;
  const history = useHistory();
  const abrirPerfilCliente = (cliente) => {
    history.push({ pathname: '/clientePerfil', state: cliente });
  };

  function searchingTermc(termc) {
    return function (x) {
      let nombre = '';
      if (x.nombre === null || x.nombre === undefined) {
        nombre = '';
      } else {
        nombre = x.nombre;
      }
      let apellido = '';
      if (x.apellido === null || x.apellido === undefined) {
        apellido = '';
      } else {
        apellido = x.apellido;
      }
      let codcliente = 0;
      if (x.codcliente === null || x.codcliente === undefined) {
        codcliente = 0;
      } else {
        codcliente = x.codcliente;
      }
      let ci = '';
      if (x.ci === null || x.ci === undefined) {
        ci = '';
      } else {
        ci = x.ci;
      }
      let ruc = '';
      if (x.ruc === null || x.ruc === undefined) {
        ruc = '';
      } else {
        ruc = x.ruc;
      }
      return (
        nombre.toUpperCase().includes(termc.toUpperCase()) ||
        apellido.toUpperCase().includes(termc.toUpperCase()) ||
        codcliente.toString().toUpperCase().includes(termc.toUpperCase()) ||
        ci.toUpperCase().includes(termc.toUpperCase()) ||
        ruc.toUpperCase().includes(termc.toUpperCase()) ||
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
  if (props.seleccionar === undefined) {
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
                .map((cliente) => (
                  <TableRow key={cliente.clientE_Id}>
                    <TableCell align="left">{cliente.codcliente}</TableCell>
                    <TableCell align="left">{cliente.numcliente}</TableCell>
                    <TableCell align="left">{cliente.nombre}</TableCell>
                    <TableCell align="left">{cliente.apellido}</TableCell>
                    <TableCell align="left">{cliente.ci}</TableCell>
                    <TableCell align="left">{cliente.ruc}</TableCell>
                    <TableCell align="left">
                      <Button
                        color="primary"
                        style={style.submit.submitTabla}
                        onClick={() => abrirPerfilCliente(cliente)}
                        label="Administrar"
                      >
                        PERFIL
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
  } else {
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
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.ci}
                      onClick={() => {
                        props.seleccionar(row);
                        props.setTermc('');
                      }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
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
};

export default TClientes;

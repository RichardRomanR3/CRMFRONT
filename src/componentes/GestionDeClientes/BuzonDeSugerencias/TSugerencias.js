import React, { useState } from 'react';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@material-ui/core';
import RichTextEditor from 'react-rte';
import moment from 'moment';
import { cambiarEstadoSugerencia } from '../../../actions/SugerenciasAction';
import { useStateValue } from '../../../contexto/store';
const columns = [
  { id: 'cliente', label: 'Cliente', minWidth: 100 },
  { id: 'fecha', label: 'Fecha', minWidth: 200 },
  { id: 'estado', label: 'Estado', minWidth: 200 },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function TSugerencias(props) {
  const classes = useStyles();
  //eslint-disable-next-line
  const [{ openSnackBar }, dispatch] = useStateValue();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sugerencia, setSugerencia] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const rows = props.rows;
  const term = props.term;
  const seleccionar = (sugerencia) => {
    setSugerencia(sugerencia);
    abrirDialog();
  };
  const abrirDialog = () => {
    setOpenDialog(true);
  };
  const cerrarDialog = () => {
    setOpenDialog(false);
  };
  const marcarSugerencia = () => {
    let objeto = {
      estado: 'REVISADO',
    };
    cambiarEstadoSugerencia(sugerencia.id, objeto).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Se cambio el estado de la sugerencia',
          },
        });
        window.location.reload();
      }
    });
  };
  function searchingTerm(term) {
    return function (x) {
      let nombre = '';
      if (x.cliente.nombre === null) {
        nombre = '';
      } else {
        nombre = x.cliente.nombre;
      }
      let apellido = '';
      if (x.cliente.apellido === null) {
        apellido = '';
      } else {
        apellido = x.cliente.apellido;
      }
      return (
        nombre.toUpperCase().includes(term.toUpperCase()) ||
        apellido.toUpperCase().includes(term.toUpperCase()) ||
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
              .filter(searchingTerm(term))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((sugerencia) => (
                <TableRow
                  hover
                  onClick={() => seleccionar(sugerencia)}
                  key={sugerencia.id}
                >
                  <TableCell align="left">
                    {sugerencia.cliente.nombre +
                      ' ' +
                      sugerencia.cliente.apellido}
                  </TableCell>
                  <TableCell align="left">
                    {moment(sugerencia.fecgra).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align="left">
                    {sugerencia.estado === null ? (
                      <Typography color="secondary">No revisado</Typography>
                    ) : (
                      <Typography style={{ color: '#357a38' }}>
                        Revisado
                      </Typography>
                    )}
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
      <div notranslate="true">
        <Dialog
          open={openDialog}
          onClose={cerrarDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Sugerencia de{' '}
            {sugerencia.cliente
              ? sugerencia.cliente.nombre + ' ' + sugerencia.cliente.apellido
              : ''}{' '}
            :
          </DialogTitle>
          <DialogContent>
          <RichTextEditor
                placeholder='Escribir aqui...'
                value={RichTextEditor.createValueFromString(sugerencia.sugerencia, 'html')}
                id="body-text"
                name="bodyText"
                type="string"
                rootStyle={{ width: 500}}
                editorStyle={{height:500}}
                readOnly={true}
              />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={cerrarDialog}
              variant="contained"
              color="secondary"
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={marcarSugerencia}
              color="primary"
            >
              Marcar como revisado
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Paper>
  );
}

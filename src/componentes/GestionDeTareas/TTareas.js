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
import style from '../Tools/Style.js';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { obtenerTareaPorId } from '../../actions/TareasAction.js';
const columns = [
  { id: 'tipotarea.descritipotarea', label: 'Tipo de Tarea', minWidth: 100 },
  { id: 'cliente', label: 'Cliente', minWidth: 200 },
  { id: 'fechacreacion', label: 'Fec.Creacion', minWidth: 100 },
  { id: 'fechavto', label: 'Fec.Vto', minWidth: 100 },
  { id: 'usuarioasignado', label: 'Usuario Asignado', minWidth: 100 },
  { id: 'asignadopor', label: 'Asignado por', minWidth: 90 },
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

export default function TTareas(props) {
  const mounted = useRef(true);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = props.rows;
  const term = props.termc;
  const history = useHistory();
  const abrirPerfilTarea = (tarea) => {
    /* RRR: se verifica si la tabla fue llamada desde el modulo de cobranzas en donde las tareas vienen desde una vista
    por lo tanto hay que armar el state que se va a enviar de manera que el componente pueda mostrar los datos de las facturas 
    en el perfil de la tarea
    */
    if (props.factura) {
      obtenerTareaPorId(tarea.tareA_Id).then((response) => {
        if (response.status === 200) {
          tarea['TipoVisitante'] = props.id;
          tarea['facturas'] = response.data[0].facturas;
          history.push({ pathname: '/perfilTarea', state: tarea });
        }
      });
    } else {
      tarea['TipoVisitante'] = props.id;
      if (props.cobrador) {
        tarea['perfilCobrador'] = true;
      }
      history.push({ pathname: '/perfilTarea', state: tarea });
    }
  };
  useEffect(() => {
    return function cleanup() {
      mounted.current = false;
    };
  }, [rows]);

  function searchingTermc(term) {
    return function (x) {
      let nombre = '';
      let apellido = '';
      let descritipotarea = '';
      let fechacreacion = '';
      let fechavto = '';
      let codtarea = 0;
      if (props.factura) {
        if (x.cliente === null) {
          nombre = '';
        } else {
          nombre = x.cliente;
        }

        if (x.cliente === null) {
          apellido = '';
        } else {
          apellido = x.cliente;
        }

        if (x.descritipotarea === null) {
          descritipotarea = '';
        } else {
          descritipotarea = x.descritipotarea;
        }

        if (x.fechacreacion === null) {
          fechacreacion = '';
        } else {
          fechacreacion = x.fechacreacion;
        }

        if (x.fechavto === null) {
          fechavto = '';
        } else {
          fechavto = x.fechavto;
        }

        if (x.codtarea === null) {
          codtarea = 0;
        } else {
          codtarea = x.codtarea;
        }
      } else {
        if (x.cliente !== null) {
          if (x.cliente.nombre === null) {
            nombre = '';
          } else {
            nombre = x.cliente.nombre;
          }

          if (x.cliente.apellido === null) {
            apellido = '';
          } else {
            apellido = x.cliente.apellido;
          }
        } else {
          if (x.posiblecliente.nombre === null) {
            nombre = '';
          } else {
            nombre = x.posiblecliente.nombre;
          }

          if (x.posiblecliente.apellido === null) {
            apellido = '';
          } else {
            apellido = x.posiblecliente.apellido;
          }
        }
        if (x.tipotarea.descritipotarea === null) {
          descritipotarea = '';
        } else {
          descritipotarea = x.tipotarea.descritipotarea;
        }

        if (x.fechacreacion === null) {
          fechacreacion = '';
        } else {
          fechacreacion = x.fechacreacion;
        }

        if (x.fechavto === null) {
          fechavto = '';
        } else {
          fechavto = x.fechavto;
        }

        if (x.codtarea === null) {
          codtarea = 0;
        } else {
          codtarea = x.codtarea;
        }
      }
      return (
        nombre.toLowerCase().includes(term.toLowerCase()) ||
        apellido.toLowerCase().includes(term.toLowerCase()) ||
        descritipotarea.toLowerCase().includes(term.toLowerCase()) ||
        fechacreacion.toLowerCase().includes(term.toLowerCase()) ||
        fechavto.toLowerCase().includes(term.toLowerCase()) ||
        codtarea.toString().toLowerCase().includes(term.toLowerCase()) ||
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
              .map((tarea) => (
                <TableRow key={tarea.tareA_Id}>
                  {/*RRR: se verifica la forma en que se reciben los datos por que se puede dar que viene de
                  entity o de una vista*/}
                  <TableCell align="left">
                    {props.factura
                      ? tarea.tipotarea
                      : tarea.tipotarea.descritipotarea}
                  </TableCell>
                  <TableCell align="left">
                    {props.factura
                      ? tarea.cliente
                      : tarea.cliente !== null
                      ? tarea.cliente.nombre + ' ' + tarea.cliente.apellido
                      : tarea.posiblecliente.nombre +
                        ' ' +
                        tarea.posiblecliente.apellido}
                  </TableCell>
                  <TableCell align="left">
                    {tarea.fechacreacion.substr(-20, 10)}
                  </TableCell>
                  <TableCell align="left">
                    {tarea.fechavto.substr(-20, 10)}
                  </TableCell>
                  <TableCell align="left">{tarea.usuarioasignado}</TableCell>
                  <TableCell align="left">{tarea.asignadopor}</TableCell>
                  <TableCell align="left">
                    {tarea.motivocancelacion === null ? (
                      <Typography color="secondary">PENDIENTE</Typography>
                    ) : (
                      <Typography style={{ color: '#357a38' }}>
                        COMPLETADO
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      color="primary"
                      style={style.submit.submitTabla}
                      onClick={() => abrirPerfilTarea(tarea)}
                      label="Administrar"
                    >
                      Ver Perfil
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

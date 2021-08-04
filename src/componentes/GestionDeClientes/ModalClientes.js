import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import style from '../Tools/Style';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { CircularProgress, Typography, Grid } from '@material-ui/core';
import TClientes from './Clientes/TClientes';

function rand() {
  return Math.round(1 * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
}));

export default function ModalClientes({
  open,
  handleClose,
  data,
  seleccionarCliente,
  datosCargados,
}) {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);

  const [termc, setTermc] = useState('');

  const handleCloseModal = () => {
    handleClose();
    setTermc('');
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography
        id="simple-modal-title"
        component="h3"
        variant="h4"
        color="primary"
      >
        Buscar Clientes
      </Typography>

      <SearchIcon style={style.iconbuscar} />
      <TextField
        name="term"
        style={style.TextFieldbuscar}
        onChange={(e) => setTermc(e.target.value)}
        label="Buscar"
      />
      <div notranslate="true">
        {datosCargados ? (
          <TClientes
            rows={data}
            seleccionar={seleccionarCliente}
            termc={termc}
            setTermc={setTermc}
          />
        ) : (
          <Grid container justify="center">
            <CircularProgress />
            <br />
            <Typography>Cargando...</Typography>
          </Grid>
        )}
      </div>
    </div>
  );
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </React.Fragment>
  );
}

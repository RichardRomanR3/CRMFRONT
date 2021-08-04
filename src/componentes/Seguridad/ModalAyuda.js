import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Link,
} from '@material-ui/core';

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

function getSteps() {
  return [
    'Crear un Archivo Excel con los datos requeridos por el sistema',
    'Formatos de Tablas del sistema',
    'Importar Datos',
  ];
}
const PasoUno = (
  <Typography variant="h6">
    El sistema trabaja con tablas en la base de datos, cada tabla tiene alguno
    campos obligatorios, para poder importar los datos desde un documento Excel
    el documento debe tener un formato, si el documento Excel no tiene el
    formato definido por el sistema los datos no seran guardados...
  </Typography>
);
const PasoDos = (
  <Typography variant="h6">
    Si aun no conoces los formatos de las tablas del sistema en el siguiente
    link podras ver un manual que muestra detalladamente como crear un
    documento Excel con el formato necesario para cada tabla desde cero, dar
    click{' '}
    <Link href="https://www.FOLLOW-UP.com.py" color="primary">
      Aqui
    </Link>{' '}
    para ir a nuestra pagina web y vizualizar el contenido....
  </Typography>
);
const PasoTres = (
  <Typography variant="h6">
    {' '}
    Una vez que tengas el documento Excel con el formato correcto deberas elegir
    a que tabla del sistema quieres agregarle datos y luego subir tu documento
    Excel dandole click al boton Elegir archivo para luego poder importarlo dandole click al boton importar.
  </Typography>
);
function getStepContent(step) {
  switch (step) {
    case 0:
      return PasoUno;
    case 1:
      return PasoDos;
    case 2:
      return PasoTres;
    default:
      return 'Paso desconocido';
  }
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
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

export default function ModalAyuda({ open, handleClose }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const [modalStyle] = React.useState(getModalStyle);
  const handleCloseModal = () => {
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={classes.root}>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel component="div">{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography
                componetn="div"
                variant="h6"
                className={classes.instructions}
              >
                Si aun siguiendo los paso no se logran cargar los datos
                comuniquese con el proveedor del sistema o cree un reporte de
                Bugs en la seccion Reporte de Bugs del sistema
              </Typography>
              <Button
                variant="contained"
                onClick={handleReset}
                className={classes.button}
              >
                Reiniciar
              </Button>
            </div>
          ) : (
            <div>
              <Typography component="div" className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Atras
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Final' : 'Siguiente'}
                </Button>
              </div>
            </div>
          )}
        </div>
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

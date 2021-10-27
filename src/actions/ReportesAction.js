import HttpCliente from '../service/HttpCliente';

export const obtenerEventos = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/REPORTES/eventos/'+id).then((response) => {
      resolve(response);
    });
  });
};

export const obtenerDatosGraficoTareas = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/REPORTES/graficoTareas').then((response) => {
      resolve(response);
    });
  });
};

export const obtenerDatosGraficoCampanas = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/REPORTES/graficoCampanas').then((response) => {
      resolve(response);
    });
  });
};
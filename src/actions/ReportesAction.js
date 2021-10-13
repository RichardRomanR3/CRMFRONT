import HttpCliente from '../service/HttpCliente';

export const obtenerEventos = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/REPORTES/eventos/'+id).then((response) => {
      resolve(response);
    });
  });
};
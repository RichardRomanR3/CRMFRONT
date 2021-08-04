import HttpCliente from '../service/HttpCliente';

export const ModificarAlerta = (objetoNuevo, id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.put('/ALERTAS/' + id, objetoNuevo)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerAlertaActual = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/ALERTAS/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

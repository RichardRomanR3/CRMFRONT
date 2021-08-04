import HttpCliente from '../service/HttpCliente';

export const nuevaSugerencia = (objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/SUGERENCIAS', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerSugerencias = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/SUGERENCIAS/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const cambiarEstadoSugerencia = (sugerencia_id, objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.put('/SUGERENCIAS/' + sugerencia_id, objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const listarSugerencias = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/SUGERENCIAS')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

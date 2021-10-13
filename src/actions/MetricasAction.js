import HttpCliente from '../service/HttpCliente';
export const obtenerDatosCampana = (id) => {
    return new Promise((resolve, eject) => {
      HttpCliente.get('/METRICAS/campanaCAC/' + id)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  };
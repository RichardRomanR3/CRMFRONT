import HttpCliente from '../service/HttpCliente';
export const RegistrarAccion = (objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/AUDITORIA/registroAuditoria', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const ListarAuditoria = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/AUDITORIA')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

import HttpCliente from '../service/HttpCliente';

export const ObtenerListaPantallas = () => {
  return new Promise((resolve, reject) => {
    HttpCliente.get('/Pantallas/lista')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

//Este solo trae por el id del rol
export const ObtenerPantallasRol = (rolID) => {
  return new Promise((resolve, reject) => {
    HttpCliente.get('/Rol/roldetalle/' + rolID)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

//Este puede traer por el id del rol o por el username
export const ObtenerPantallasRol2 = (objetoRol) => {
  return new Promise((resolve, reject) => {
    HttpCliente.post('/Rol/roldetalle2', objetoRol)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const ObtenerCategoriasPantallas = () => {
  return new Promise((resolve, reject) => {
    HttpCliente.get('/Pantallas/categorias')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

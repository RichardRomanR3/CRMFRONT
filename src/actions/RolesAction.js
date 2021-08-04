import HttpCliente from '../service/HttpCliente';

export const ObtenerRolUsuario = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/Rol/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const ObtenerListaRoles = () => {
  return new Promise((resolve, reject) => {
    HttpCliente.get('/Rol/lista')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const agregarRol = (objetoRol) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/Rol/agregarRolUsuario', objetoRol)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const eliminarRolUsuario = (userName) => {
  return new Promise((resolve, eject) => {
    HttpCliente.delete('/Usuario/eliminarRol/' + userName)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const crearRol = (rolNuevo) => {
  return new Promise((resolve, reject) => {
    HttpCliente.post('Rol/crear', rolNuevo)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const modificarRol = (rol) => {
  return new Promise((resolve, reject) => {
    HttpCliente.put('Rol/modificar', rol)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const eliminarRol = (id) => {
  return new Promise((resolve, reject) => {
    HttpCliente.delete('Rol/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const DeletePantallasRol = (idRol, idPantalla) => {
  return new Promise((resolve, reject) => {
    HttpCliente.delete('Rol/' + idRol + '/' + idPantalla)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const AddPantallasRol = (objRolPantalla) => {
  return new Promise((resolve, reject) => {
    HttpCliente.post('Rol/asignarPermisosRoles', objRolPantalla)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

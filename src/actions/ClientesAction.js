import HttpCliente from '../service/HttpCliente';
export const obtenerPosiblesClientes = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/POSIBLESCLIENTES/listarposiblesclientes/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const insertarPosibleCliente = (objetoNuevo) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/POSIBLESCLIENTES', objetoNuevo)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const ModificarPosibleCliente = (objetoNuevo, id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.put('/POSIBLESCLIENTES/' + id, objetoNuevo)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerContactos = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/CONTACTOS/listarcontactos/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const insertarContacto = (objetoNuevo) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/CONTACTOS', objetoNuevo)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const ModificarContacto = (objetoNuevo, id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.put('/CONTACTOS/' + id, objetoNuevo)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerClientes = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/CLIENTES')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const registrarCliente = (cliente) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/CLIENTES', cliente)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerBarrios = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/CLIENTES/barrios/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerCiudades = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/CLIENTES/ciudades')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const deleteDireccion = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.delete('/CLIENTES/eliminardireccion/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerDireccionesCliente = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/CLIENTES/direcciones/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const actualizarCliente = (id, clienteactualizado) => {
  return new Promise((resolve, eject) => {
    HttpCliente.put('/CLIENTES/' + id, clienteactualizado)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerTelefonosCliente = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/CLIENTES/telefonos/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const ObtenerTareasRelacionadasAlCliente = (clienteId) => {
  return new Promise((resolve, reject) => {
    HttpCliente.get('/CLIENTES/tareascliente/' + clienteId)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const deleteTelefono = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.delete('/CLIENTES/eliminartelefono/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerClientePorCi = (ci) => {
  return new Promise((resolve, reject) => {
    HttpCliente.get('/CLIENTES/consultarporci/' + ci)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerRedesCliente = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/CLIENTES/redes/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const deleteRed = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.delete('/CLIENTES/eliminarred/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const eliminarDePosiblesClientes = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.delete('/POSIBLESCLIENTES/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

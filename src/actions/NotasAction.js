import HttpCliente from '../service/HttpCliente';
export const enviarMensaje = (NOTA) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/REALTIME/difusion', NOTA)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const enviarMensajeUsu = (NOTA) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/REALTIME/aUsuario', NOTA)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const leerNota = (objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/NOTAS/marcarComoLeido', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerDifusionesDelDia = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/NOTAS/NOTASDELDIA')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerNotasDelDiaUsuario = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/NOTAS/NOTASDELDIAUSUARIO/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerLeidoPor = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/NOTAS/leidopor/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerDifusionesPorFecha = (fecha) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/NOTAS/difusionesPorFecha/' + fecha)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerNotasPorFecha = (fecha, usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/NOTAS/NotasPorFecha/' + fecha + '/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerNotasPorFechaEnv = (fecha, usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/NOTAS/NotasPorFechaEnv/' + fecha + '/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerNotasDelDiaUsuarioEnv = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/NOTAS/NOTASDELDIAUSUARIOENV/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

//SE USA:
export const obtenerNotasNoLeidas = (objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('NOTAS/cuentaNotasNoLeidas', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const contarDifusionesDelDia = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('NOTAS/cuentaDifusionesDelDia')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

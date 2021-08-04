import HttpCliente from '../service/HttpCliente';
//SECCION USADOS NUEVO
export const registrarFactura = (objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/COBRANZAS/nuevaFactura', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerFacturasUsuario = (user) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/COBRANZAS/todasFacturasUsuario/' + user)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerFacturasClienteUsuario = (user, cliente) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get(
      '/COBRANZAS/todasFacturasClienteUsuario/' + user + '/' + cliente
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerFacturasClienteUsuarioVencidas = (user, cliente) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get(
      '/COBRANZAS/todasFacturasClienteUsuarioVencidas/' + user + '/' + cliente
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerFacturasClienteUsuarioAVencer = (user, cliente) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/COBRANZAS/clienteUsuarioVencer/' + user + '/' + cliente)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerFacturasResumen = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/COBRANZAS/facturasResumen')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerFacturasGeneralPorCod = (cod) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/COBRANZAS/facturasGeneralPorCod/' + cod)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerFacturasCliente = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/COBRANZAS/facturasCliente/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerTareasFactura = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/COBRANZAS/historialTareaFactura/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const registrarPosibleCobro = (objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/COBRANZAS/nuevoPosibleCobro', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerPosiblesCobrosNotificacion = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('COBRANZAS/cuentaPosiblesCobros')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerPosiblesCobrosSinAsignar = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('COBRANZAS/listarPosiblesCobrosSinAsignar')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerPosiblesCobrosAsignados = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('COBRANZAS/listarPosiblesCobrosAsignados')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerPosiblesCobros = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('COBRANZAS/listarPosiblesCobros')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerFacturasConPosibleCobro = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('COBRANZAS/listarFacturasConPosiblesCobros/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerCobranzasNotificacion = (objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('COBRANZAS/cuentaCobranzasAsignadas', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerCobranzasAsignadas = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/COBRANZAS/lsitaCobranzasAsignadas/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const cambiarDeEstadoPosibleCobro = (id, objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.put('/COBRANZAS/modificarPosibleCobro/' + id, objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const realizarPago = (id, objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.put('/COBRANZAS/pagoFacturas/' + id, objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const modificarFactura = (id, objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.put('/COBRANZAS/cambiarEstadoFactura/' + id, objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerFacturasBajaNotificacion = (objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('COBRANZAS/cuentaFacturasPendientesBaja', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerFacturasPendientesDeBaja = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/COBRANZAS/listarFacturasPendientesDeBaja/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

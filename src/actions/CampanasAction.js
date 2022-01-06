import HttpCliente from '../service/HttpCliente';

export const obtenerTiposCampanas = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/TIPOSCAMPANAS')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const registrarTipoCampana = (tipoCampana) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('TIPOSCAMPANAS', tipoCampana)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const editarTipoCampana = (id, tipoCampanaMod) => {
  return new Promise((resolve, eject) => {
    HttpCliente.patch('/TIPOSCAMPANAS/' + id, tipoCampanaMod)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const registrarCampana = (campana) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/CAMPANAS', campana)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const editarCampana = (id, campanaMod) => {
  return new Promise((resolve, eject) => {
    HttpCliente.patch('/CAMPANAS/' + id, campanaMod)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const eliminarTc = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.delete('/TIPOSCAMPANAS/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerClientesPorCampana = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/CAMPANAS/ClientesPorCampana/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerClientesPorCampanaFecha = (objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/CAMPANAS/ClientesPorCampanaFecha', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerCampanasPorId = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/CAMPANAS/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerAlcanceDeCampana = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/CAMPANAS/Alcance/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerAlcanceDeCampanaPorFecha = (objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/CAMPANAS/AlcancePorFecha', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const promediarUtilidad = (idCampana, codcliente) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/CAMPANAS/Promediar/' + idCampana + '/' + codcliente)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerRecurrencia = (idCampana, codcliente) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/CAMPANAS/SumarProductos/' + idCampana + '/' + codcliente)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerTiempoDeVida = (idCampana, codcliente) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get(
      '/CAMPANAS/TiempoDeVidaMedio/' + idCampana + '/' + codcliente
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const promediarUtilidadPorFecha = (objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/CAMPANAS/PromediarPorFecha', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerRecurrenciaPorFecha = (objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/CAMPANAS/SumarProductosPorFecha', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerTiempoDeVidaPorFecha = (objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/CAMPANAS/TiempoDeVidaMedioPorFecha', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

//SE USA:
export const obtenerCampanas = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/CAMPANAS')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

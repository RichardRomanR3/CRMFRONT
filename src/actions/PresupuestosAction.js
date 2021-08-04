import HttpCliente from '../service/HttpCliente';
export const obtenerPresupuestos = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/PRESUPUESTOS')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerPresupuestoPorId = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/PRESUPUESTOS/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
//RR: 12-08-2020 OBTIENE LOS PRESUPUESTOS ASIGNADOS AL USUARIO LOGGEADO
export const obtenerPresupuestosAsignados = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/PRESUPUESTOS/presupuestosasignados/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const cambiarEstadoPresupuesto = (id, objetoMod) => {
  return new Promise((resolve, eject) => {
    HttpCliente.put('/PRESUPUESTOS/' + id, objetoMod)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const cerrarTareasPres = (id, objetoModC) => {
  return new Promise((resolve, eject) => {
    HttpCliente.put('/TAREAS/cerrarTareasPres/' + id, objetoModC)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerCerradosPerdidos = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/PRESUPUESTOS/presupuestosasignadosCp/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerCerradosGanados = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/PRESUPUESTOS/presupuestosasignadosCg/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerAnulados = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/PRESUPUESTOS/presupuestosasignadosA/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerEliminados = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/PRESUPUESTOS/presupuestosasignadosE/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerCerradosPerdidosG = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/PRESUPUESTOS/presupuestosGeneralesCp')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerCerradosGanadosG = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/PRESUPUESTOS/presupuestosGeneralesCg')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerAnuladosG = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/PRESUPUESTOS/presupuestosGeneralesA')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerEliminadosG = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/PRESUPUESTOS/presupuestosGeneralesE')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerPresupuestosTotal = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/PRESUPUESTOS/sumapresupuestos')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerPresupuestosTotalV = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/PRESUPUESTOS/sumapresupuestosv/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerTopPresupuestos = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/PRESUPUESTOS/toppresupuestos')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerTopPresupuestosV = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/PRESUPUESTOS/toppresupuestosv/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerPresupuestosCGMes = (desde, hasta) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get(
      '/PRESUPUESTOS/sumapresupuestoscgmes/' + desde + '/' + hasta
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerPresupuestosCGMesV = (desde, hasta, usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get(
      '/PRESUPUESTOS/sumapresupuestoscgmesv/' +
        desde +
        '/' +
        hasta +
        '/' +
        usuario
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerPresupuestosCPMes = (desde, hasta) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get(
      '/PRESUPUESTOS/sumapresupuestoscPmes/' + desde + '/' + hasta
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerPresupuestosCPMesV = (desde, hasta, usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get(
      '/PRESUPUESTOS/sumapresupuestoscPmesv/' +
        desde +
        '/' +
        hasta +
        '/' +
        usuario
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerPresupuestosGrafico = (mes) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/PRESUPUESTOS/listapresuvend/' + mes)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const registrarPresupuesto = (objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/PRESUPUESTOS', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

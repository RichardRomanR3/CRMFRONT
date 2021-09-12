import HttpCliente from '../service/HttpCliente';

export const obtenerTiposTareas = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/TIPOSTAREAS').then((response) => {
      resolve(response);
    });
  });
};



export const registrarTipoTarea = (tipoTarea) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/TIPOSTAREAS', tipoTarea).then((response) => {
      resolve(response);
    });
  });
};
export const editarTipoTarea = (id, tipoTarea) => {
  return new Promise((resolve, eject) => {
    HttpCliente.put('/TIPOSTAREAS/' + id, tipoTarea)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const registrarTarea = (tarea) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/TAREAS', tarea)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerTareas = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/TAREAS/lista/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

//RR:12-08-2020 OBTIENE TODAS LAS TAREAS LIGADAS A UN PRESUPUESTO
export const obtenerTareasPresupuesto = (usuario, id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/TAREAS/tareaspresupuesto/' + usuario + '/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerTareasPresupuestoG = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/TAREAS/tareaspresupuestoG/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const editarTarea = (id, tarea) => {
  return new Promise((resolve, eject) => {
    HttpCliente.put('/TAREAS/' + id, tarea).then((response) => {
      resolve(response);
    });
  });
};
export const obtenerTareasDelDia = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/TAREAS/tareasdeldia/'+usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const eliminarTp = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.delete('/TIPOSTAREAS/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerTelefonosTareas = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/TAREAS/telefonos/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerDireccionesTareas = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/TAREAS/direcciones/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerTareasGenerales = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/TAREAS')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerTareasGeneralesAsignadas = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/TAREAS/tareasAsignadasPor/' + usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const obtenerTareaPorId = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/TAREAS/' + id)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

// SE USA:
//RR:12-08-2020 OBTIENE EL NUMERO DE TAREAS VENCIDAS Y A VENCER EN EL DIA
export const obtenerTareasNotificacion = (objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('TAREAS/cuenta', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerComentariosDeTarea = (tareaId) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('TAREAS/COMENTARIOSDETAREA/'+tareaId).then((response) => {
      resolve(response);
    });
  });
};

export const nuevoComentarioDeTarea = (objeto) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('TAREAS/NUEVOCOMENTARIODETAREA', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
import HttpCliente from '../service/HttpCliente';

export const obtenerTiposActividades = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/TIPODEACTIVIDAD')
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const registrarTipoActividad = (tipoActividad) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/TIPODEACTIVIDAD', tipoActividad)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const editarTipoActividad = (id, tipoActividadMod) => {
  return new Promise((resolve, eject) => {
    HttpCliente.put('/TIPODEACTIVIDAD/' + id, tipoActividadMod)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const eliminarTipoActividad = (id) => {
    return new Promise((resolve, eject) => {
      HttpCliente.delete('/TIPODEACTIVIDAD/' + id)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  };

  
  
export const obtenerMotivoActividades = () => {
    return new Promise((resolve, eject) => {
      HttpCliente.get('/MOTIVOSDEACTIVIDAD')
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  };
  export const registrarMotivoActividad = (motivoActividad) => {
    return new Promise((resolve, eject) => {
      HttpCliente.post('/MOTIVOSDEACTIVIDAD', motivoActividad)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  };
  export const editarMotivoActividad = (id, motivoActividadMod) => {
    return new Promise((resolve, eject) => {
      HttpCliente.put('/MOTIVOSDEACTIVIDAD/' + id, motivoActividadMod)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  };
  export const eliminarMotivoActividad = (id) => {
      return new Promise((resolve, eject) => {
        HttpCliente.delete('/MOTIVOSDEACTIVIDAD/' + id)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            resolve(error.response);
          });
      });
    };

  export const obtenerActividades = (idusuario) => {
    return new Promise((resolve, eject) => {
      HttpCliente.get('/ACTIVIDADES/lista/'+idusuario)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  };
export const registrarActividad = (actividad) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post('/ACTIVIDADES', actividad)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const editarActividad = (id, actividadMod) => {
  return new Promise((resolve, eject) => {
    HttpCliente.put('/ACTIVIDADES/' + id, actividadMod)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};












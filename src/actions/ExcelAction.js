import HttpCliente from '../service/HttpCliente';
export const ImpExcelACLIENTES = (objeto) => {
  var data = new FormData();
  data.append('file', objeto.file);
  data.append('fileName', objeto.fileName);
  return new Promise((resolve, eject) => {
    HttpCliente.post('/Excel/CLIENTES', data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const ImpExcelAPOSIBLESCLIENTES = (objeto) => {
  var data = new FormData();
  data.append('file', objeto.file);
  data.append('UserName', objeto.UserName);
  data.append('fileName', objeto.fileName);
  return new Promise((resolve, eject) => {
    HttpCliente.post('/Excel/POSIBLESCLIENTES', data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const ImpExcelAFACTURAS = (objeto) => {
  var data = new FormData();
  data.append('file', objeto.file);
  data.append('UserName', objeto.UserName);
  data.append('fileName', objeto.fileName);
  return new Promise((resolve, eject) => {
    HttpCliente.post('/Excel/FACTURAS', data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const ImpExcelAPRESUPUESTOS = (objeto) => {
  var data = new FormData();
  data.append('file', objeto.file);
  data.append('UserName', objeto.UserName);
  data.append('fileName', objeto.fileName);
  return new Promise((resolve, eject) => {
    HttpCliente.post('/Excel/PRESUPUESTOS', data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const ImpExcelAVENTAS = (objeto) => {
  var data = new FormData();
  data.append('file', objeto.file);
  data.append('fileName', objeto.fileName);
  return new Promise((resolve, eject) => {
    HttpCliente.post('/Excel/VENTAS', data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};


export const ObtenerArchivosFechaClientes= (fecha) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/Excel/ArchivosClientes/'+fecha)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const ObtenerArchivosFechaPosiblesClientes= (fecha) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/Excel/ArchivosPosiblesClientes/'+fecha)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const ObtenerArchivosFechaFacturas= (fecha) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/Excel/ArchivosFacturas/'+fecha)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const ObtenerArchivosFechaPresupuestos= (fecha) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/Excel/ArchivosPresupuestos/'+fecha)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const ObtenerArchivosFechaVentas= (fecha) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/Excel/ArchivosVentas/'+fecha)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const verificarExistenciaExcelClientes= (nombre) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/Excel/ExistenciaClientes/'+nombre)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const verificarExistenciaExcelFacturas= (nombre) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/Excel/ExistenciaFacturas/'+nombre)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const verificarExistenciaExcelPosiblesClientes= (nombre) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/Excel/ExistenciaPosiblesCliente/'+nombre)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const verificarExistenciaExcelPresupuestos= (nombre) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/Excel/ExistenciaPresupuestos/'+nombre)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const verificarExistenciaExcelVentas= (nombre) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/Excel/ExistenciaVentas/'+nombre)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const deleteExcelCLIENTES= (nombreArchivo,fecgra) => {
  return new Promise((resolve, eject) => {
    HttpCliente.delete('/Excel/RevertirExcelCLIENTES/'+nombreArchivo+'/'+fecgra)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const deleteExcelPOSIBLESCLIENTES= (nombreArchivo,fecgra) => {
  return new Promise((resolve, eject) => {
    HttpCliente.delete('/Excel/RevertirExcelPOSIBLESCLIENTES/'+nombreArchivo+'/'+fecgra)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const deleteExcelFACTURAS= (nombreArchivo,fecgra) => {
  return new Promise((resolve, eject) => {
    HttpCliente.delete('/Excel/RevertirExcelFACTURAS/'+nombreArchivo+'/'+fecgra)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const deleteExcelPRESUPUESTOS= (nombreArchivo,fecgra) => {
  return new Promise((resolve, eject) => {
    HttpCliente.delete('/Excel/RevertirExcelPRESUPUESTOS/'+nombreArchivo+'/'+fecgra)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const deleteExcelVENTAS= (nombreArchivo,fecgra) => {
  return new Promise((resolve, eject) => {
    HttpCliente.delete('/Excel/RevertirExcelVENTAS/'+nombreArchivo+'/'+fecgra)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};



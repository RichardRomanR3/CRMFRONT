import HttpCliente from '../service/HttpCliente';
import axios from 'axios';
const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const obtenerListaUsuarios = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/Usuario/lista').then((response) => {
      resolve(response);
    });
  });
};

export const obtenerDatosUsuario = (UserName) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/Usuario/usuarioPorName/' + UserName)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

//SE USA:
export const obtenerUsuarioActual = (dispatch) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/Usuario')
      .then((response) => {
        if (response.data && response.data.imagenPerfil) {
          let fotoPerfil = response.data.imagenPerfil;
          const nuevoFile =
            'data:image/' + fotoPerfil.extension + ';base64,' + fotoPerfil.data;
          response.data.imagenPerfil = nuevoFile;
        }
        dispatch({
          type: 'INICIAR_SESION',
          sesion: response.data,
          autenticado: true,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const loginUsuario = (usuario, dispatch) => {
  return new Promise((resolve, eject) => {
    instancia
      .post('/Usuario/login', usuario)
      .then((response) => {
        if (response.data && response.data.imagenPerfil) {
          let fotoPerfil = response.data.imagenPerfil;
          const nuevoFile =
            'data:image/' + fotoPerfil.extension + ';base64,' + fotoPerfil.data;
          response.data.imagenPerfil = nuevoFile;
        }

        dispatch({
          type: 'INICIAR_SESION',
          sesion: response.data,
          autenticado: true,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const actualizarUsuario = (usuario, dispatch) => {
  return new Promise((resolve, eject) => {
    HttpCliente.put('/Usuario/', usuario)
      .then((response) => {
        if (response.data && response.data.imagenPerfil) {
          let fotoPerfil = response.data.imagenPerfil;
          const nuevoFile =
            'data:image/' + fotoPerfil.extension + ';base64,' + fotoPerfil.data;
          response.data.imagenPerfil = nuevoFile;
        }
        dispatch({
          type: 'INICIAR_SESION',
          sesion: response.data,
          autenticado: true,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const registrarUsuario = (usuario) => {
  return new Promise((resolve, eject) => {
    instancia
      .post('/Usuario/registrar', usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerUsuarioConImagen = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/Usuario/imagenesUsuarios/' + usuario)
      .then((response) => {
        if (response.data && response.data.imagenPerfil) {
          let fotoPerfil = response.data.imagenPerfil;
          const nuevoFile =
            'data:image/' + fotoPerfil.extension + ';base64,' + fotoPerfil.data;
          response.data.imagenPerfil = nuevoFile;
        }
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const enviarMail = (objeto) => {
  return new Promise((resolve, eject) => {
    instancia
      .post('/Email', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const CambiarClave = (objeto) => {
  return new Promise((resolve, eject) => {
    instancia
      .put('/Usuario/cambioClave', objeto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

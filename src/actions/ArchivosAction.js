import HttpCliente from '../service/HttpCliente';
export const enviarArchivo = (file, fileName) => {
  const formData = new FormData();
  formData.append('formFile', file);
  formData.append('fileName', fileName);
  return new Promise((resolve, eject) => {
    HttpCliente.post('/Archivos', formData)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const downloadFile = (archivo) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get('/Archivos/' + archivo)
      .then((response) => {
        const url = response.request.responseURL;
        const link = document.createElement('a');
        link.href = url;
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

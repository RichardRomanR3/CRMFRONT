export const clavefuerte = (contrasenna) => {
  var mayuscula = false;
  var minuscula = false;
  var numero = false;
  var caracter_raro = false;

  for (var i = 0; i < contrasenna.length; i++) {
    if (contrasenna.charCodeAt(i) >= 65 && contrasenna.charCodeAt(i) <= 90) {
      mayuscula = true;
    } else if (
      contrasenna.charCodeAt(i) >= 97 &&
      contrasenna.charCodeAt(i) <= 122
    ) {
      minuscula = true;
    } else if (
      contrasenna.charCodeAt(i) >= 48 &&
      contrasenna.charCodeAt(i) <= 57
    ) {
      numero = true;
    } else {
      caracter_raro = true;
    }
  }
  if (
    mayuscula === true &&
    minuscula === true &&
    caracter_raro === true &&
    numero === true
  ) {
    return true;
  }

  return false;
};

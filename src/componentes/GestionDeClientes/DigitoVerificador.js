export default function DigitoVerificador(p_ruc, p_basemax) {

    p_basemax = typeof p_basemax !== 'undefined' ? p_basemax : 11;

    let p_rucStr = p_ruc.toString(); // convertimos el parametro a una cadena
    let v_caracter = "";
    let v_numero_al = "";

    let k = 2; // factor de chequeo, empieza en 2 (dos)
    let v_total = 0; // acumulador
    let v_numero_aux;
    let v_resto;
    let v_digito;

    /* cambia la ultima letra por ascii en caso de que la cedula termine en letra */
    for (let i = 0; i < p_rucStr.length; i++) {
        v_caracter = p_rucStr.toUpperCase().substring(i, i + 1);
        let v_caracterAscii = v_caracter.charCodeAt(0);
        if (v_caracterAscii >= 48 && v_caracterAscii <= 57) { // de 0 a 9
            v_numero_al += v_caracter;
        } else {
            v_numero_al += v_caracterAscii;
        }
    }
    for (let i = v_numero_al.length; i > 0; i--) {
        if (k > p_basemax) {
            k = 2;
        }
        let digito = v_numero_al.substring(i - 1, i);
        v_numero_aux = parseInt(digito);
        v_total += v_numero_aux * k;

        k++;
    }

    v_resto = v_total % 11; // % modulus operator
    if (v_resto > 1) {
        v_digito = 11 - v_resto;
    } else {
        v_digito = 0;
    }
    return v_digito;
}
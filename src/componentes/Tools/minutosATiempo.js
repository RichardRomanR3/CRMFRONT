export default function minutosATiempo (minutos){
    const leyenda = (numero, palabra, plural) => numero === 0 || numero > 1 ? `${numero} ${palabra}${plural || "s"}` : `${numero} ${palabra}`;
    const MINUTOS_POR_HORA = 60,
        HORAS_POR_DIA = 24
    if (minutos < MINUTOS_POR_HORA) return leyenda(minutos, "minuto");
    let horas = Math.floor(minutos / MINUTOS_POR_HORA)
    if (horas < HORAS_POR_DIA) return leyenda(horas, "hora");
};
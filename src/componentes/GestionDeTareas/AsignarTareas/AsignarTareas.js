import React, { useEffect, useRef, useState } from 'react';
import { obtenerListaUsuarios } from '../../../actions/UsuariosAction';
import NuevaTarea from '../NuevaTarea';
export default function AsignarTareas(props) {
  const [DataUsuarios, setDataUsuarios] = useState([]);
  const mounted = useRef(true);
  const id = 'asignarTarea';
  useEffect(() => {
    if (mounted.current) {
      obtenerListaUsuarios().then((response) => {
        if (response.status === 200) {
          setDataUsuarios(response.data);
        } else {
          console.log('NO TRAO USUARIOS');
        }
      });
    }
    return function cleanup() {
      mounted.current = false;
    };
  }, []);
  return <NuevaTarea location={id} DataUsu={DataUsuarios} />;
}

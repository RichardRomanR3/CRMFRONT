import React, { useEffect,useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { obtenerDatosGraficoTareas } from '../../actions/ReportesAction';

export default function GraficoTareas(){
const [data,setData]=useState([]);
useEffect(()=>{
    obtenerDatosGraficoTareas().then((response)=>{
        if(response.status === 200){
            setData(response.data);
        }
    })
},[])
    return(
        
        <BarChart
         maxBarSize={50}
          width={1200}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="usuario" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar name="Tareas pendientes en el mes" dataKey="tareas_pendientes_global" fill="#FF0000" />
          <Bar name="Tareas cerradas en el mes" dataKey="tareas_cerradas_global" fill="#3B00FF" />
          <Bar name="Tareas pendientes del día" dataKey="tareas_pendientes_dia" fill="#FFE000" />
          <Bar name="Tareas cerradas en el dia" dataKey="tareas_cerradas_dia" fill="#00FF18" />
        </BarChart>
      
    )
}
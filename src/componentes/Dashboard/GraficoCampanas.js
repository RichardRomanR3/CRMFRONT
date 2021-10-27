import React,{useState,useEffect}from 'react';
import Chart from 'react-google-charts';
import { obtenerDatosGraficoCampanas } from '../../actions/ReportesAction';
export default function GraficoCampanas(){
  const [data,setData]=useState([['Campaña','Clientes']]);
  useEffect(()=>{
    obtenerDatosGraficoCampanas().then((response)=>{
      if(response.status === 200){
response.data.map(dato=>{
  setData((anterior)=>[...anterior,[dato.campana,dato.clientes]]);
  return null
})
      }
    });
  },[])
    return(
        <Chart
  width={'800px'}
  height={'800px'}

  chartType="PieChart"
  loader={<div>Cargando Grafico...</div>}
  data={data}
  options={{
    title: 'Cantidad de clientes adquiridos por campaña en lo que va del mes',
  }}
  rootProps={{ 'data-testid': '1' }}
/>
    );
}
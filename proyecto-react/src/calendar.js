import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Elementos from "./elementos";
import {useHistory}  from 'react-router-dom';

function Calendar(props) {
  let history = useHistory();
  //creo una variable de estado para fecha inicio y fecha final formateando new date ()  la fecha
  let [startDate, setstartDate] = useState(new Date());
  let [lastDate, setlasDate] = useState(new Date());
  // variable de estado que contiene la informacion de esa ruta los datos de la leche
  let [resultado, setResultado] = useState([]);
  //variable de estado que me permite ejecutar el resultado mostrando la informacion de los datos o
  //el estado incial solo mostrando el calendario === False
  let [mostrarResultado, setMostrarResultado] = useState(false);
  //estado que nos envian de app de el estado de logeo o no
  const [isLoggedIn] = useState(props.isLoggedIn);
  //funciones que nos permite cambiar el estado de la variable stardate y lastdate cogiendo el rango elegido en el imput
  function handleChangestarDate(date) {
    setstartDate(date);
  }
  function handleChangelastDate(date) {
    setlasDate(date);
  }
  //funcion que contiene la llamada a la ruta en express mediante el metodo de query
  function onFormSubmit(event) {
    event.preventDefault();
    console.log(startDate, lastDate);

    fetch(`/api/DatosAotechRango?startDate=${startDate}&lastDate=${lastDate}`)
      .then(function (result) {
        console.log(result);
        return result.json();
      })
      .then(function (info) {
        setResultado(info.resultado);
        setMostrarResultado(true);
        console.log(info.resultado);
      })
      .catch(function (err) {
        console.log(err);
      });
    console.log(resultado);
    setMostrarResultado(false);
  }
  //primera condicional que nos permite ver el calendario si estamos logeado
  //condicional que permite ver calendario + elemento o solo calendario
  if (isLoggedIn){
    if (mostrarResultado) {
      return (
        <>
        <div className="calendario" >  
          <form onSubmit={onFormSubmit}>
            <div className="form-group">
              {/* Datepicker es la eqtiqueta que dibuja el calendario */}
              <DatePicker
                selected={startDate}
                onChange={handleChangestarDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <DatePicker
                selected={lastDate}
                onChange={handleChangelastDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <button className="btn btn-primary">Show Date</button>
            </div>
          </form>
          {/* elementos es el componente    que nos permite coger los valores de resultado pasamos la informacion de padre Datos a hijo elemento por props  */}
          <Elementos resultado={resultado} />
          </div>
        </>
      );
    } else {
      return (
        <>
        <div className="calendario">  
          <form onSubmit={onFormSubmit}>
            <div className="form-group">
              <DatePicker
                selected={startDate}
                onChange={handleChangestarDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <DatePicker
                selected={lastDate}
                onChange={handleChangelastDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <button className="btn btn-primary">Show Date</button>
            </div>
          </form>
          </div>
        </>
      );
    }
  } else {
    history.push('/403')
    
    return null;
  }
}

export default Calendar;

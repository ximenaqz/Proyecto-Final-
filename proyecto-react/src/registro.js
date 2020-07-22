import React, { useState } from "react";
import './App.css';
import { useHistory } from "react-router-dom";


function Registro() {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [mensaje, setMensaje] = useState("");
    let history = useHistory();


    //Función Nombre - Componente Registro
    function reqName(event) {
        setName(event.target.value);
    }
    //Función e-mail - Componente Registro
    function reqEmail(event) {
        setEmail(event.target.value);
    }

    //Función password - componente Registro
    function reqPassword(event) {
        setPassword(event.target.value);
    }


    //Function del botón del input
    function reqUser() {
        let dataUser = {
            name: name,
            email: email,
            password: password
        }
    console.log(dataUser);

        //Hacemos un fecth al método post (express)
        //PROXY simula que estamos mandando la informacion de un sitio diferente al q realmente estamos enviando
        fetch('/api/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataUser)
            })
            //Obtenemos los datos de express en Json y nos manda un mensaje de Express: necesitas loguearte, logueado || no logueado
            .then(function (response) {
                return response.json();
            })
            .then(function (datos) {
                setMensaje(datos.mensaje);
                console.log(mensaje);
                history.push("/api/Login");
                window.alert('Usted se ha registrado correctamente.')
            });


    }
    return (
        <>
       <div>

            <p className="bienvenido-titulo">Bienvenido a AOTECH. Regístrese con sus datos y una contraseña.</p>
           
            {/* <input
                    type="nombre"
                    name="nombre"
                    placeholder="Nombre de Usuario"
                    value = {name}
                    onChange={reqName}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email de Usuario"
                    value = {email}
                    onChange={reqEmail}

                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña de usuario"
                    value = {password}
                    onChange={reqPassword}
                />

                <button onClick={reqUser}>Register</button>
                 */}

            {/*Form NO NO es recomendable para React.
            Privent default previene el comportamiento por defecto de ese evento*/}



<div className="caja-login">
          <div className="wrapper fadeInDown">
            <div id="formContent"> 
             {/* //col-md-4 row align-center flex-column */}
             <input
                 type="texta"
                placeholder="Nombre"
                value={name}
                onChange={reqName}
                className="fadeIn second"
               
              />
              <input
                 type="email"
                 placeholder="Email"
                 value={email}
                 onChange={reqEmail}
                className="fadeIn second"
               
              />
              <input
                 type="password"
                placeholder="Password"
                value={password}
                onChange={reqPassword}
                className="fadeIn third"
               
              />
               <button className="fadeIn fourth btn btn-primary" onClick={reqUser}>Login</button>  

             
              <p> {mensaje}</p>
            </div>
          </div>
        </div>

            
     </div>
     </>
     
    )
}


export default Registro;

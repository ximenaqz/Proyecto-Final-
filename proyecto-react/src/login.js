import React, { useState } from "react";
import "./App.css";
import { useHistory, Link } from "react-router-dom";

//Function Login (function e-mail y function password)
function Login(props) {
  let history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [mensaje, setMensaje] = useState("");

  //Función e-mail
  function handleEmail(event) {
    //Evento cambia del estado de una variable con la info q se está metiendo en el input
    setEmail(event.target.value);
  }

  //Función password
  function handlePassword(event) {
    setPassword(event.target.value);
  }

  //Function del botón del onclick
  function handleSubmit() {
    let user = {
      email: email,
      password: password,
    };
    console.log(user);

    //Hacemos un fecth al método post (express)
    //PROXY simula que estamos mandando la informacion de un sitio diferente al q realmente estamos enviando
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      //Obtenemos los datos de express en Json y nos manda un mensaje de Express: necesitas loguearte, logueado || no logueado
      .then(function (response) {
        return response.json();
      })
      .then(function (datos) {
        if (datos.mensaje === "Logueado correctamente");
        setMensaje(datos.mensaje);
        props.handleLogin();
        history.push("/api/Calendar");
        console.log(mensaje);
      });
  }
  if (props.isLoggedIn === false) {
    // <p className="bienvenido-logueate">Bienvenido a <strong>Aotech</strong>, por favor, loguéese!</p>
    // <div className="caja-login">

    // <input
    //     type="email"
    //     placeholder="Email"
    //     value={email}
    //     onChange={handleEmail}
    // />
    //     <input
    //         type="password"
    //         placeholder="Password"
    //         value={password}
    //         onChange={handlePassword}
    //     />

    //     <button onClick={handleSubmit}>Login</button>

    //     {/*Form NO NO es recomendable para React.
    // Privent default previene el comportamiento por defecto de ese evento*/}
    //    
    // </div>
    return (
      <>
      <div className="bienvenido-logeate">  
      <p className="bienvenido-titulo">Bienvenido al <strong > área de usuarios de Aotech.</strong></p>
      <p  className="bienvenido-titulo">Por favor introduzca su usuario y contraseña o regístrese.</p>
       <div ></div>
          <img src="/logoaotech.JPG" alt="Aotech" className="logo-fit-login img-fluid" />
        </div>
        <div className="caja-login">
          <div className="wrapper fadeInDown">
            <div id="formContent"> 
             {/* //col-md-4 row align-center flex-column */}
              <input
                 type="email"
                 placeholder="Email"
                 value={email}
                 onChange={handleEmail}
                className="fadeIn second"
               
              />
              <input
                 type="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
                className="fadeIn third"
               
              />
               <button className="fadeIn fourth btn btn-primary" onClick={handleSubmit}>Login</button>  

              <div id="formFooter">
                <Link className="underlineHover" href="#">
                  Forgot Password?
                </Link> 
                
              </div>
              <p> {mensaje}</p>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    
      history.push("/api/Calendar");
    
    return null;}
  
}

export default Login;

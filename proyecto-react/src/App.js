import { BrowserRouter, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Login from "./login";
import Registro from "./registro";
import Header from "./header";
import Footer from "./footer";
import Calendar from "./calendar";
import React, { useState } from "react";
import Home from "./home";
import Error from './403'

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  // Cuándo estás logueado, que no te aparezca el login ni el Register para registrarte de nuevo
  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    
  }
  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      <Route exact path="/api/Login">
        <Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} />
      </Route>

      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/api/register">
        <Registro />
      </Route>

      <Route exact path="/api/Calendar">
        <Calendar isLoggedIn={isLoggedIn} />
      </Route>
      <Route exact path="/403">
        <Error />
        </Route> 

      <Footer />
    </BrowserRouter>
  );
}

export default App;

//Hacer formulario, q cuándo escribamos usuario y contraseña, aparezca el usuario

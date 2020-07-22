import React from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
function Header(props) {
  let history = useHistory();
  function logout() {
    fetch("/logout")
      .then(function (result) {
        return result.json();
      })
      .then(function (datos) {
        console.log(datos);
        if (datos.mensaje === "Sesión finalizada") {
          props.handleLogout();
          history.push("/");
        }
      });
  }

  //llega por props ese valor de estado de App que nos cambia el booleano
  //declaro la variable afuera y hago una condicional, si estoy registrada, no me puede aparecer ni en el Link de Login ni de Registro

  /* TERNARIO ? TRUE : FALSE. En la linea 39, si NO estamos registrado (isLoggedIn) que aparezca LOGIN y REGISTER, y si estamos registrado, que aparezca: DATOS y LOGOUT*/
  //   {
  //     <div className="caja-header">
  //     <div className="caja-tittle">
  //       <img src="/logoaotech.JPG" alt="Aotech" />
  //     </div>

  //     <div className="caja-menu">
  //       <p className="caja-menu-home">
  //         <Link to="/"> HOME</Link>
  //       </p>

  //       {!props.isLoggedIn ? (
  //         <>
  //           <p className="caja-menu-login">
  //             <Link to="/api/Login">LOGIN</Link>
  //           </p>
  //           <p className="caja-menu-register">
  //             <Link to="/api/register">REGISTER</Link>
  //           </p>
  //         </>
  //       ) : (
  //         <div>
  //           {" "}
  //           <p className="caja-menu-datos">
  //             <Link to="/api/Calendar">DATOS</Link>
  //           </p>{" "}
  //           <p className="nav-item" />
  //           <button onClick={logout}>Logout</button>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  //   }
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <div className="caja-tittle">
          <img src="/logoaotech.JPG" alt="Aotech" className="logo" />
        </div>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {!props.isLoggedIn ? (
            <>
              <Nav.Link href="/api/Login">Login</Nav.Link>
              <Nav.Link href="/api/register">Register </Nav.Link>
            </>
          ) : (
            <div>
              <Nav.Link href="/api/Calendar">Datos</Nav.Link>
              <Nav.Link>
                <button onClick={logout}>Logout</button>
              </Nav.Link>
            </div>
          )}
        </Nav>
      </Navbar>
    </>
  );
}

export default Header;

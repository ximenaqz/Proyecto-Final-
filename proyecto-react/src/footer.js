import React from "react";
import "./App.css";

function Footer() {
  return (
    <>
      <div class="trabaja-caja">
        <p className="cajita-trabaja-nosotros">TRABAJA CON NOSOTROS</p>

        <div className="caja-logos">
          <img src="/linkedin-logo.webp" alt="linkedin"></img>
          <img src="/logo-facebook.webp" alt="facebook"></img>
          <img src="/instagram.webp" alt="instagram"></img>
        </div>
      </div>

      <div class="container">
        <div class="cajita-footer1">
          <div class="col-sm">
            <p>TITULARIDAD |</p>
            <p>MAPA WEB |</p>
            <p>POLITICA DE PRIVACIDAD |</p>
            <p>AVISO LEGAL |</p>
            <p>COOKIES</p>
          </div>
        </div>

        <div class="cajita-footer2">
          <img src="/imagenTittle.JPG" alt="Aotech" />
        </div>

        <div class="cajita-footer3">
          <p>© Aotech. Todos los derechos reservados</p>
        </div>
      </div>
    </>
  );
}

export default Footer;

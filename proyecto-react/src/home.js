import React from "react";
import "./App.css";
import Carousel from "react-bootstrap/Carousel";

function Home() {
  return (
    <div>
      <Carousel interval="2000">

     <Carousel.Item>
          <img
            className="d-block w-100 my-carrousel"
            src="/imagenSensores.JPG"
            alt="imagen3"
          />
          <Carousel.Caption>
            {/* <h3 style={{color: 'black'}}>Imagen completa </h3>
            <p style={{color: 'black'}}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>


        <Carousel.Item>
          <img
            className="d-block w-100 my-carrousel"
            src="/derecha-logotipo.png"
            alt="imagen3"
          />
          <Carousel.Caption>
            {/* <h3 style={{color: 'black'}}>Tanque</h3> */}
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 my-carrousel"
            src="/center-logotipo.png"
            alt="imagen2"
          />

          <Carousel.Caption>
            
            {/* <p style={{color: 'black'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 my-carrousel"
            src="/izquierda-logotipo.png"
            alt="imagen1"
          />

          <Carousel.Caption>
            {/* <h3 style={{color: 'black'}}>Third slide label</h3>
            <p style={{color: 'black'}}>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
        
      </Carousel>
    </div>
  );
}

export default Home;

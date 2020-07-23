import React, { useState } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import jsPDF from "jspdf";
//import Chart from "react-apexcharts
function Elementos(props) {
  //creamos una variable de estado por la cual pasamos props.resultado que contiene la informacion
  const [estadistica] = useState(props.resultado);
  //creamos el map para crear el array con esos valores
  const serieGrasa = estadistica.datos.map((estadistica) => {
    return estadistica["% Grasa"];
  });
  const serieProteina = estadistica.datos.map((estadistica) => {
    return estadistica["% Proteina"];
  });
  const serieLactosa = estadistica.datos.map((estadistica) => {
    return estadistica["% Lactosa"];
  });
  const serieTemperatura = estadistica.datos.map((estadistica) => {
    return estadistica.Temperatura;
  });
  const serieTime = estadistica.datos.map((estadistica) => {
    //let fecha = new Date(estadistica.TimeString);
    // console.log(fecha);
    let fecha = new Date(estadistica.TimeString);
    let anyo = fecha.getYear();
    let mes = fecha.getMonth();
    let dia = fecha.getDate();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    return new Intl.DateTimeFormat("es-ES", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date(anyo, mes, dia, hora - 2, minutos, segundos)); // chapucilla para corregir la conversion de UTC en el eje X.
  });
  //creamos una variable estado y su estado inicial va a contener todo de option

  const [options] = useState({
    chart: {
      height: 650,
      type: "line",
      stacked: false,
      id: "mixed",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [1, 1, 1, 4],
    },
    title: {
      text: "Mediciones recogidas en el IoT",
      align: "center",
      offsetX: 45,
    },
    xaxis: {
      categories: serieTime,
    },
    yaxis: [
      {
        // seriesName: '% Grasa',
        // opposite: false,
        max: 10,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#008FFB",
        },
        labels: {
          style: {
            colors: "#008FFB",
          },
        },
        title: {
          offsetX: 10,
          text: "% de Grasa",
          style: {
            color: "#008FFB",
          },
        },
        // tooltip: {
        //     enabled: true
        // }
      },
      {
        // seriesName: '% Proteína',
        // opposite: true,
        max: 10,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#00E396",
        },
        labels: {
          style: {
            colors: "#00E396",
          },
        },
        title: {
          offsetX: 10,
          text: "% de Proteína",
          style: {
            color: "#00E396",
          },
        },
      },
      {
        // seriesName: '% Lactosa',
        // opposite: true,
        max: 10,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#FEB019",
        },
        labels: {
          style: {
            colors: "#FEB019",
          },
        },
        title: {
          offsetX: 10,
          text: "% de Lactosa",
          style: {
            color: "#FEB019",
          },
        },
      },
      {
        seriesName: "Temperatura",
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#f70000",
        },
        labels: {
          style: {
            colors: "#f70000",
          },
        },
        title: {
          text: "Temperatura",
          style: {
            color: "#f70000",
          },
        },
      },
    ],
    tooltip: {
      x: {
        show: false,
      },
      fixed: {
        enabled: true,
        position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 25,
        offsetX: 400,
      },
    },
    legend: {
      horizontalAlign: "center",
      offsetX: 40,
    },
  });

  //creamos otra variable de estado que conteniene las lineas del grafico
  let [series] = useState([
    {
      name: "Grasa",
      type: "column",
      data: serieGrasa,
    },
    {
      name: "Proteína",
      type: "column",
      data: serieProteina,
    },
    {
      name: "Lactosa",
      type: "column",
      data: serieLactosa,
    },

    {
      name: "Temperatura",
      type: "line",
      data: serieTemperatura,
    },
  ]);

  console.log(series);

  //Function: GeneratePDF - gráfica. El botón para generar el pdf se encuentra en return.
  function jsPdfGenerator() {
    let informeGrasa = [
      `Mínimo : ${estadistica.resGrasa.min}`,
      `Máximo : ${estadistica.resGrasa.max}`,
      `Media : ${estadistica.resGrasa.mean}`,
      `Desviación : ${estadistica.resGrasa.dsv}`,
    ];

    let informeLactosa = [
      `Mínimo : ${estadistica.resLactosa.min}`,
      `Máximo : ${estadistica.resLactosa.max}`,
      `Media : ${estadistica.resLactosa.mean}`,
      `Desviación : ${estadistica.resLactosa.dsv}`,
    ];

    let informeProteina = [
      `Mínimo : ${estadistica.resProteina.min}`,
      `Máximo : ${estadistica.resProteina.max}`,
      `Media : ${estadistica.resProteina.mean}`,
      `Desviación : ${estadistica.resProteina.dsv}`,
    ];

    let informeTemperatura = [
      `Mínimo : ${estadistica.resTemperatura.min}`,
      `Máximo : ${estadistica.resTemperatura.max}`,
      `Media : ${estadistica.resTemperatura.mean}`,
      `Desviación : ${estadistica.resTemperatura.dsv}`,
    ];

    ApexCharts.exec("mixed", "dataURI").then(function (img) {
      // new document in jspdf. Inicializamos documento con dos argumentos ('p', 'pt')
      let doc = jsPDF("l", "pt", "a4");

      //set the font od the pdf document
      // doc.addFont('Roboto', 'normal');
      doc.setFont("helvetica");

      //set the font type
      //add some text to pdf document
      //let info = props.informeGrasa;

      doc.setFontType("bold");
      doc.setFontSize("12");
      doc.text(200, 40, "ANÁLISIS GRASA");
      doc.setFontType("normal");
      doc.setFontSize("10");
      doc.text(200, 60, informeGrasa);
      doc.setFontType("bold");
      doc.setFontSize("12");
      doc.text(520, 40, "ANÁLISIS PROTEÍNA");
      doc.setFontType("normal");
      doc.setFontSize("10");
      doc.text(520, 60, informeProteina);
      doc.setFontType("bold");
      doc.setFontSize("12");
      doc.text(200, 120, "ANÁLISIS LACTOSA");
      doc.setFontType("normal");
      doc.setFontSize("10");
      doc.text(200, 140, informeLactosa);
      doc.setFontType("bold");
      doc.setFontSize("12");
      doc.text(520, 120, "ANÁLISIS TEMPERATURA");
      doc.setFontType("normal");
      doc.setFontSize("10");
      doc.text(520, 140, informeTemperatura);

      doc.addImage(img.imgURI, "JPEG", 50, 200, 750, 350);

      //save the pdf document
      doc.save("Informe.pdf");
    });
  }

  //hacemos el mapeado para pintar los valores en la pantalla
  const mapeadoResultado = estadistica.datos.map((estadistica) => {
    //datos nombre del array
    return (
      <>
        <div key={estadistica._id}>
          <p>% Grasa {estadistica["% Grasa"]}</p>
          <p>% Proteina {estadistica["% Proteina"]}</p>
          <p>% Lactosa {estadistica["% Lactosa"]}</p>
          <p>Temperatura {estadistica["Temperatura"]}</p>
        </div>
      </>
    );
  });

  if (estadistica.resGrasa === "las fechas no son correctas") {
    return <p>Las fechas no son correctas</p>;
  } else {
    return (
     
      <>
        {/*Chart es lo que permite pintar la gráfica */}
        {/* <h3>DATOS RECOGIDOS</h3> */}

        <div className="grafica-calendar">
          < Chart options={options} series={series} type="line" width={1200} height={650} />
        </div>

        {/*Botón para generar el Pdf. */}
        <div className="boton-generarPDF">
          <button className="fadeIn fourth btn btn-primary" onClick={jsPdfGenerator}> Guardar PDF </button>
        </div>

        <h3>CÁLCULOS DEL RANGO DE FECHAS SELECCIONADO </h3>

        {/*Botón para generar el Pdf. */}

        <div className="container-elementos-4">
          <div className="card-elemento-grasa">
            <div className="container">
              <h5>Datos de la <strong>Grasa</strong></h5>
            </div>
            <ul>
              <li>Mínimo %: {estadistica.resGrasa.min}</li>
              <li>Máximo %: {estadistica.resGrasa.max}</li>
              <li>Media %: {estadistica.resGrasa.mean}</li>
              <li>Desviación Std: {estadistica.resGrasa.dsv}
              </li>
            </ul>
          </div>


          <div className="card-elemento-proteina">
            <div>
              <h5>Datos de la <strong>Proteína</strong></h5>
            </div>
            <ul>
              <li>Mínimo %: {estadistica.resProteina.min}</li>
              <li>Maximo %: {estadistica.resProteina.max}</li>
              <li>Media %: {estadistica.resProteina.mean}</li>
              <li>Desviación Std: {estadistica.resProteina.dsv}</li>
            </ul>
          </div>





          <div className="card-elemento-lactosa">
            <div>
              <h5>Datos de la <strong>Lactosa</strong></h5> <div className="color-lactosa"></div>
            </div>
            <ul>
              <li>Mínimo %: {estadistica.resLactosa.min}</li>
              <li>Máximo %: {estadistica.resLactosa.max}</li>
              <li>Media %: {estadistica.resLactosa.mean}</li>
              <li>Desviación Std: {estadistica.resLactosa.dsv}</li>
            </ul>
          </div>


          <div className="card-elemento-temperatura">
            <div>
              <h5>Datos de la <strong>Temperatura</strong></h5>
            </div>
            <ul>
              <li>Temp. Mínima: {estadistica.resTemperatura.min}</li>
              <li>Temp. Máxima: {estadistica.resTemperatura.max}</li>
              <li>Temp. Media: {estadistica.resTemperatura.mean}</li>
              <li>Desviación Std: {estadistica.resTemperatura.dsv}</li>
            </ul>
          </div>
        </div>
        <ul>
          {/*mapeadoResultado*/}
        </ul>
      </>

    );
  }
}

export default Elementos;

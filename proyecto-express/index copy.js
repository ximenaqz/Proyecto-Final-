const express = require("express");
const mongodb = require("mongodb");
const math = require("mathjs");

const mongoClient = mongodb.MongoClient;

const app = express();
//importamos el paquete passport
const passport = require("passport");

let db;
mongodb.MongoClient.connect("mongodb://localhost", function (err, client) {
  if (err !== null) {
    console.log(err);
    return err;
  } else {
    db = client.db("Aotech");
  }
});

app.use(express.json());

//posicion de session y abajo passport.initialize y passport.session
const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
    email,
    password,
    done
  ) {
    db.collection("users")
      .find({ email: email })
      .toArray(function (err, users) {
        if (users.length === 0) {
          return done(null, false);
        }
        const user = users[0];
        if (password === user.password) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
  })
);
//serailizar y dsearializar
passport.serializeUser(function (user, done) {
  done(null, user.email);
});
passport.deserializeUser(function (id, done) {
  db.collection("users")
    .find({ email: id })
    .toArray(function (err, users) {
      if (users.length === 0) {
        done(null, null);
      }
      done(null, users[0]);
    });
});

//Rutas para usuarios
app.post("/api/register", function (req, res) {
  db.collection("users").insertOne(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    function (err, datos) {
      res.send({ mensaje: "registrado" });
    }
  );
});

app.post(
  "/api/login",
  passport.authenticate("local", {
    successRedirect: "/api",
    failureRedirect: "/api/fail",
  })
);

app.get("/api/fail", function (req, res) {
  res.status(401).send({ mensaje: "denegado" });
});

app.get("/api", function (req, res) {
  if (req.isAuthenticated() === false) {
    return res.status(401).send({ mensaje: "necesitas loguearte" });
  }
  res.send({ mensaje: "logueado correctamente" });
});

app.get("/api/user", function (req, res) {
  if (req.isAuthenticated()) {
    return res.send({ nombre: req.user.name });
  }
  res.send({ nombre: "No logueado" });
});
//rutas con la base datos
//operacion de math
function calcular(prop) {
  let min = math.min(prop);
  let max = math.max(prop);
  let mean = math.mean(prop);
  let dsv = math.std(prop);

  return { min, max, mean, dsv };
}

app.get("/api/DatosAotechRango", function (req, res) {
  //poner la variable tipo fecha
  const startDate = new Date(req.query.startDate);
  const lastDate = new Date(req.query.lastDate);

  //para encontrar las horas creo los comando de mongodb para que me haga la busqueda de ese intervalo de tiempo
  db.collection("DatosAotech")
    .find({
      $and: [
        { TimeString: { $gte: startDate } },
        { TimeString: { $lte: lastDate } },
      ],
    })
    .toArray(function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        //hago el datos.map y divido /100
        let arrGrasa = datos.map((dato) => {
          return (dato["% Grasa"] = dato["% Grasa"] / 100);
        });

        let arrProteina = datos.map((dato) => {
          return (dato["% Proteina"] = dato["% Proteina"] / 100);
        });
        let arrLactosa = datos.map((dato) => {
          return (dato["% Lactosa"] = dato["% Lactosa"] / 100);
        });

        let arrTemperatura = datos.map((dato) => {
          return dato["Temperatura"];
        });
        //hago las variables y adentro la funcion como parametro de ese valor

        let resGrasa = calcular(arrGrasa);
        let resProteina = calcular(arrProteina);
        let resLactosa = calcular(arrLactosa);
        let resTemperatura = calcular(arrTemperatura);

        //cojo el resultado en un objeto y lo enviamos
        let resultado = {
          datos,
          resGrasa,
          resProteina,
          resLactosa,
          resTemperatura,
        };
        console.log(resultado);
        res.send({resultado});
      }
    });
});

//ruta para ver todos los datos
app.get("/api/DatosAotech", function (req, res) {
  db.collection("DatosAotech")
    .find()
    .toArray(function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send({datos});
      }
    });
});

app.listen(3000);

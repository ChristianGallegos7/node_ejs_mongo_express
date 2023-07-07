const express = require("express");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

require("dotenv").config();

const port = process.env.PORT || 3000;

//conexion a base de datos
const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ybhrtcr.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Base de datos conectada✔"))
  .catch((e) => console.log(e));
//MOTOR DE PLANTILLAS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//ESTATIC ARCHIVOS
app.use(express.static(path.join(__dirname, "public")));
//ROUTES DE LA WEB
app.use("/", require("./Routes/index.js"));
app.use("/mascotas", require("./Routes/mascotas.js"));

//404
app.use((req, res, next) => {
  res.status(404).render("404", { mensaje: "PAGINA NO ENCONTRADA😴" });
});
//server
app.listen(port, () => {
  console.log(`Server listening in port ${port}`);
});

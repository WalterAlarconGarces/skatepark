const express = require("express");
const { engine } = require("express-handlebars");
require('dotenv').config()
require("./models/users")
const app = express();
const db = require('./config/db')

app.get("/",(req,res)=>{
  res.redirect(`/pages/index`)
})
//Usa pageRoutes para administrar los endpoints de  "/pages"
const pageRoutes = require('./routes/pageRoutes')
app.use("/pages",pageRoutes())

//Usa userRoutes para administar los endpoints que comienzan con "/usuario"
const userRoutes = require('./routes/userRoutes')
app.use("/usuario", userRoutes())

const port = process.env.PORT;
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const exphbs = require("express-handlebars");
const expressFileUpload = require("express-fileupload");
app.use(expressFileUpload({
    limits: {fileSize:500000000},
    abortOnLimit: true,
    responseOnLimit:"El tamaño del archivo se ha superado"
}))

const jwt = require("jsonwebtoken");
const secretKey=process.env.SECRETKEY;

db.sync().then(res=>{
  console.log("DB conectada")
}).catch(error=>console.log(error))

app.use(
  "/bootstrapCSS",
  express.static(__dirname + "/node_modules/bootstrap/dist/css")
);
app.use(
  "/bootstrapJS",
  express.static(__dirname + "/node_modules/bootstrap/dist/js")
);
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/assets", express.static(__dirname + "/assets"));

app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  engine({
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/partials",
  })
);

app.use(express.static('uploads'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

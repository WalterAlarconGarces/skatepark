const express = require("express");
var router = express.Router();
const userController = require("/controllers/userController")

const axios = require('axios');

var bodyParser = require('body-parser');
//const { default: axios } = require("axios");

module.exports = () =>{
    router.get("/index", pageController.IndexPage);

    router
    .route("/verify")
    .post(pageController.verify)

    router
    .route("/Login")
    .get(pageController.Login)
    .post(pageController.dataLogin)
    

    router.get("/Registro", (req, res) => {
        res.render("Registro", {
            //products: ["banana", "cebollas", "lechuga", "papas", "pimenton", "tomate"],
          });
    });

    router.get("/Admin", pageController.Admin);


    router
    .route("/Datos")
    .get(pageController.Datos)
    .put(pageController.enableUser)


    return router
}
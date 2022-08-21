const express = require("express");
let router = express.Router();
const userController = require("/controllers/userController")
var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: false }));
const expressFileUpload = require("express-fileupload");
router.use(expressFileUpload({
    limits: {fileSize:8000000},
    abortOnLimit: true,
    responseOnLimit:"El tamaño del archivo se ha superado"
}))
module.exports = ()=>{
router
.route("/")
.get(userController.GetUsers)
.post(userController.NewUser)
.put(userController.UpdateUser)
.delete(userController.DeleteUser)
return router
}

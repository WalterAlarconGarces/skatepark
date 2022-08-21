const Users = require("/models/users")
const axios = require('axios');
const jwt = require("jsonwebtoken");
const { stringify } = require("uuid");
require('dotenv').config()

exports.IndexPage = async (req,res)=>{
    try {
        usersList = await axios.get(`/usuario`)
        let usersListFinal = usersList.data
        res.render("index", {usersListFinal});
    } catch (error) {
        console.log(error)
    }
}

exports.Datos = async (req,res)=>{
    try {
        let email = req.query.email
        const usuario_por_editar = await Users.findOne({where:{email: email}})
        let nombre = usuario_por_editar.nombre
        let password = usuario_por_editar.password
        let anos_experiencia = usuario_por_editar.anos_experiencia
        let especialidad = usuario_por_editar.especialidad
        
        res.render("Datos", {email: [email], nombre: [nombre], password: [password], anos_experiencia: [anos_experiencia], especialidad: [especialidad]} );  
        
        


    } catch (error) {
        console.log(error)
    }
}


exports.Admin = async (req,res)=>{
    try {
        usersList = await axios.get(`/usuario`)
        let usersListFinal = usersList.data
        res.render("Admin", {usersListFinal});
    } catch (error) {
        console.log(error)
    }
}

exports.enableUser = async (req,res)=>{
    try {
        const data = req.body
        const email = data[0].email
        const estado = data[0].estado
        const usuario_por_habilitar = await Users.findOne({where:{email: email}})
        usuario_por_habilitar.estado=estado
        await usuario_por_habilitar.save()
        res.status(200).send("Usuario cambiado de estado")
        
    } catch (error) {
        res.status(500).send("no se pudo cambiar el estado del usuario")
        console.log(error)
    }
}

exports.Login = async (req,res)=>{
    try {
        res.render("Login",{})
    } catch (error) {
        res.status(500).send("no se pudo ingresar")
        console.log(error)
    }
}

exports.dataLogin = async (req,res)=>{
    try {
        const userLogin = req.body[0]
        let email = userLogin.email
        let password = userLogin.password
        const usuario_por_Login = await Users.findOne({where:{email: email, password: password}})
        if(usuario_por_Login){
            let token = await jwt.sign({userLogin}, process.env.SECRETKEY, {expiresIn: "8h"})
            res.send({token: token})
        }else{
            res.send("datos usuario no coinciden")
        }
    
    } catch (error) {
        res.status(500).send("no se pudo ingresar")
        console.log(error)
    }
}

exports.verify = async (req,res)=>{
    
    let token = req.body[0].token
    const decode = jwt.verify(token, process.env.SECRETKEY);
    res.send(decode)
}
const express = require("express");
const Users = require("/models/users")
const fs = require("fs")
const expressFileUpload = require("express-fileupload");
const bodyParser = require("body-parser");


exports.NewUser=async(req,res)=>{
    try {
        const data = req.body
        const {foto_perfil} = req.files
        const {name} = foto_perfil
                
        foto_perfil.mv(`/assets/img/${data.email}.jpg`, (err)=>{
            
            
        })
        
        const usuario_por_crear = {
          email: data.email,
          nombre: data.nombre,
          password: data.password,
          anos_experiencia: data.anos_experiencia,
          especialidad: data.especialidad,
          foto: `${data.email}.jpg`,
          estado: false,
        };
        
        await Users.create(usuario_por_crear)

       res.status(201).redirect("/pages/index")
        
      } catch (error) {
        console.log(error)
        res.status(500).send("no se pudo crear el usuario")
      }
}

exports.GetUsers=async(req,res)=>{
    try {
        const result = await Users.findAll()
        res.status(200).send(result)
        
      } catch (error) {
        console.log(error)
        res.status(500).send("no se pudo obtener usuarios")
      }
}

exports.UpdateUser=async(req,res)=>{
    try {
        const data = req.body
        const email = data.email
        const nombre = data.nombre
        const password = data.password
        const repetir_password = data.repetir_password
        const anos_experiencia = data.anos_experiencia
        const especialidad = data.especialidad
        const usuario_por_actualizar = await Users.findOne({where:{email: email}})
        usuario_por_actualizar.nombre=nombre
        usuario_por_actualizar.password=password
        usuario_por_actualizar.anos_experiencia=anos_experiencia
        usuario_por_actualizar.especialidad=especialidad
        await usuario_por_actualizar.save()
    
        res.status(200).send("Usuario actualizado")
        
      } catch (error) {
        console.log(error)
        res.status(500).send("no se pudo obtener usuarios")
      }
}


exports.DeleteUser=async(req,res)=>{
    try {
        const data = req.body
        const email = data.email
        const usuario_por_eliminar = await Users.findOne({where:{email: email}})
        await usuario_por_eliminar.destroy()
        
        res.status(200).send("Usuario eliminado")
        
      } catch (error) {
        console.log(error)
        res.status(500).send("no se pudo eliminarn usuario")
      }
}
//en este se unen los 2 proyectos
const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator')

//rea una nueva tarea

exports.crearTarea = async (req, res) => {
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array()})
    }

    //extraer el proyecto y comprovar que existe    
    
    try {
        const {proyecto} = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }
        //revisar que el proyecto este autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'})
        }
        // creamos la tarea
        //req.body tiene el nombre del proyecto y la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//obtine las tareas por proyecto

exports.obtenerTareas = async (req,res) => {
    //extraemos el proyecto

    try {
        const {proyecto} = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }
        //revisar que el proyecto este autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'})
        }
        //obtener las tareas por proyecto

        const tareas = await Tarea.find({ proyecto });
        res.json({tareas});


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


 //Actualizar una tarea
 exports.actualizarTarea = async (req,res) => {
     try {
        
          //Extraer el proyecto y comprobar si existe
         const {proyecto,nombre,estado} = req.body;

          //si la tarea existe o no
         let tarea = await Tarea.findById(req.params.id);

         if(!tarea) {
             return res.status(401).json({msg: 'No existe esa tarea'})
         }

         //extraer proyecto
         const existeProyecto = await Proyecto.findById(proyecto);


         //Revisar si el proyecto actual pertenece al usuario authenticado
         if(existeProyecto.creador.toString() !== req.usuario.id) {
             return res.status(401).json({msg: 'No autorizado'})
         }
         //Crear un objeto con la nueva informacion
         const nuevaTarea = {};
         nuevaTarea.nombre = nombre;
         nuevaTarea.estado = estado;
         
         //guardar la tarea
         tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});

         res.json({tarea})
         

     } catch (error) {
         console.log(error);
         res.status(500).send('Hubo un error')
     }
 }

//elimina una tarea

exports.eliminarTarea = async (req, res) =>{
    try {
        
        //Extraer el proyecto y comprobar si existe
       const {proyecto} = req.body;

        //si la tarea existe o no
       let tarea = await Tarea.findById(req.params.id);

       if(!tarea) {
           return res.status(401).json({msg: 'No existe esa tarea'})
       }

       //extraer proyecto
       const existeProyecto = await Proyecto.findById(proyecto);
        
       // eliminar 
       await Tarea.findOneAndRemove({_id : req.params.id});
       res.json({ msg: 'Tarea eliminada' })
       

   } catch (error) {
       console.log(error);
       res.status(500).send('Hubo un error')
   }
}


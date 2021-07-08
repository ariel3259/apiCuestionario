const express=require('express');
const router=express.Router();
const con=require('../conection/connection');

router.get("/", (req, res) => {
res.send("Ruta Inicio");
});
  
  //Obtener todas las preguntas
  router.get("/api/preguntas", (req, res) => {
    con.query('SELECT * FROM preguntas', (error, filas) => {
      if (error) {
        throw error;
      } else {
        res.send(filas);
      }
    });
  });
  
  //Mostrar una sola pregunta
  router.get('/api/preguntas/:idpregunta', (req,res)=>{
      con.query('SELECT * FROM preguntas WHERE idpregunta = ?', [req.params.idpregunta],(error,fila)=>{
          if(error){
              throw error;
          
          }else{
              res.send(fila)
          }
      })
  })
  
  //Crear pregunta
  router.post("/api/preguntas", (req, res) => {
    let data = {
      idpregunta: req.body.idpregunta,
      descripcion: req.body.descripcion,
      habilitado: req.body.habilitado
    };
    let sql = "INSERT INTO preguntas SET ?";
    router.query(sql, data, (err, results) => {
      if (err) {
        throw err;
      } else {
        res.send(results);
      }
    });
  });
  
  //Actualizar pregunta
 router.put('/api/preguntas/:idpregunta', (req, res) => {
    let idpregunta = req.params.idpregunta;
    let descripcion = req.body.descripcion;
    let habilitado = req.body.habilitado;
    let sql = 'UPDATE preguntas SET descripcion= ?, habilitado= ? WHERE idpregunta= ?';
    con.query(sql, [descripcion, habilitado,idpregunta], (err, results) => {
      if (err) {
        throw err;
      } else {
        console.log(idpregunta);
        res.send(results);
      }
    });
  });
  
  //Eliminar pregunta
  router.delete('/api/preguntas/:idpregunta', (req,res)=>{
      con.query('DELETE FROM preguntas WHERE idpregunta= ?',[req.params.idpregunta], (err,results)=>{
          if(err){
              throw err;
          }else{
              res.send(results);
          }
      })
  })
  module.exports=router;
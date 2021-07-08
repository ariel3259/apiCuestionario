const express=require('express');
const router=express.Router();
const con=require('../conection/connection');
router.get('/',(req,res)=>res.send('<h1>Ruta de inicio</h1>'));

router.post('/api/cuestionarios/',(req,res)=>{
    const data={
        idcuestionario:req.body.id,
        fechaCreacion:req.body.fecha,
        usuarioCreador:req.body.usuario,
        descripcion:req.body.descripcion
    };
    const sql="insert into cuestionarios set ?";
    con.query(sql,data,err=>{
        if(err)throw err;
        res.send(data);
    });
    });
//mostrar todos los cuestionarios
    router.get('/api/cuestionarios/',(req,res)=>{
		con.query('select * from cuestionarios',(err,filas)=>{
		if(err)throw err;
		res.send(filas);

		});
		});
//mostrar un cuestionario
    router.get('/api/cuestionarios/:id',(req,res)=>{
            con.query(`select * from cuestionarios where idcuestionario=?`,[req.params.id],(err,fila)=>{
                if(err)throw err;
                res.send(fila);

            });
        });
//editar un cuestionario
    router.put('/api/cuestionarios/:id',(req,res)=>{
     let data={
         id:req.body.id,
         fecha:req.body.fecha,
         usuario:req.body.usuario,
         descripcion:req.body.descripcion
     }
        let sql="update cuestionarios set fechaCreacion=?,usuarioCreador=?,descripcion=? where idcuestionario=?";
            con.query(sql,data,(err,result)=>{
                if(err)throw err;
                res.send(result);

            });
        });
//eliminar un cuestionario
       router.delete('/api/cuestionarios/:id',(req,res)=>{
            con.query('delete from cuestionarios where idcuestionario=?',[req.params.id],(err,result)=>{
                if(err)throw err;
                res.send(result);
            });
        });

        module.exports=router;
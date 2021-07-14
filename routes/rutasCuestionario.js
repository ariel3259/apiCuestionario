const express=require('express');
const router=express.Router();
const con=require('../conection/connection');
router.get('/',(req,res)=>res.send('<h1>Ruta de inicio</h1>'));


//crear un cuestionario|

router.post('/api/cuestionarios/',(req,res)=>{
    con.query('select max(idcuestionario)+1 as idcuestionario from cuestionarios',(err,result)=>{
        if(err) throw err;
         let result2=result[0];
        var result3=result2.idcuestionario;
        if(result3==null){
            result3=1
        }
       
         const data={
               idcuestionario:result3,
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
       let fecha=req.body.fecha;
       let usuario=req.body.usuario;
       let descripcion=req.body.descripcion;
        let id=req.params.id;
        let sql="update cuestionarios set fechaCreacion=?,usuarioCreador=?,descripcion=? where idcuestionario=?";
            con.query(sql,[fecha,usuario,descripcion,id],(err,result)=>{
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

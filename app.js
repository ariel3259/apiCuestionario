const express= require('express');
const mysql=require('mysql');
const cors=require('cors');
const app= express();
app.use(cors(),express.json());

const con= mysql.createConnection({
	host:'localhost',
user:'root',
password:'',
database:'enc'
});
con.connect(err=>{
	if(err) throw err;
	console.log("Usted esta conectado a la base de datos");
})

app.get('/',(req,res)=>res.send('<h1>Ruta de inicio</h1>'));

app.post('/api/cuestionarios/',(req,res)=>{
    const data={
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
    app.get('/api/cuestionarios/',(req,res)=>{
		con.query('select * from cuestionarios',(err,filas)=>{
		if(err)throw err;
		res.send(filas);

		});
		});
//mostrar un cuestionario
    app.get('/api/cuestionarios/:id',(req,res)=>{
            con.query(`select * from cuestionarios where idcuestionario=?`,[req.params.id],(err,fila)=>{
                if(err)throw err;
                res.send(fila);

            });
        });
//editar un cuestionario
    app.put('/api/cuestionarios/:id',(req,res)=>{
        let id=req.params.id;
        let fecha=req.body.fecha;
        let usuario=req.body.usuario;
        let descripcion=req.body.descripcion;
        let sql="update cuestionarios set fechaCreacion=?,usuarioCreador=?,descripcion=? where idcuestionario=?";
            con.query(sql,[fecha,usuario,descripcion,id],(err,result)=>{
                if(err)throw err;
                res.send(result);

            });
        });
//eliminar un cuestionario
       app.delete('/api/cuestionarios/:id',(req,res)=>{
            con.query('delete from cuestionarios where idcuestionario=?',[req.params.id],(err,result)=>{
                if(err)throw err;
                res.send(result);
            });
        });

        app.set("port",process.env.PORT || 3000);

        app.listen(app.get("port"),err=>{
            if(err) throw err;
            console.log (`Funciona en el puerto: 3000`);
        });

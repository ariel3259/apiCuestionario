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

app.post('/api/cuestionarios/create',(req,res)=>{
    const data={
        idcuestionario:id,
        fechaCreacion:fecha,
        usuarioCreador:usuario,
        descripcion:des
    };
    const sql="insert into cuestionarios set ?";
    con.query(sql,data,err=>{
        if(err)throw err;
        res.send(data);
    });
    });

    app.get('/api/cuestionarios/read',(req,res)=>{
		con.query('select * from cuestionarios',(err,filas)=>{
		if(err)throw err;
		res.send(filas);
		return filas;
		});
		});

    app.get(`/api/cuestionarios/read/:id`,(req,res)=>{
            con.query(`select * from cuestionarios where idcuestionario=?`,[req.params.id],(err,fila)=>{
                if(err)throw err;
                res.send(fila);
                return fila;
            });
        });

    app.put(`/api/cuestionarios/modify/:id`,(res,req)=>{
            const data={
                descripcion:desc,
                fechaCreacion:fecha,
                usuarioCreador:usuario,
                id:id
            };
            con.query('update cuestionarios set descripcion=?,fechaCreacion=?,usuarioCreador=? where idcuestionario=?',data,(err,result)=>{
                if(err)throw err;
                res.send(result);
                return result;
            });
        });

       app.delete(`/api/cuestionarios/delete/:id`,(req,res)=>{
            con.query('delete from cuestionarios where id=?',[req.params.id],err=>{
                if(err)throw err;
                res.send("Articulo Eliminado");
            });
        });

        app.set("port",process.env.PORT || 3000);

        app.listen(app.get("port"),err=>{
            if(err) throw err;
            console.log (`Funciona en el puerto: 3000`);
        });
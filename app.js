const express= require('express');
const cors=require('cors');
const app= express();
const routerCuestionarios=require('./routes/rutasCuestionario');
const routerPreguntas=require('./routes/rutasPreguntas');
app.use(cors(),express.json());

//rutas de cuestionario
app.use('/',routerCuestionarios);
app.use("/api/cuestionarios/",routerCuestionarios);
app.use('/api/cuestionarios/:id',routerCuestionarios);
app.set("port",process.env.PORT || 3000);

//rutas de preguntas
app.use('/',routerPreguntas);
app.use('/api/preguntas',routerPreguntas);
app.use('/api/preguntas/:idpregunta',routerPreguntas);

        app.listen(app.get("port"),err=>{
            if(err) throw err;
            console.log (`Funciona en el puerto: 3000`);
        });

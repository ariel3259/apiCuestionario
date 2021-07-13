const express= require('express');
const cors=require('cors');
const app= express();
const routerCuestionarios=require('./routes/rutasCuestionario');
const routerPreguntas=require('./routes/rutasPreguntas');
app.use(cors(),express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
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

const express= require('express');
const cors=require('cors');
const app= express();
app.use(cors(),express.json());
const router=require('./routes/index')
app.use('/',router);
app.use("/api/cuestionarios/",router);
app.use('/api/cuestionarios/:id',router);
app.set("port",process.env.PORT || 3000);
        app.listen(app.get("port"),err=>{
            if(err) throw err;
            console.log (`Funciona en el puerto: 3000`);
        });

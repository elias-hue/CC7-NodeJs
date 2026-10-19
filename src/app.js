const express = require('express')

const swaggerUi = require("swagger-ui-express");
const swaggerGeneration = require("./config/swagger")
const errorHandler = require("./middlewares/ErrorHandler");



const app = express();
app.disable("x-powered-by");


app.use(express.json())
app.use('/api/auth', require('./routes/AuthRoutes'));
app.use('/api/films', require('./routes/FilmRoutes'));
app.use('/api/artistes', require('./routes/ArtisteRoutes'));
app.use('/api/notes', require('./routes/NoteRoutes'));
app.use('/api/internautes', require('./routes/InternauteRoutes'));

swaggerGeneration.then(() =>{
    const swaggerFix = require("./swagger-output");

    app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFix));
});


app.use(errorHandler);

module.exports = app
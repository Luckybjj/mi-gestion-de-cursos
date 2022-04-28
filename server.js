// Importación de depencias
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
// Importación de funciones
const { newCurso, getCurso, editCurso, deleteCurso } = require('./consultas');
const res = require('express/lib/response');

app.listen(PORT, () => console.log(`Server ON, PORT ${PORT}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta raiz que devuelve el archivo "index.html"
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

// Ruta POST "/curso" que ejecuta la función asíncrona "newCurso()"
app.post("/curso", async (req, res) => {
    //console.log("req.body", req.body)
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    //console.log(nombre)
    //console.log(nivelTecnico)
    //console.log(fechaInicio)
    //console.log(duracion)
    const response = await newCurso(nombre, nivelTecnico, fechaInicio, duracion);
    //console.log("respuesta",response)
    res.send(response);
});

// Ruta GET "/cursos" que ejecuta la función asíncrona "getCurso()"
app.get("/cursos", async (req, res) => {
    const response = await getCurso()
    //console.log("respuestaGet", response)
    res.send(response)
});

// Ruta PUT "/curso/:id" que ejecuta la función asíncrona "editCurso()"
app.put("/curso", async (req, res) => {
    //console.log("putEditCurso", req.body);
    const { id, nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    const response = await editCurso(id, nombre, nivelTecnico, fechaInicio, duracion);
    //console.log("responseEditCurso", response);
    res.send(response);
});

// Ruta DELETE "/canal/:id" que ejecuta la función asíncrona "deleteCurso()"
app.delete("/curso/:id", async (req, res) => {
    //console.log("req.params", req.params);
    //console.log("req.body", req.body);
    const { id } = req.params
    //console.log(id)
    const response = await deleteCurso(id);
    console.log("response", response)
    res.send(response)
});





